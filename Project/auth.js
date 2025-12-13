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

console.log(signUpOnlyFields)

//Form Input
const nameInput = authForm.name.value;
const emailInput = authForm.email.value;
const password1 = authForm.password1.value;
const password2 = authForm.password2.value;

const formMessage = document.getElementById("formMessage");
const messageContainer = document.getElementById("messageContainer");

const savedUsersProfile = JSON.parse(localStorage.getItem("users")) || [];

// Toggle between "Login" and "Sign Up" tab
tabs.forEach(tab => {
   tab.addEventListener("click", () => {
    const tabAlreadyActive = tab.classList.contains("auth-tab--active");
    const selectedTab = tab.dataset.tab;
    const isSignUpTab = selectedTab === "signup" && !tabAlreadyActive;
    console.log("Sign up tab selected: ", isSignUpTab)

    tabs.forEach(t => t.classList.remove("auth-tab--active"));

    if(!tabAlreadyActive) {
        console.log(!tabAlreadyActive)
        tab.classList.add("auth-tab--active");
    };
    submitBtn.textContent = selectedTab === "signup"
        ? "Create Account"
        : "Login";

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
    })
   });
})

// Form Validation
let isValid = false;
let passwordMatch = false;

function validateForm() {
    isValid = authForm.checkValidity();

    if(!isValid) {
        formMessage.textContent = "Please fill out all fields.";
        formMessage.style.color = "var(--color-invalid)";
        messageContainer.style.borderColor = "var(--color-invalid)";
        return;
    };

    if(password1 === password2) {
        passwordMatch = true;
    } else {
        passwordMatch = false;
        formMessage.textContent = "Make sure passwords match.";
        formMessage.style.color = "var(--color-invalid)";
        messageContainer.style.borderColor = "var(--color-invalid)";
        password1.style.borderColor = "var(--color-invalid)";
        password2.style.borderColor = "var(--color-invalid)";
        return;
    }
}
console.log(isValid)

