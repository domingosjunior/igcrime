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

    // Render counties RJ in svg
    var $tagScriptCountiesRj = $('#municipios-rj').html();
    var templateHandleBarsCountiesRJ = Handlebars.compile($tagScriptCountiesRj);
    var htmlHandleBarsCountiesRj = templateHandleBarsCountiesRJ(countiesSvgPathRJ);
    $("#testResultSvg").html(htmlHandleBarsCountiesRj);






















    // Modal load  dynamic iframe
    $('#modalIcg').modal('hide');
    $('#modalIcg').on('show.bs.modal', function(item){

        var targetCard = $(item.relatedTarget).closest('li').hasClass('rangeicg-card');

        if (targetCard) {
            // Variables modal
            var linkPattern = "https://www.youtube.com/embed/";
            var pathIframe = $(item.relatedTarget).data('linkiframe');
            var nameMunicipio = $(item.relatedTarget).find(".rangeicg-card--title-municipio").text();

            // Insert name municipio
            $('.modal-icg--name-municipio b').text(nameMunicipio);

            // Insert url in iframe
            $(this).find('.iframe-icg').attr('src', '');
            $(this).find('.iframe-icg').attr('src', linkPattern + pathIframe);
        } else {
            console.log('opa');
        }


    });
    $('#modalIcg').on('hide.bs.modal', function(){
        // Clean src iframe
        $(this).find('.iframe-icg').attr('src', '');
    });
});

