const body = document.body;

// MENUS
const header = document.querySelector("header");
const mobileMenu = document.getElementById("mobile-menu");
const toggleButtons = document.querySelectorAll(".mobile-menu-toggle");
const mobileLinks = mobileMenu.querySelectorAll("a");

// THEME ICON
const themeToggle = document.getElementById("themeToggle");

// CTAs
const getStartedBtn = document.getElementById("getStartedBtn");
const createProfileBtn = document.getElementById("createProfileBtn");

console.log(getStartedBtn, createProfileBtn, themeToggle, body )

// MOBILE MENU
function openMenu() {
    header.classList.add("header--menu-open");
    mobileMenu.classList.add("mobile-menu--open");
    mobileMenu.setAttribute("aria-hidden", "false");

    toggleButtons.forEach(button => {
        button.setAttribute("aria-expanded", "true");
    })
};

function closeMenu() {
    header.classList.remove("header--menu-open");
    mobileMenu.classList.remove("mobile-menu--open");
    mobileMenu.setAttribute("aria-hidden", "true");

    toggleButtons.forEach(button => {
        button.setAttribute("aria-expanded", "false");
    });

    document.body.style.overflow = "";
};

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("mobile-menu--open");
    isOpen ? closeMenu() : openMenu();
};

toggleButtons.forEach(button => {
    button.addEventListener("click", toggleMenu)
})

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
        document.body.style.overflow = "";
    })
});

// SET THEME
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark") {
    body.classList.add("dark");
} else if(savedTheme === "light") {
    body.classList.remove("dark");
};

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const currentTheme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
})

// PAGE REDIRECT
getStartedBtn.addEventListener("click", () => {
    document.location.href = "auth.html"
});

createProfileBtn.addEventListener("click", () => {
    document.location.href = "auth.html"
});