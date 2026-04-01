/* Универсальные методы */

// Инициализация выпадающих списков 
function initDropDown(trigger) {
    const triggers = document.querySelectorAll(trigger);
    triggers.forEach(el => {
        el.addEventListener('click', () => {
            const parent = el.parentElement;
            parent.classList.toggle('js-active');
        });
    });
}

function initHeaderMethods(){
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
    };

    function initHeaderMenuSlider() {
        let mainMenuSlider;
        let thumbMenuSlider;

        function initDeskMenuSlider() {
            thumbMenuSlider = new Swiper('#header-menu-thumb-slider', {
                    loop: true,
                    spaceBetween: 20,
                    slidesPerView: 4,
                    freeMode: true,
                    watchSlidesProgress: true,
            });

            mainMenuSlider = new Swiper('#header-menu-main-slider', {
                loop: true,
                spaceBetween: 20,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                thumbs: {
                    swiper: thumbMenuSlider,
                },
            })
        }

        function initMobMenuSlider () {
            mainMenuSlider = new Swiper('#header-menu-main-slider', {
                slidesPerView: 'auto',
                observer: true,
                observeParents: true,
                spaceBetween: 20,
                scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: false,
                }
            })
        }

        function destroyMenuSlider() {
            if(mainMenuSlider) {
                mainMenuSlider.destroy(true,true);
                mainMenuSlider = null;
            }

            if(thumbMenuSlider) {
                thumbMenuSlider.destroy(true,true);
                thumbMenuSlider = null;
            }
        }

        function checkViewPort() {
            destroyMenuSlider();

            if(window.innerWidth > 767) {
                initDeskMenuSlider();
            } else {
                initMobMenuSlider();
            }
        }

        checkViewPort();
        window.addEventListener('resize', checkViewPort);
    };

    function initMobSearch() {
        const headerSearch = document.querySelector('.header-search');
        const headerSearchClose = document.querySelector('.header-search__close-btn');
        const searchBtn = document.querySelector('.search-btn');

        searchBtn.addEventListener('click', (e) => {
            if(!headerSearch.classList.contains('js-active')) {
                headerSearch.classList.add('js-active');
            } else {
                headerSearch.classList.remove('js-active');
            }
        })

        headerSearchClose.addEventListener('click', (e) => {
            if(headerSearch.classList.contains('js-active')) {
                headerSearch.classList.remove('js-active');
            } else {
                headerSearch.classList.add('js-active');
            }
        })
    };

    initHeaderMenu();
    initHeaderMenuSlider();

    if(window.innerWidth < 1220) {
        initMobSearch();
    }
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
                nextEl: '.detailed-product-main-gallery-controls__control.swiper-button-next',
                prevEl: '.detailed-product-main-gallery-controls__control.swiper-button-prev',
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
    initDropDown('.detailed-product-option__btn');
}

function initBasetMethods() {
    const pageBasket = document.getElementById('page-basket');

    if(!pageBasket) return;

    const totalCost = document.querySelector('.order-details-price__total');
    const totalQuantity = document.querySelector('.order-details-positions__count');

    function calcTotalCost() {
        const products = document.querySelectorAll('.basket-product');
        if(products.length === 0) return;

        const total = [...products].reduce((sum, product) => {
            const price = Number(product.dataset.productPrice);
            const quantity = Number(product.querySelector('.basket-product-counter__value').value);
            return sum + price * quantity;
        }, 0);

        totalCost.textContent = total;
    }

    function calcTotalPosition() {
        const products = document.querySelectorAll('.basket-product');

        if(products.length === 0) return;

        let productsQuantity = 0;
        
        products.forEach(product => {
            const quantity = Number(product.querySelector('.basket-product-counter__value').value);
            productsQuantity += quantity;
        });

        totalQuantity.textContent = productsQuantity;
    }

    function initProductCounter() {
        const products = document.querySelectorAll('.basket-product');
        
        if(products.length === 0) return;

        let totalCost;

        products.forEach(product => {
            const productCounter = product.querySelector('.basket-product-counter');
            const productPrice = product.dataset.productPrice;
            let productCost = product.querySelector('.basket-product-price__cost');
            
            totalCost += product.dataset.productPrice;

            productCounter.addEventListener('click', (e) => {
                const target = e.target.closest('.basket-product-counter__btn');
                const targetType = target.dataset.type;
                const counter = productCounter.querySelector('.basket-product-counter__value');

                if(targetType === 'plus') {
                    counter.value = +counter.value + 1;
                    productCost.textContent = productPrice * counter.value;
                    calcTotalCost();
                    calcTotalPosition();
                } else if(targetType === 'minus') {
                    if (counter.value > 1) {
                        counter.value = +counter.value - 1;
                        productCost.textContent = productPrice * counter.value;
                        target.disabled = false;
                    } else {
                        target.disabled = true;
                    }
                    calcTotalCost();
                    calcTotalPosition();
                }
            })
        });
    }

    initProductCounter();
    initDropDown('.basket-dropdown-btn');
    calcTotalCost();
    calcTotalPosition();
}

