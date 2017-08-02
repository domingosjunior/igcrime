(function (){



    // Meu exemplo

    var scripCard = $("#card-template").html();
    var templateCard = Handlebars.compile(scripCard);

    function getYearIndiceCriminal(year) {
        var setYear = year;
        for (var key in dataIndice) {
            console.log('entrou no for in');

            if (dataIndice.hasOwnProperty(setYear)) {
                console.log('entrou no if');

                return dataIndice[setYear];

            } else {

                return dataIndice['2012'];

            }
        }
    }



    $('#compilado').html(templateCard(getYearIndiceCriminal("2012")));




})();
