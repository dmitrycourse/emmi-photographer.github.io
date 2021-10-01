"use strict"

let wrapper = document.querySelector('.wrapper');

$(window).on('load', function () {
    setTimeout(() => {
        $('.preloader').fadeOut().end().delay(400).fadeOut('slow').add('hide');
        wrapper.classList.add('_loaded');
    }, 2000);
    
});
/*
$(".img").click(function () {

    $(this).toggleClass("zoom");
});

    

/*document.addEventListener('DOMContentLoaded', function() {
    //wrapper.classList.add('_loaded');
    //var preloader = document.getElementById('preloader');
   // preloader.classList.add('hide');
  //  setTimeout(function() {
        wrapper.classList.add('_loaded');
        var preloader = document.getElementById('preloader');
        var body = document.body;
        preloader.classList.add('hide');
        preloader.style.display = 'none';
        body.classList.add('block');
    }, 3000);
});
*/
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


