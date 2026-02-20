function initReviewSlider() {
    const reviewSlider = document.getElementById('reviews-slider');
    if(!reviewSlider) return;

    const slides = reviewSlider.querySelectorAll('.swiper-slide');
    
    const swiper = new Swiper(reviewSlider, {
        loop: slides.length > 3 ? true : false,
        slidesPerView: 3,
        observer: true,
        observeParents: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev', 
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        }
    });
}

function initNewsSlider() {
    const newsSlider = document.getElementById('news-slider');

    if(!newsSlider) return;

    const swiper = new Swiper(newsSlider, {
        loop: true,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev', 
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        }
    })
}

function init() {
    initReviewSlider();
    initNewsSlider();
}

document.addEventListener('DOMContentLoaded', init);