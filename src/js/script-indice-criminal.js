/*!
 * Indice criminal do estado do rio de janeiro.
 * Desenvolvido por Ministério Público do Estado do Rio de Janeiro em: 03/07/2017
 */

$(function(){
    // Fullpage
    $('#fullpage').fullpage({
        anchors: ['anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6'],
        menu: '#menu',
        scrollOverflow: true
    });

    //Tooltip funnel
    $('[data-toggle="tooltip-filtro"]').tooltip({
        template:'<div class="tooltip tooltip-filtro" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // Range
    $('#sliderMaisViolentas').slider({
        tooltip: 'hide'
    });

    // Range add class
    var $qtdItens = $('#maisViolentas').data('count');
    var $liRange = $('#maisViolentas li');
    var $posSlider;
    var $countPreviousSlider = 0;

    $('#sliderMaisViolentas').on('change', function(){
        $posSlider = $('#sliderMaisViolentas').attr('value') - 1;
        $liRange.removeClass('active');
        $($liRange[$posSlider]).addClass('active');

    });
});

