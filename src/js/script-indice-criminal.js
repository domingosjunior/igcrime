/*!
 * Indice criminal do estado do rio de janeiro.
 * Desenvolvido por Ministério Público do Estado do Rio de Janeiro em: 03/07/2017
 */

$(function(){

    // Add class in topbar
    $(window).scroll(function(){
        var $bar = $('.topbar');
        $bar.offset().top > 0 ? $bar.addClass('active') : $bar.removeClass('active');
    });

    //Anchor smooth scrolling
     $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('href');
        $(target).velocity('scroll', {
            duration: 500,
            offset: -40,
            easing: 'ease-in-out'
        });
    });

    //Tooltip funnel
    $('[data-toggle="tooltip-filtro"]').tooltip({
        template:'<div class="tooltip tooltip-filtro" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

});
