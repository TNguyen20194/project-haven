const body = document.body;

// MENUS
const header = document.querySelector("header");
const mobileMenu = document.getElementById("mobile-menu");
const toggleButtons = document.querySelectorAll(".mobile-menu-toggle");
const mobileLinks = mobileMenu.querySelectorAll("a");

// QUOTE
const quote = document.getElementById("quote");
const author = document.getElementById("author");

console.log(quote, author)

// THEME ICON
const themeToggle = document.getElementById("themeToggle");

// CTAs
const getStartedBtn = document.getElementById("getStartedBtn");
const createProfileBtn = document.getElementById("createProfileBtn");
const clientLoginTab = document.querySelectorAll(".clientLoginTab");

console.log(getStartedBtn, createProfileBtn, themeToggle, body, clientLoginTab )

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

// DYNAMIC QUOTE + AUTHOR
let apiQuotes = [];

function newQuote() {
    if(!Array.isArray(apiQuotes) || apiQuotes.length === 0) {
        return;
    };

    const motivationalQuotes = apiQuotes.filter(q => q.tag === "motivational");

    // Use all apiQuotes if motivationalQuotes is empty
    const quoteOptions = motivationalQuotes.length ? motivationalQuotes : apiQuotes;

    console.log(motivationalQuotes)

    const randomQuotes = quoteOptions[Math.floor(Math.random() * quoteOptions.length)];
    author.textContent = `-${randomQuotes.author}`;
    quote.textContent = `"${randomQuotes.text}"`;
    console.log(randomQuotes)
}

async function getQuote() {
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.error(error)
    }
};

// On load
getQuote();

 // PAGE REDIRECT
clientLoginTab.forEach(tab => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();
        document.location.href = "auth.html?mode=login";
    })
})

// === NOTE: Sign up tab should be highligted ===
getStartedBtn.addEventListener("click", () => {
    document.location.href = "auth.html?mode=signup";
});

createProfileBtn.addEventListener("click", () => {
    document.location.href = "auth.html?mode=signup";
});