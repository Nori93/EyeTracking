$(document).ready(function () {
    var button = $('[id="Keyboard-Troggle"]');
    var body = $('[id="Keyboard-Body"]');
    $('[data-keyboard-value="arrow_right"]').empty();
    $('[data-keyboard-value="arrow_right"]').append('<span class="glyphicon glyphicon-arrow-right"></span>');
    $('[data-keyboard-value="arrow_left"]').empty();
    $('[data-keyboard-value="arrow_left"]').append('<span class="glyphicon glyphicon-arrow-left"></span>');
    $('[data-keyboard-value="arrow_up"]').empty();
    $('[data-keyboard-value="arrow_up"]').append('<span class="glyphicon glyphicon-arrow-up"></span>');
    $('[data-keyboard-value="arrow_down"]').empty();
    $('[data-keyboard-value="arrow_down"]').append('<span class="glyphicon glyphicon-arrow-down"></span>');
   
    
    console.log("bindet");
    button.click(function () {
        body.toggle(500);
    });

    var keysTable = $('[data-keyboard="keys"]');
    var search = $('[id="search"]');
    var special_key = ["<- Backspace", "Tab", "Caps Lock", "Enter", "Shift", "arrow_up", "Ctrl", "Alt", "Space", "arrow_left", "arrow_down", "arrow_right"];
    keysTable.click(function () {
        
        var key = $(this).attr("data-keyboard-value");
        var search_value = search.val();
        if ($.inArray(key, special_key) > -1) {
            console.log("not found");
            SpecalKeySelect(key);

        }
        else
        {
            console.log("found");
            search.val(search_value + key);
        }
    });
  

    function SpecalKeySelect(key)
    {
        switch (key) {
            case "<- Backspace":
                BackspaceKey();
                break;
            case "Caps Lock":
                CapsLockKey();
                break;
        }
      
    }

    var capslock_bool = false;
    function CapsLockKey() {
        keysTable.each(function () {
            if ($.inArray($(this).attr("data-keyboard-value"), special_key) > -1)
            {
               
            }
            else
            {
                console.log("capslog_special");
                var value = $(this).attr("data-keyboard-value"); 
                

                if (capslock_bool)
                {
                    value = value.toUpperCase();

                    $(this).attr("data-keyboard-value", value);
                    $(this).html(value);
                }
                if (!capslock_bool)
                {
                    value = value.toLowerCase();
                    console.log(value);
                    $(this).attr("data-keyboard-value", value);
                    $(this).html(value);
                }
            }
        });
        capslock_bool = !capslock_bool;
    }

    function BackspaceKey()
    {
        
        var search_value = search.val();
        search_value = search_value.slice(0, -1);
        search.val(search_value);
    }


    function KeyboardToggled()
    {

    }
});
