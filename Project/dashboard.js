// Load saved dark/light theme
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark") {
        document.body.classList.add("dark")
    } else if(savedTheme === "light") {
        document.body.classList.add("light")
    }
});

// Load saved user
document.addEventListener("DOMContentLoaded", () => {
    const userNameEl = document.getElementById("userName");
    const currentUserRaw = localStorage.getItem("currentUser");

    if(!currentUserRaw) {
        if(userNameEl) {
            userNameEl.textContent = "Guest";
        }
        return;
    };

    const currentUser = JSON.parse(currentUserRaw);
    if(userNameEl && currentUser.fullName) {
        userNameEl.textContent = currentUser.fullName;
    }
});