function initCompareMethods() {
    const compare = document.getElementById('page-compare');

    function initCompareProductsScroll() {
        const GAP = 30;
        const container = document.querySelector('.compare-products-inner-wrapper');
        const btnLeft = document.querySelector('.compare-scroll-btn--left');
        const btnRight = document.querySelector('.compare-scroll-btn--right');
        const item = container.querySelector('.compare-property__value');
        const scrollStep = item.offsetWidth + GAP;

        btnLeft.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollStep,
                behavior: 'smooth'
            });
        });

        btnRight.addEventListener('click', () => {
            container.scrollBy({
                left: scrollStep,
                behavior: 'smooth'
            });
        });
    }

    function initDifferencesChars() {
        const toggle = document.getElementById('differences-chars-btn');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('js-active');

            const compareProperties = document.querySelectorAll('.compare-property');
            compareProperties.forEach(prop => {
                
                const values = Array.from(prop.querySelectorAll('.compare-property__value')).map(el => el.textContent.trim());

                const allEqual = values.every(v => v === values[0]);
                if (allEqual && toggle.classList.contains('js-active')) {
                    prop.style.display = 'none';
                } else {
                    prop.style.display = '';
                }
            });
        });
    }

    function initMobCompareSlider() {
        const comparedSlider = new Swiper('#compared-products-1', {
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: false,
            },
        })

        const comparedSlider2 = new Swiper('#compared-products-2', {
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: false,
            },
        })
    }

    if(!compare) return;

    if(window.innerWidth < 768) {
        initMobCompareSlider();
    } else {
        initCompareProductsScroll();
        initDifferencesChars();
    }
}

function initPersonalMethods() {
    const personal = document.getElementById('page-personal');
    const orders = document.getElementById('page-personal-orders');
    
    function initGenderSelect() {
        const genderInputBlock = personal.querySelector('.input-block--gender');
        const genderInput = genderInputBlock.querySelector('.input-block--gender input');
        const genderList = personal.querySelector('.gender-list');

        genderInput.addEventListener('click', (e) => {
            const target = e.target.closest('.input-block--gender');

            if(!target.classList.contains('js-active')) {
                target.classList.add('js-active');
            }
        });

        genderList.addEventListener('click', (e) => {
            const item = e.target.closest('.gender-list__item')
            const itemValue = item.dataset.gender;
            
            genderInput.value = itemValue;
            document.querySelectorAll('.gender-list__item').forEach(el => el.classList.remove('js-selected'));
            item.classList.add('js-selected');
            genderInputBlock.classList.remove('js-active');
        });

        document.addEventListener('click', (e) => {
            if (!genderInputBlock.contains(e.target)) {
                genderInputBlock.classList.remove('js-active');
            }
        });
    }

    function initValidateFiels() {
        function validatePhoneNumber() {
            const phone = document.getElementById('phone');
            phone.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[a-zA-Zа-яА-ЯёЁ]/g, '');
                if (phone.value.trim() === '') {
                    phone.value = '+';
                    }
            });
        }

        function validateBirthday() {
            const birthday = document.getElementById('birthday');
            birthday.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[a-zA-Zа-яА-ЯёЁ]/g, '');
            });
        }

        validatePhoneNumber();
        validateBirthday();
    }

    function initToggleVisiblePass() {
        const inputBlockPassword = document.querySelectorAll('.input-block--password');
        
        inputBlockPassword.forEach(inputBlock => {
            const inputPassword = inputBlock.querySelector('input');
            const visiblePassBtn = inputBlock.querySelector('.visible-pass-btn');

            visiblePassBtn.addEventListener('click', (e) => {
                const target = e.target.closest('.visible-pass-btn');
                target.classList.toggle('js-active');
                if(target.classList.contains('js-active')) {
                    inputPassword.type = 'text';
                } else {
                    inputPassword.type = 'password';
                }
            })
        })
    }

    function initConfirmNewPassword() {
        const newPassInput = document.getElementById('new-password');
        const confirmPassInput = document.getElementById('confirm-new-password');
        const changePassBtn = document.getElementById('change-pass-btn');

        function validatePasswords() {
            if (
                newPassInput.value.length > 0 &&
                confirmPassInput.value.length > 0 &&
                newPassInput.value === confirmPassInput.value
            ) {
                changePassBtn.disabled = false;
            } else {
                changePassBtn.disabled = true;
            }
        }

        newPassInput.addEventListener('input', validatePasswords);
        confirmPassInput.addEventListener('input', validatePasswords);

    }

    if(personal) {
        initGenderSelect();
        initValidateFiels();
        initToggleVisiblePass();
        initConfirmNewPassword();
    } else if(orders) {
        initDropDown('.order-info');
    } else {
        return;
    };
}

function init() {
    initHeaderMethods();
    initMainPageMethods()
    initCatalogMethods();
    initDetailProductMethods();
    initBasetMethods();
    initCompareMethods();
    initPersonalMethods();
}

document.addEventListener('DOMContentLoaded', init);