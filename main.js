let popupMenu = document.querySelector('#popup-menu');
let openIcon = document.querySelector('#hamburger-menu');
let closeIcon = document.querySelector('#close');

openIcon.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.className = "disable-scrolling";
    popupMenu.style.display = "block";
});

closeIcon.addEventListener("click", function(e) {
    popupMenu.style.display = "none";
    document.body.classList.remove("disable-scrolling");
})