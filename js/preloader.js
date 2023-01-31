function preloaderFadeOutInit() {
    $('#preloader').fadeOut(1000);
    $('body').removeAttr('id');
}

jQuery(window).on('load', function () {
    (function ($) {
        preloaderFadeOutInit();
    })(jQuery);
});

