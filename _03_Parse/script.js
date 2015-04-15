var dataAccess = dataAccess || {};

function errorHandling(error) {
    createPopup(error.statusText, 'red');
}

function createPopup(text, color) {
    var errorElement = $(document.createElement('div'))
        .text(text)
        .css('background', color)
        .css('position', 'fixed')
        .css('right', '30px')
        .css('top', '30px')
        .css('width', '300px')
        .css('height', '30px')
        .css('font-size', '20px')
        .css('padding-left', '20px')
        .css('padding-top', '8px')
        .css('border-radius', '10px')
        .css('display', 'none');

    $('#errors').append(errorElement);
    errorElement.fadeIn('slow', function() {});
    setTimeout(function() {
        errorElement.fadeOut('slow', function() {
            errorElement.remove();
        })
    }, 3000);
}

function registerEventHandlers() {
    $('#countries').on('click', function(e){
        if(e.target.tagName === 'LI') {
            var countryId = $(e.target).attr('country-id');
            dataAccess.townsRepository.getTownsByCountryId(countryId, printTowns, errorHandling);
            $('#towns').attr('country-id', countryId);
        } else if(e.target.tagName === 'BUTTON') {
            if($(e.target).attr('operation') === 'delete') {
                dataAccess.countriesRepository.removeCountryById($(e.target.parentNode).attr('country-id'), 
                    showCountries, errorHandling);
            } else if($(e.target).attr('operation') === 'add') {
                dataAccess.countriesRepository.addCountry($('#countryName').val(), 
                    showCountries, errorHandling);
            } else if($(e.target).attr('operation') === 'edit') {
                var countryName = prompt('Enter new name: '),
                    countryId = $(e.target.parentNode).attr('country-id');
                dataAccess.countriesRepository.updateCountry(countryName, countryId,
                    showCountries, errorHandling);
            }
        }
    });

    $('#towns').on('click', function(e){
        if(e.target.tagName === 'BUTTON') {
            if($(e.target).attr('operation') === 'delete') {
                dataAccess.townsRepository.removeTownById($(e.target.parentNode).attr('town-id'), 
                    showTowns, errorHandling);
            } else if($(e.target).attr('operation') === 'add') {
                dataAccess.townsRepository.addTown($('#townName').val(), $('#towns').attr('country-id'),
                    showTowns, errorHandling);
            } else if($(e.target).attr('operation') === 'edit') {
                var townName = prompt('Enter new name: '),
                    townId = $(e.target.parentNode).attr('town-id');
                dataAccess.townsRepository.updateTown(townName, townId,
                    showTowns, errorHandling);
            }
        }
    });
}

function showCountries() {
    dataAccess.countriesRepository.getAllCountries(printCountries, errorHandling);
}

function showTowns() {
    dataAccess.townsRepository.getTownsByCountryId($('#towns').attr('country-id'), printTowns, errorHandling);
}

function printCountries(data) {
    var countries = data['results'];
    var list = $(document.createElement('ul'));

    for(var i in countries) {
        var liCountry = $(document.createElement('li')).text(countries[i]['name']);
        liCountry.attr('country-id', countries[i]['objectId']);
        liCountry.append(createButton('Edit', 'edit'));
        liCountry.append(createButton('Delete', 'delete'));
        list.append(liCountry);
    }

    var countryNameInput = document.createElement('input');
    countryNameInput.id = 'countryName';
    $('#countries').html(list);
    $('#countries').append(countryNameInput);
    $('#countries').append(createButton('Add', 'add'))
}

function printTowns(data) {
    var towns = data['results'];
    var list = $(document.createElement('ul'));

    for(var i in towns) {
        var liTown = $(document.createElement('li')).text(towns[i]['name']);
        liTown.attr('town-id', towns[i]['objectId']);
        liTown.append(createButton('Edit', 'edit'));
        liTown.append(createButton('Delete', 'delete'));
        list.append(liTown);
    }

    var townNameInput = document.createElement('input');
    townNameInput.id = 'townName';
    $('#towns').html(list);
    $('#towns').append(townNameInput);
    $('#towns').append(createButton('Add', 'add'));
}

function createButton(text, operationAttribute) {
    var button = $(document.createElement('button'))
        .text(text)
        .attr('operation', operationAttribute);
    return button;
}

registerEventHandlers();
showCountries();

