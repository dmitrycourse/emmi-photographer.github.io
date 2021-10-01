"use strict"


let wrapper = document.querySelector('.wrapper');
let element = document.querySelectorAll('.screen__image');
let pageSlider = new Swiper('.page', {
    // Свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    // Вертикальный слайдер
    direction: 'vertical',

    // Количество слайдов для показа
    slidesPerView: 'auto',
    
    // Включаем параллакс
    parallax: true,

    // Управление клавиатурой
    keyboard: {
        // Включить/Выключить
        enabled: true,
        // Включить/Выключить
        // только когда слайдер
        // в пределах вьюпорта
        onlyInViewport: true,
        // Включить/Выключить
        // управление клавиатурой
        // pageUp, pageDown
        pageUpDown: true,
    },

    // Управление колесом мыши
    mousewheel: {
        // Чувствительность колеса мыши
        sensitivity: 1,
        // Класс объекта на котором 
        // будет срабатывать прокрутка мышью
        // eventsTarget: ".image-slider"
    },

    // Отключение функционала
    // если слайдов меньше, чем нужно
    watchOverflow: true,

    // Скорость
    speed: 1200,

    // Обновить слайдер
    // при изменении элементов слайдера
    observer: true,

    // Обновить слайдер
    // при изменении родительских
    // эдементов слайдера
    observerParents: true,

    // Обновить слайдер
    // при изменении дочерних
    observerSlideChildren: true,

    // Навигация
    // Булеты, текущее положение, прогрессбар
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },
    // Скролл
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        // Возможность перетаскивать скролл
        draggable: true
    },

    // Отключаем автоинициализацию
    init: false,


    // События
    on: {
        // Событие инициализации
        init: function() {
            menuSlider();
            setScrollType();
            wrapper.classList.add('_loaded');
        },
        // Событие смены слайда
        slideChange: function () {
            menuSliderRemove();
            menuLinks[pageSlider.realIndex].classList.add('_active');
            pagePaginationContacts();
        },
        resize: function () {
            setScrollType();
        },
    },

});

let menuLinks = document.querySelectorAll('.menu__link');

function pagePaginationContacts() {

        let page__pagination__contacts = document.querySelector(".wrapper._loaded .page__pagination");

        if (pageSlider.realIndex == 6) {
            page__pagination__contacts.style.transform = "translate(65px, -50%)";
        } else {
            page__pagination__contacts.style.transform = "translate(0px, -50%)"; 
        }
//     if (pageSlider.realIndex - 1 > 0) {
//         element[pageSlider.realIndex - 1].setAttribute('data-swiper-parallax', "100%");
//         element[pageSlider.realIndex + 1].setAttribute('data-swiper-parallax', "100%");

//     }

    // if (pageSlider.realIndex) {
    //     console.log(pageSlider.realIndex - 1);
    // }
//     if ((element[pageSlider.realIndex].dataset.swiperParallax = "100%") || (element[pageSlider.realIndex + 1].dataset.swiperParallax = "0%")) {
//         element[pageSlider.realIndex].setAttribute('data-swiper-parallax', "0%");
//         element[pageSlider.realIndex + 1].setAttribute('data-swiper-parallax', "100%");
//     }
//    // element[pageSlider.realIndex].setAttribute('data-swiper-parallax', "0%");
//     // if (pageSlider.realIndex > 1) {
//     //     element[pageSlider.realIndex - 1].setAttribute('data-swiper-parallax', "100%");
//     // }
 }

 let options = {threshold: [0.9]};
 let observer = new IntersectionObserver(onEntry, options);
 //let elements = document.querySelectorAll(".screen__image");


 element.forEach(el => {
     observer.observe(el)
 });
//  element.each((i, el) => {
     
//  });

function onEntry(entry){ 
    setTimeout( function() {
     entry.forEach(change => {
             if(change.isIntersecting){
                 //change.target.classList.add("show-animation");
                 //change.target.dataset.swiperParallax = change.target.dataset.swiperParallaxNew;
                 for (let i = 0; i < 6; i++) {
                     element[i].dataset.swiperParallax = '100%';
                 }
                 //element[1].dataset.swiperParallax = '0%';
                 change.target.dataset.swiperParallax = change.target.dataset.swiperParallaxNew;
             };
     });
 } , 0);
}







function menuSlider() {
    if (menuLinks.length > 0) {
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for (let index = 0; index < menuLinks.length; index++) {
            const menuLink = menuLinks[index];
            menuLink.addEventListener("click", function (e) {
               menuSliderRemove();
               pageSlider.slideTo(index, 800); 
               menuLink.classList.add('_active');
               e.preventDefault(); 
            });
        }
    }
}

function menuSliderRemove() {
    let menuLinkActive = document.querySelector('.menu__link._active');
    if (menuLinkActive) {
        menuLinkActive.classList.remove('_active');
    }
}

function setScrollType() {
    if ( wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode = false;
    }
    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');

        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {
                wrapper.classList.add('_free');
                pageSlider.params.freeMode = true;
                break;
            }
        }
    }
}

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
    
}

for (let index = 0; index < menuLinks.length; index++) {
    const menuLink = menuLinks[index];
    menuLink.addEventListener("click", function (e) {
       if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
        }
    });
}

// window.addEventListener('load', function() {
//     var preloader = document.getElementById('preloader');
//     preloader.classList.add('hide');
//     document.body.style.backgroundColor = '#fff';
//     setTimeout(function() {
//         preloader.style.display = 'none';
//     }, 1000);
// });


pageSlider.init();




// for (let index = 0; index < menuLinks.length; index++) {
    
//     if (menuLinks[index].classList.contains("_active")) {
//         console.log(pageSlider[index]);
//     }
    
// }
// console.log(pageSlider.realIndex);




//var element = document.querySelector('#Ls1');

// var Visible = function (target) {
//   // Все позиции элемента
//   var targetPosition = {
//       top: window.pageYOffset + target.getBoundingClientRect().top,
//       left: window.pageXOffset + target.getBoundingClientRect().left,
//       right: window.pageXOffset + target.getBoundingClientRect().right,
//       bottom: window.pageYOffset + target.getBoundingClientRect().bottom
//     },
//     // Получаем позиции окна
//     windowPosition = {
//       top: window.pageYOffset,
//       left: window.pageXOffset,
//       right: window.pageXOffset + document.documentElement.clientWidth,
//       bottom: window.pageYOffset + document.documentElement.clientHeight
//     };

//   if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
//     targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
//     targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
//     targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
//     // Если элемент полностью видно, то запускаем следующий код
//     //document.querySelector(".screen__image").setAttribute('data-swiper-parallax', 0);
//     console.log('Вы видите элемент :)');
//     console.log(element.dataset.swiperParallax)
//   } else {
//     // Если элемент не видно, то запускаем этот код
//     console.clear();
//   };
// };

// // Запускаем функцию при прокрутке страницы
// window.addEventListener('scroll', function() {
//   Visible (element);
// });

// // А также запустим функцию сразу. А то вдруг, элемент изначально видно
// Visible (element);
