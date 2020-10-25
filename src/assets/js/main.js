'use strict';

(function ($) {    

    /*--------------------------------
        Property Image Carousel Slider
    -----------------------------------*/
    $('.property-img').owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

})(jQuery);