// Load saved dark/light theme
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark") {
        document.body.classList.add("dark")
    } else if(savedTheme === "light") {
        document.body.classList.add("light")
    }
});

// FORM FUNCTIONALITY
const tabsContainer = document.querySelector(".auth-tabs")
const tabs = Array.from(document.querySelectorAll(".auth-tab"));
const signUpOnlyFields = document.querySelectorAll(".sign-up-only");
const authForm = document.getElementById("authForm");
const submitBtn = document.getElementById("authBtn");

//Form Input
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");

// Form login message
const messageContainer = document.getElementById("messageContainer");
const formMessage = document.getElementById("formMessage");

const savedUserProfile = JSON.parse(localStorage.getItem("user")) || [];

// Form State
let isValid = false;
let passwordMatch = false;
let hideMessageTimeout = null;
let currentMode = "login";

function clearMessage() {
    if(hideMessageTimeout) {
        clearTimeout(hideMessageTimeout);
        hideMessageTimeout = null;
    };

    formMessage.textContent = "";
    formMessage.style.opacity = "0";

    if(messageContainer) {
        messageContainer.style.borderColor = "transparent";
    }
};

// tabs.forEach(tab => {
//    tab.addEventListener("click", () => {
//     const tabAlreadyActive = tab.classList.contains("auth-tab--active");
//     const selectedTab = tab.dataset.tab;
//     const isSignUpTab = selectedTab === "signup" && !tabAlreadyActive;
//     console.log("Sign up tab selected: ", isSignUpTab);

//     tabs.forEach(t => t.classList.remove("auth-tab--active"));

//     if(!tabAlreadyActive) {
//         console.log(!tabAlreadyActive)
//         tab.classList.add("auth-tab--active");
//     };
//     submitBtn.textContent = selectedTab === "signup"
//         ? "Create Account"
//         : "Login";

//     signUpOnlyFields.forEach(field => {
//         const inputs = field.querySelectorAll("input");

//         if(isSignUpTab) {
//             field.style.display = "flex";
//             inputs.forEach(input => {
//                 input.disabled = false;
//                 input.required = true;
//             });
//         } else {
//             field.style.display = "none";
//             inputs.forEach(input => {
//                 input.disabled = true;
//                 input.required = false;
//             })
//         }
//     })
//    });
// })

// Show message based on signup state
function showMessage(text, type) {
    //clear previous timeout if exists
    if(hideMessageTimeout) {
        clearTimeout(hideMessageTimeout);
    }

    formMessage.textContent = text;
    formMessage.style.opacity = "1";

    if(type === "error") {
        formMessage.style.color = "var(--color-invalid)";
        if(messageContainer) {
            messageContainer.style.borderColor = "var(--color-invalid)";
        }
        } else if(type === "success") {
            formMessage.style.color = "var(--color-valid)";
            if(messageContainer) {
            messageContainer.style.borderColor = "var(--color-valid)";
        }
    } else {
        formMessage.style.color = "";
        if(messageContainer) {
            messageContainer.style.borderColor = "";
        }
    };

    hideMessageTimeout = setTimeout(() => {
        formMessage.style.opacity = "0";
        if(messageContainer) {
            messageContainer.style.borderColor = "transparent";
        }
    }, 3000);
};

// Toggle between "Login" and "Sign Up" tab
function updateFormMode(mode) {
    currentMode = mode;
    const isSignUpTab = mode === "signup";

    // Toggle active tab
    tabs.forEach(tab => {
        const isActive = tab.dataset.tab === mode;
        tab.classList.toggle("auth-tab--active", isActive);
    });

    signUpOnlyFields.forEach(field => {
        const inputs = field.querySelectorAll("input");

        if(isSignUpTab) {
            field.style.display = "flex";
            inputs.forEach(input => {
                input.disabled = false;
                input.required = true;
            });
        } else {
            field.style.display = "none";
            inputs.forEach(input => {
                input.disabled = true;
                input.required = false;
            })
        }
    });

    submitBtn.textContent = isSignUpTab ? "Create Account" : "Login";

    // Reset form + message when switching tabs
    authForm.reset();
    password1El.style.borderColor = "";
    password2El.style.borderColor = "";
    clearMessage();

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const selectedTab = tab.dataset.tab;

            // Do nothing if user clicks the already active tab
            if(selectedTab === currentMode) return;

            updateFormMode(selectedTab);
        })
    })
};

// Default form mode
updateFormMode("login");


function validateLoginForm() {
    // Validate the required fields: email + password
    isValid = authForm.checkValidity();

    if(!isValid) {
        showMessage("Please fill out all fields.", "error");
        return false;
    };

    showMessage("Successfully Registered!", "success");
    return true;
};

function validateSignUpForm() {
    const password1 = password1El.value.trim();
    const password2 = password2El.value.trim();

    // Validate the required fields: name, age, phone, email, password, confirmed password
    isValid = authForm.checkValidity();

    if(!isValid) {
        showMessage("Please fill out all fields.", "error");
        return false;
    };

    if(password1 === password2) {
        passwordMatch = true;
        password1El.style.borderColor = "";
        password2El.style.borderColor = "";
    } else {
        passwordMatch = false;
        showMessage("Make sure passwords match", "error");
        password1El.style.borderColor = "var(--color-invalid)";
        password2El.style.borderColor = "var(--color-invalid)";
        return false;
    };

    // If form is valid and passwords match
    if(isValid && passwordMatch) {
        showMessage("Successfully Registered!", "success");
        return true;
    };

    return false;
};

function validateForm() {
    if(currentMode === "login") {
        return validateLoginForm()
    } else {
        return validateSignUpForm()
    }
};

function storeFormData() {
    const user = {
        fullName: nameInput.value.trim(),
        age: ageInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        password1El: password1El.value.trim(),
        password2El: password2El.value.trim(),
    };

    console.log(user);
    savedUserProfile.push(user);
    localStorage.setItem("user", JSON.stringify(savedUserProfile));
};

function processFormData(e) {
    e.preventDefault();

    const formIsValid = validateForm();
    if(!formIsValid) return;

    if(currentMode === "signup") {
        storeFormData();
    } else {
        console.log("Login successfully!")
    }

    authForm.reset();
}


authForm.addEventListener("submit", processFormData)

// Add page redirect after user logins and signup