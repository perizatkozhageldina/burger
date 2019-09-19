(function(){

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
})()