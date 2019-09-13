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

//>>> slider

$(function(){

    var moveSlider = function (container, slideNum) {
        var 
            items = container.find('.slider__item'),
            activeItem = items.filter('.active'),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            list = container.find('.slider__list'),
            duration = 500;

        if (reqItem.length) {
            list.animate({
                'left' : -reqIndex*100 + '%'
            }, duration, function(){
                activeItem.removeClass('active');
                reqItem.addClass('active');
            });
        }
    }

    $('.slider-btn').on('click', function(e){
        e.preventDefault();

        var $this = $(this),
            container = $this.closest('.slider__container'),
            items = $('.slider__item', container),
            activeItem = items.filter('.active'),
            existedItem, edgeItem, reqItem;

        if ($this.hasClass('arrow-right')) {
            existedItem = activeItem.next();
            edgeItem = items.first();
        } 

        if ($this.hasClass('arrow-left')) {
            existedItem = activeItem.prev();
            edgeItem = items.last();
        }

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlider(container, reqItem);
    });
});

//ingredients mouseenter/mouseleave

$('.ingredients').mouseenter(function(){
    $this = $(this);
    $this.addClass('ingredients--active');

    $('.ingredients__close').on('click',function(){
        $this.removeClass('ingredients--active');
    });

});

$('.ingredients').mouseleave(function(){
    $this = $(this);
    $this.removeClass('ingredients--active');
});

//<<< slider
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
//>>> one page scroll

$(function(){

    // $(document).on('wheel', function(e){

    //     var $this = $(this),
    //         sections = $this.find('.section'),
    //         activeSection = sections.filter('.active'),
    //         nextItem = activeSection.next(),
    //         nextIndex = nextItem.index(),
    //         prevItem = activeSection.prev(),
    //         prevIndex = prevItem.index(),
    //         container = $this.find('.wrapper'),
    //         deltaY = e.originalEvent.deltaY,
    //         duration = 500,
    //         dotIndex;

    //         if (deltaY > 0) {
    //             if (nextItem.length) {
    //                 container.animate({
    //                     'top' : -nextIndex*100 + '%'
    //                 }, duration, function () {
    //                     activeSection.removeClass('active');
    //                     nextItem.addClass('active');
    //                     coloringDots();
    //                 });       
    //             };
    //         } else if (deltaY < 0) {
    //             if (prevItem.length) {
    //                 container.animate({
    //                     'top' : prevIndex*100 + '%'
    //                 }, duration, function () {
    //                     activeSection.removeClass('active');
    //                     prevItem.addClass('active');
    //                     coloringDots();
    //                 });
    //             };
    //         };

    //         dotIndex = activeSection.index();
           
    //         var coloringDots = function (index) {
    //             $(document)
    //                 .find('.fixed-menu__item')
    //                 .eq(index)
    //                 .addClass('fixed-menu__item--active')
    //                 .siblings()
    //                 .removeClass('fixed-menu__item--active')
    //         }
            
    //         coloringDots(dotIndex);

    // });
});

$(function(){

    var generateDots = function(){
        $(".section").each(function(){
            var dot = $('<li>', {
                attr: {
                    class: 'fixed-menu__item'
                },
                html: '<div class="fixed-menu__dot"></div>'
            });

            $('.fixed-menu').append(dot);
        });
        $('.fixed-menu__item').first().addClass('fixed-menu__item--active');
    };

    generateDots();

    var coloringDots = function (index) {
        $('.fixed-menu')
            .find('.fixed-menu__item')
            .eq(index)
            .addClass('fixed-menu__item--active')
            .siblings()
            .removeClass('fixed-menu__item--active')
    };

    $('.fixed-menu__item').on('click', function(e){
                
    });

    $('.wrapper').on('wheel', function(e){

        var $this = $(this),
            sections = $this.find('.section'),
            activeSection = sections.filter('.active'),
            activeIndex = activeSection.index(),
            nextSection = activeSection.next();
            nextIndex = nextSection.index(),
            prevSection = activeSection.prev(),
            prevIndex = prevSection.index(),
            deltaY = e.originalEvent.deltaY,
            duration = 500;

            coloringDots(activeIndex); 

            if (deltaY > 0) {
                if (nextSection.length) {
                    $this.animate({
                        'top' : -nextIndex*100 + '%'
                    }, duration, function(){
                        activeSection.removeClass('active');
                        nextSection.addClass('active');
                    });
                };
            } else {
                if (prevSection.length) {
                    $this.animate({
                        'top' : -prevIndex*100 + '%'
                    }, duration, function(){
                        activeSection.removeClass('active');
                        prevSection.addClass('active');
                    });
                };
            };  
    });
});
//<<<one page scroll