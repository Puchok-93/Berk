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

function initMainPageMethods() {
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

    initReviewSlider();
    initNewsSlider();
}

function initCatalogMethods() {

    function initOpenFilters() {
        const filters = document.getElementById('filters');

        if(!filters) {
            return;
        }

        const overlay = document.querySelector('.overlay');
        const filtersBtn = document.getElementById('filters-btn');
        const filtersContent = document.querySelector('.filters-content');
        const filtersCloseBtn = document.querySelector('.filters__close-btn');

        function showFilters() {
            overlay.classList.add('js-active');
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight;
            filtersContent.style.maxHeight = `${vh - '80px'}`;
        }

        function hideFilters() {
            overlay.classList.remove('js-active');
            document.body.style.overflow = 'visible';
        }

        filtersBtn.addEventListener('click', showFilters);
        filtersCloseBtn.addEventListener('click', hideFilters);
    }

    function initSorting() {
        const sorting = document.getElementById('sorting');

        if(!sorting) {
            return;
        }

        const sortingList = document.getElementById('sorting-list');
        const currentSorting = document.getElementById('current-sorting')

        sorting.addEventListener('click', (e) => {
            e.stopPropagation();
            sortingList.classList.toggle('js-active');
        });

        sortingList.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = e.target.closest('.sorting-list__item');
            
            if(!target) {
                return;
            }

            const sort = target.dataset.nameSort;
            currentSorting.textContent = sort;
            
            sortingList
                .querySelectorAll('.sorting-list__item')
                .forEach(item => item.classList.remove('js-active'));
                
            target.classList.add('js-active');
            console.log(target)
            sortingList.classList.remove('js-active');
        })

        document.addEventListener('click', (e) => {
            if(!sorting.contains(e.target)) {
                sortingList.classList.remove('js-active');
            }
        })
    };

    function initRangeSlider() {
        const sliders = document.querySelectorAll('.range-filter');

        sliders.forEach(slider => {
            const min = +slider.dataset.min || 0;
            const max = +slider.dataset.max || 100;
            const gap = +slider.dataset.gap || 100;

            const inputMin = slider.querySelector('.range-filter__input--min');
            const inputMax = slider.querySelector('.range-filter__input--max');

            const thumbMin = slider.querySelector('.range-filter__thumb--min');
            const thumbMax = slider.querySelector('.range-filter__thumb--max');

            const range = slider.querySelector('.range-filter__range');

            // ===== Настройка range =====
            thumbMin.min = min;
            thumbMin.max = max;
            thumbMax.min = min;
            thumbMax.max = max;

            thumbMin.value = min;
            thumbMax.value = max;

            // ===== Форматирование =====
            const formatValue = (value) => Number(value).toLocaleString('en-US').replace(/,/g, ' ');;

            const parseValue = (value) => Number(value.replace(/[^0-9]/g, '')) || 0;

            // ===== Обновление визуального диапазона =====
            const updateRange = () => {
                const minVal = +thumbMin.value;
                const maxVal = +thumbMax.value;

                const percentMin = ((minVal - min) / (max - min)) * 100;
                const percentMax = ((maxVal - min) / (max - min)) * 100;

                range.style.left = percentMin + '%';
                range.style.width = (percentMax - percentMin) + '%';
            };

            // ===== Слайдер → input =====
            const updateFromSlider = (e) => {
                let minVal = +thumbMin.value;
                let maxVal = +thumbMax.value;

                if (maxVal - minVal < gap) {
                    if (e.target === thumbMin) {
                        thumbMin.value = maxVal - gap;
                    } else {
                        thumbMax.value = minVal + gap;
                    }
                }

                inputMin.value = thumbMin.value;
                inputMax.value = thumbMax.value;

                updateRange();
            };

            // ===== Input → slider (без перезаписи во время ввода) =====
            const updateFromInput = () => {
                let minVal = parseValue(inputMin.value);
                let maxVal = parseValue(inputMax.value);

                if (minVal < min) minVal = min;
                if (maxVal > max) maxVal = max;

                if (maxVal - minVal < gap) {
                    if (document.activeElement === inputMin) {
                        minVal = maxVal - gap;
                    } else {
                        maxVal = minVal + gap;
                    }
                }

                thumbMin.value = minVal;
                thumbMax.value = maxVal;

                updateRange();
            };

            const normalizeAndFormat = (changedInput) => {
                let minVal = parseValue(inputMin.value);
                let maxVal = parseValue(inputMax.value);

                // Ограничения диапазона
                if (minVal < min) minVal = min;
                if (maxVal > max) maxVal = max;

                // Защита от пересечения
                if (minVal > maxVal - gap) {
                    if (changedInput === inputMin) {
                        minVal = maxVal - gap;
                    } else {
                        maxVal = minVal + gap;
                    }
                }

                thumbMin.value = minVal;
                thumbMax.value = maxVal;

                inputMin.value = formatValue(minVal);
                inputMax.value = formatValue(maxVal);

                updateRange();
            };


            // ===== Форматирование =====
            const formatInputs = () => {
                inputMin.value = formatValue(parseValue(inputMin.value));
                inputMax.value = formatValue(parseValue(inputMax.value));
            };

            const removeFormatting = (input) => {
                input.value = parseValue(input.value);
            };

            // ===== События =====
            thumbMin.addEventListener('input', updateFromSlider);
            thumbMax.addEventListener('input', updateFromSlider);

            inputMin.addEventListener('input', updateFromInput);
            inputMax.addEventListener('input', updateFromInput);

            inputMin.addEventListener('focus', () => removeFormatting(inputMin));
            inputMax.addEventListener('focus', () => removeFormatting(inputMax));

    inputMin.addEventListener('blur', () => normalizeAndFormat(inputMin));
    inputMax.addEventListener('blur', () => normalizeAndFormat(inputMax));

            // ===== Инициализация =====
            inputMin.value = formatValue(min);
            inputMax.value = formatValue(max);

            updateRange();
        });
    }

    initOpenFilters();
    initSorting();
    initRangeSlider();
}

