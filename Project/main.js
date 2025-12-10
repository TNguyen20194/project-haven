const header = document.querySelector("header");
const mobileMenu = document.getElementById("mobile-menu");
const toggleButtons = document.querySelectorAll(".mobile-menu-toggle");


console.log(header, mobileMenu, toggleButtons.length)

// if (!header || !mobileMenu || toggleButtons.length === 0) return;

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


