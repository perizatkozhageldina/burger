$().ready(function(){
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
//>>> how we work section

    let video;
    let durationControl;
    let soundControl;
    let intervalId;
    
    video = document.getElementById("video");
    play = document.getElementById("play");
    playGray = document.getElementById("play-gray");
    pause = document.getElementById("pause");

    video.addEventListener('click', playStop);
    play.addEventListener('click', playStop);
    playGray.addEventListener('click', playStop);
    pause.addEventListener('click', playStop);

    let micControl = document.getElementById('sound');
    micControl.addEventListener('click', soundOf);

    durationControl = document.getElementById('regulator__line');
    durationControl.addEventListener('mousedown', stopInterval);

    durationControl.addEventListener('mouseup', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;

    soundControl = document.getElementById('volume__line');
    soundControl.addEventListener('mouseup', changeSoundVolume);

    soundControl.min = 0;
    soundControl.max = 10;

    soundControl.value = soundControl.max;


    video.addEventListener('ended', function () {
        $(play).toggleClass("play--active");
        video.currentTime = 0;
    }, false);

    function playStop() {
        $(play).toggleClass("play--active");
        $(playGray).toggleClass("play-gray--active");
        $(pause).toggleClass("pause--active");
        durationControl.max = video.duration;
        
        if(video.paused) {
            video.play();
            intervalId = setInterval(updateDuration, 1000/66)
        } else {
            video.pause();
            clearInterval(intervalId);
        }
    }

    function stopInterval () {
        video.pause();
        clearInterval(intervalId);
    }

    function setVideoDuration (){
        video.currentTime = durationControl.value;
        intervalId = setInterval(updateDuration, 1000/66);
        
        if (video.paused) {
            video.play();
            document.getElementsByClassName("play")[0].classList.add("play--active");
        } else {
            video.pause();
        }
    }

    function updateDuration() {
        durationControl.value = video.currentTime;
    }

    function soundOf () {
        if (video.volume === 0) {
            video.volume = soundLevel;
            soundControl.value = soundLevel*10;
        } else {
            soundLevel = video.volume;
            video.volume = 0;
            soundControl.value = 0;
        }
    }

    function changeSoundVolume () {
        video.volume = soundControl.value/10;
    }

//<<< how we work section
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

//<<<one page scroll
//>>> contacts

ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул.Литераторов д.19</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger--img" src="/content/main/burger.png" style="max-height: 70px;" alt="Burger"/>',
            'Самые вкусные бургеры у нас! </br>Заходите по адресу: </br>ул.Литераторов д.19',
            '</div>'
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: '<div class="map__hint">Малый проспект В О, д.64</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger--img" src="/content/main/burger.png" style="max-height: 70px;" alt="Burger"/>',
            'Самые вкусные бургеры у нас! </br>Заходите по адресу: </br>Малый проспект В О, д.64',
            '</div>'
        ]
    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: '<div class="map__hint">наб. реки Фонтанки д.19/div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger--img" src="/content/main/burger.png" style="max-height: 70px;" alt="Burger"/>',
            'Самые вкусные бургеры у нас! </br>Заходите по адресу: </br>наб. реки Фонтанки д.19',
            '</div>'
        ]
    }
],
    geoObjects = [];

function init () {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (i=0; i<placemarks.length; i++){
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
        },
        {
            iconLayout: 'default#image',
            iconImageHref: '/content/svg/map-marker.svg',
            iconImageSize: [46,57],
            iconImageOffset: [-23,-57]
        });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: '/content/main/burger.png',
                size: [100,100],
                offset: [-50,-50],
                height: [10]
            }
        ],
        clusterIconContentLayout: null
    });
    
    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
    //map.geoObjects.add(placemark);
}
//<<< contacts

});