function initDetailProductMethods() {
    const detailedProduct = document.getElementById('page-detailed-product');
    
    if(!detailedProduct) return;
    
    function initDropDown() {
        const deatailProductOptionBtns = document.querySelectorAll(".detailed-product-option__btn");
        deatailProductOptionBtns.forEach(optionBtn => {
            optionBtn.addEventListener("click", () => {
                const option = optionBtn.parentElement;
                option.classList.toggle("js-active");
            });
        });
    }

    function initSelectVariations() {
        const productVariations = document.querySelectorAll('.detailed-product-select-variation');

        productVariations.forEach(container => {

            container.addEventListener('click', (e) => {
                const target = e.target.closest('.detailed-product-select-variation__item');

                if(!target || !container.contains(target)) return;
                if(target.classList.contains('js-active')) return;

                container.querySelectorAll('.detailed-product-select-variation__item').forEach(item => item.classList.remove('js-active'));
                target.classList.add('js-active');
            })
        })
    }

    function initProductGallery() {
        var thumbs = new Swiper('#detailed-product-thumb-gallery', {
            loop: true,
            spaceBetween: 20,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });

        const swiper = new Swiper('#detailed-product-main-gallery', {
            loop: true,
            spaceBetween: 20,
            navigation: {
                nextEl: ".detailed-product-main-gallery-controls__control.swiper-button-next",
                prevEl: ".detailed-product-main-gallery-controls__control.swiper-button-prev",
            },
            thumbs: {
                swiper: thumbs,
            },
        })
    }

    function initTabs() {
        const triggersList = document.querySelector('.detailed-products-triggers');
        const triggers = triggersList.querySelectorAll('.detailed-products-triggers__trigger');
        const tabs = document.querySelectorAll('.detailed-product-tab-content__tab');

        function hideActiveElements() {
            tabs.forEach(tab => tab.classList.remove('js-active'));
            triggers.forEach(trigger => trigger.classList.remove('js-active'));
        }

        function showActiveElements(i = 0) {
            tabs[i].classList.add('js-active');
            triggers[i].classList.add('js-active');
        }

        hideActiveElements();
        showActiveElements();

        triggersList.addEventListener('click', (e) => {
            const target = e.target.closest('.detailed-products-triggers__trigger');
            triggers.forEach((item, i) => {
                if(item === target) {
                    hideActiveElements();
                    showActiveElements(i);
                }
            })
        })
    }

    initDropDown();
    initSelectVariations();
    initProductGallery();
    initTabs();
}

function init() {
    initHeaderMenu();
    initMainPageMethods()
    initCatalogMethods();
    initDetailProductMethods();
}

document.addEventListener('DOMContentLoaded', init);