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

// let foodItem = document.querySelectorAll('#food__item');

// for (let i=0; i<foodItem.length; i++) {
//     foodItem[i].addEventListener("click", function(e){
//         e.preventDefault();
//         foodItem[i].classList.toggle("food__item--active");
//     });
// }
//<<< menu section
//>>> form section

const myForm = document.querySelector('#myForm');
const orderButton = document.querySelector('#orderButton');

orderButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm(myForm)) {
        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value
        };

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        console.log(xhr);
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener ('onload', () => {
            if (xhr.response.status == true) {
                console.log('Все ок!');
            };
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