/*!
 * Indice criminal do estado do rio de janeiro.
 * Desenvolvido por Ministério Público do Estado do Rio de Janeiro em: 03/07/2017
 */

$(function(){
    // Fullpage

    // detect if window is big enough
    if (window.matchMedia("(min-width: 992px)").matches) {
        console.log('rodou')
        $('#fullpage').fullpage({
            anchors: ['anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6'],
            menu: '#menu',
            scrollOverflow: true
        });

        //Tooltip funnel
        $('[data-toggle="tooltip-filtro"]').tooltip({
            template:'<div class="tooltip tooltip-filtro" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });

    }


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
            effectTranstion: $(config.effectTranstion)
        }

        interactionCards(element.effectTranstion);

        var rangeDates = $(element.listRange).map(function (index, item) {
            return $(item).data('rangeyear');
        })

        // Get Year info
        function getYearIndiceCriminal(year) {
            for (var key in dataIndice) {
                if (dataIndice.hasOwnProperty(year)) {
                    return dataIndice[year];
                }
                return dataIndice['2016'];
            }
        }

        // Render template
        var templateCard = Handlebars.compile(element.scripCard);

        return templateCard(
            getYearIndiceCriminal( rangeDates[element.valueInput] )
        )

    }

    // Interation cards
    function interactionCards( targetElement ){
        var $targetAnimation = targetElement;

        $targetAnimation.addClass('fade-card');

        setTimeout(function () {
            $targetAnimation.removeClass('fade-card');
        }, 50)
    }

    $('#sliderMaisViolentas').on('change', function(item){
        var $targetRender = $('#cardsMaisViolentas');

        $targetRender.html(
                showCards({
                    valueInput: this.value,
                    listRange: '#maisViolentas li',
                    scripCard: '#card-template',
                    effectTranstion: '#cardsMaisViolentas'
                })
        );
    });

    $('#sliderMaisSeguras').on('change', function (item) {
        $('#cardsMaisSeguras').html(
            showCards({
                valueInput: this.value,
                listRange: '#maisSeguras li',
                scripCard: '#card-template-seguras',
                effectTranstion: '#cardsMaisSeguras'
            })
        );
    });

    $('#sliderMaisViolentas, #sliderMaisSeguras').trigger('change');


    // Select Mobile

    $('#selectMaisViolentas').on('change', function(item){
        $('#cardsMaisViolentas').html(
            showCards({
                valueInput: this.value,
                listRange: '#maisViolentas li',
                scripCard: '#card-template',
                effectTranstion: '#cardsMaisViolentas'
            })
        );
    });

    $('#selectMaisSguras').on('change', function (item) {
        $('#cardsMaisSeguras').html(
            showCards({
                valueInput: this.value,
                listRange: '#maisSeguras li',
                scripCard: '#card-template-seguras',
                effectTranstion: '#cardsMaisSeguras'
            })
        );
    });

    // Render counties RJ in svg
    var $tagScriptCountiesRj = $('#municipios-rj').html();
    var templateHandleBarsCountiesRJ = Handlebars.compile($tagScriptCountiesRj);
    var htmlHandleBarsCountiesRj = templateHandleBarsCountiesRJ(countiesSvgPathRJ);
    $("#wrap-maprj").html(htmlHandleBarsCountiesRj);

    function createTableau() {
        var divElement = document.getElementById('viz1504649955104');

        var vizElement = divElement.getElementsByTagName('object')[0];
        vizElement.style.width = '1064px';
        vizElement.style.height = '539px';

        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';

        vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }

    function updateTableau(targetIframe, idTableau){
        var objectParameters = "<noscript>" +
            "<a href='#'>" +
                "<img alt='Painel 1' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;IC&#47;ICGCrim&#47;Painel1&#47;1_rss.png' style='border: none' />" +
            "</a>" +
        "</noscript>" +
            "<object class='tableauViz' style='display:none;'>" +
                "<param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />" +
                "<param name='site_root' value='' />" +
                "<param name='name' value='ICGCrim&#47;Painel1' />" +
                "<param name='tabs' value='no' />" +
                "<param name='toolbar' value='yes' />" +
                "<param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;IC&#47;ICGCrim&#47;Painel1&#47;1.png' />" +
                "<param name='animate_transition' value='yes' />" +
                "<param name='display_static_image' value='yes' />" +
                "<param name='display_spinner' value='yes' />" +
                "<param name='display_overlay' value='yes' />" +
                "<param name='display_count' value='yes' />" +
                "<param name='filter' value='publish=yes' />" +
            "<param id='idComarca' name='filter' value='CD_COMARCA=" + idTableau + "'   />" +
            "</object>";

        $(targetIframe).remove();
        $('#viz1504649955104').html(objectParameters);

    }

    function modalCard(item){
        // Variables modal
        var iframeTableau = $('#viz1504649955104').find('iframe');
        var idTableauCard = $(item.relatedTarget).data('idtableau');

        // Insert name municipio
        $('.modal-icg--name-municipio b').text('Incidência de Delitos na Comarca de ' + nameInputModal(item));

        // Create tableau
        $('#idComarca').attr('value', 'CD_COMARCA=' + idTableauCard);
        iframeTableau.length > 0 ? updateTableau(iframeTableau[0], idTableauCard) : null;
        createTableau();
    }

    function nameInputModal(item){
        var $targetItem = $(item.relatedTarget);
        return $targetItem.hasClass('card') ?
               $targetItem.find('.rangeicg-card--title-municipio').text() :
               $targetItem.data('namesvg');
    }

    // Modal load  dynamic iframe
    $('#modalIcg').modal('hide');
    $('#modalIcg').on('show.bs.modal', function(item){
        var $targetCard = $(item.relatedTarget).closest('li').hasClass('rangeicg-card');
        var $targetSvg = $('#municipios-rj--group path');
        modalCard(item);
    });
});

