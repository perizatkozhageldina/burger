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

//>>>

const slide = (function(){
    const left = document.querySelector('.arrow-left');
    const right = document.querySelector('.arrow-right');
    const slider = document.querySelector('.slider__list');

    right.addEventListener("click", function() {
        slider.appendChild(slider.firstElementChild);
    });

    left.addEventListener("click", function() {
        slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
    });
});
slide();

//<<<

//>>> team section

let teamSection = () => {
    let membersName = document.querySelectorAll('.members__name');

    membersName.forEach(function(membersLink) {
        membersLink.addEventListener("click", function(e) {
            e.preventDefault();
            let activeMember = document.querySelector(".members__item--active");

            if (activeMember) {
                let membersDesc = activeMember.querySelector(".members__desc");
                membersDesc.style.height = "0px";
                activeMember.classList.remove("members__item--active");
            }

            if (!activeMember || activeMember.querySelector(".members__name") !== e.target) {
                let currentMember = e.target.closest(".members__item");
                currentMember.classList.add("members__item--active");
                let currentMemberDesc = currentMember.querySelector(".members__desc");
                currentMemberDesc.style.height = currentMemberDesc.scrollHeight + "px";
            }
        })
    })
};
teamSection();
//<<< team section
//>>> menu section

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
//<<< menu section

//>>> reviews section

const reviewsList = document.querySelector('.reviews__list');
const reviewsModal = document.querySelector('.reviews-modal');
const reviewsClose = document.querySelector('.reviews-modal__close');
const reviewsTitle = document.querySelector('.reviews-modal__title');
const reviewsDesc = document.querySelector('.reviews-modal__desc');
let title = "Константин Спилберг";
let desc = "Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.";
// console.log(reviewsClose);

reviewsClose.addEventListener('click', function(e){
    e.preventDefault();
    reviewsModal.style.display = "none";
    document.body.style.overflow = "initial";
});

reviewsList.addEventListener('click', function(e) {
    e.preventDefault();
    var target = e.target.closest('button');
    if (!target) return;
    reviewsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    reviewsTitle.textContent = title;
    reviewsDesc.textContent = desc;

});

//<<< reviews section

//>>> form section

const myForm = document.querySelector('#myForm');
const orderButton = document.querySelector('#orderButton');
let modal = document.querySelector('.form__modal');
let close = document.querySelector('.modal__close');
let message = document.querySelector('.modal__message');

close.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.style.overflow = "initial";
    modal.style.display = "none";
});

orderButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm(myForm)) {
        let data = new FormData();
        data.append("name", myForm.elements.name.value);
        data.append("phone", myForm.elements.phone.value);
        data.append("comment", myForm.elements.comment.value);
        data.append("to","perizat.kozhageldina@nu.edu.kz");

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(data);
        xhr.addEventListener ('load', () => {            
            document.body.style.overflow = "hidden";
            modal.style.display = "flex";
            message.textContent = xhr.response.message;
        });
    }

    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }
        return valid;
    }

    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    }

});

//<<< form section