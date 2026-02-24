function initReviewSlider() {
    const reviewSlider = document.getElementById('reviews-slider');
    if(!reviewSlider) return;

    const slides = reviewSlider.querySelectorAll('.swiper-slide');
    
    const swiper = new Swiper(reviewSlider, {
        loop: slides.length > 3 ? true : false,
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

function initHeaderMenu() {
    const headerMenu = document.querySelector('.header-menu');
    const burgerBtn = document.getElementById('header-burger-btn');
    
    if(!headerMenu || !burgerBtn) return;

    const closeBtn = headerMenu.querySelector('.header-menu-heading__close-bnt');

    burgerBtn.addEventListener('click', (e) => {
        const target = e.target.closest('.header-burger-btn');

        if(target) {
            headerMenu.classList.add('js-is-open');
        }
    })

    closeBtn.addEventListener('click', (e) => {
        const target = e.target.closest('.header-menu-heading__close-bnt');

        if(target) {
            headerMenu.classList.remove('js-is-open');
        }
    })
}

function init() {
    initReviewSlider();
    initNewsSlider();
    initHeaderMenu();
}

document.addEventListener('DOMContentLoaded', init);