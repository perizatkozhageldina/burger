(function(){

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
})()