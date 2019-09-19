(function(){

let menuSection = () => {
    let menuList = document.querySelector('.food__list');

    menuList.addEventListener('click', e => {
        e.preventDefault();
        let target = e.target;
        const item = target.closest(".food__item");
        const items = document.querySelectorAll(".food__item");
        if (target.className === 'food__title') {
            if (!item.classList.contains('food__item--active')) {
                for (let i=0; i<items.length; i++) {
                    items[i].classList.remove("food__item--active");
                }
                item.classList.add("food__item--active");
            } else {
                item.classList.remove("food__item--active");
            }
        }
    })
};
menuSection();
})()