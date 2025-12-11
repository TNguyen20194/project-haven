const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark") {
    body.classList.add("dark");
} else if(savedTheme === "light") {
    body.classList.remove("dark");
};