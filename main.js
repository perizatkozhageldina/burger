//>>> pop-up menu
let popupMenu = document.querySelector('#popup-menu');
let openIcon = document.querySelector('#hamburger-menu');
let closeIcon = document.querySelector('#close');
let menuList = document.querySelector('#popup-menu__list');

openIcon.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.classList.add("disable-scrolling");
    popupMenu.style.display = "block";
});

function closeMenu () {
    popupMenu.style.display = "none";
    document.body.classList.remove("disable-scrolling");
};

closeIcon.addEventListener("click", function(){
    closeMenu();
});

menuList.addEventListener("click", function(e){
    target = e.target;
    if (target.classList.contains('popup-menu__link')) {
        closeMenu();
    }
});
//<<< pop-up menu

//>>> team section
let membersItem = document.querySelectorAll('#members__item');

for (let i=0; i<membersItem.length; i++) {
    membersItem[i].addEventListener("click", function(e){
    e.preventDefault();
    membersItem[i].classList.toggle("members__item--active");
    });
}

//<<< team section
//>>> menu section
let foodItem = document.querySelectorAll('#food__item');

for (let i=0; i<foodItem.length; i++) {
    foodItem[i].addEventListener("click", function(e){
        e.preventDefault();
        foodItem[i].classList.toggle("food__item--active");
    });
}
//<<< menu section
