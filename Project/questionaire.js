// Load saved dark/light theme
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark") {
        document.body.classList.add("dark")
    } else if(savedTheme === "light") {
        document.body.classList.add("ligth")
    }
});