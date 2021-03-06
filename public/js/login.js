$(document).ready(function() {
    function matchStart(params, data) {
        // If there are no search terms, return all of the data
        if ($.trim(params.term) === '') { return data; }

        // Do not display the item if there is no 'text' property
        if (typeof data.text === 'undefined') { return null; }

        // `params.term` is the user's search term
        // `data.id` should be checked against
        // `data.text` should be checked against
        var q = params.term.toLowerCase();
        if (data.text.toLowerCase().indexOf(q) > -1 || data.id.toLowerCase().indexOf(q) > -1) {
            return $.extend({}, data, true);
        }

        // Return `null` if the term should not be displayed
        return null;
    }

    $('.js-example-basic-single').select2({
        matcher: matchStart
    });
    /*$('.js-example-basic-single').on('select2:opening select2:closing', function( event ) {
        var $searchfield = $(this).parent().find('.select2-search__field');
        $searchfield.prop('disabled', true);
    });*/

    let color_sel = 0;
    let colors = [
        '#EDFF00',
        '#FF5400',
        '#43FF00',
        '#00FFD0',
        '#FFFFFF',
        '#002CFF',
        '#FF00C8',
        '#FF0000',
        '#000000'
    ];
    function infLoop() {
        $('body').css('background-color', colors[color_sel])
        color_sel = Math.floor(Math.random() * 9);
        setTimeout(infLoop, 100);
    }

    //infLoop();
});
