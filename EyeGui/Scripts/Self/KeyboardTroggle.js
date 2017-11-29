$(document).ready(function () {
    var button = $('[id="Keyboard-Troggle"]');
    var body = $('[id="Keyboard-Body"]');

    
    console.log("bindet");
    button.click(function () {
        body.toggle(500);
    });

    var keysTable = $('[data-keyboard="keys"]');
    var search = $('[id="search"]');
    keysTable.click(function () {
        var key = $(this).attr("data-keyboard-value");
        var search_value = search.val();
        search.val(search_value + key);
    });

    function KeyboardToggled()
    {

    }
});
