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

});
