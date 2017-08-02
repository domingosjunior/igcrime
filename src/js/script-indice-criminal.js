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

    // Range hide tooltip
    $('#sliderMaisViolentas, #sliderMaisSeguras').slider({
        tooltip: 'hide'
    });

    // Show cards
    function showCards(config) {

        var element = {
            valueInput: config.valueInput - 1,
            listRange: config.listRange,
            scripCard: $(config.scripCard).html(),
        }

        var rangeDates = $(element.listRange).map(function (index, item) {
            return $(item).data('rangeyear');
        })

        // Get Year info
        function getYearIndiceCriminal(year) {
            for (var key in dataIndice) {
                if (dataIndice.hasOwnProperty(year)) {
                    return dataIndice[year];
                } else {
                    return dataIndice['2012'];

                }
            }
        }

        // Render template
        var templateCard = Handlebars.compile(element.scripCard);

        return templateCard(
                    getYearIndiceCriminal( rangeDates[element.valueInput] )
               )

    }

    $('#sliderMaisViolentas').on('change', function(value){
        $('#cardsMaisViolentas').html(
            showCards({
                valueInput: this.value,
                listRange: '#maisViolentas li',
                scripCard: '#card-template'
            })
        );
    });

    $('#sliderMaisSeguras').on('change', function (value) {
        $('#cardsMaisSeguras').html(
            showCards({
                valueInput: this.value,
                listRange: '#maisSeguras li',
                scripCard: '#card-template-seguras'
            })
        );
    });


    $('#sliderMaisViolentas, #sliderMaisSeguras').trigger('change');

});

