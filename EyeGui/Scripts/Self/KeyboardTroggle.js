var Target;

var capslock_bool = false;


$(document).ready(function () {
    var button = $('[id="Keyboard-Troggle"]');
    var body = $('[id="Keyboard-Body"]');

    bindInputs();
    
    var key_arrow_right = $('[data-function-type="arrow_right"]');
    var key_arrow_left = $('[data-function-type="arrow_left"]');
    var key_arrow_down = $('[data-function-type="arrow_down"]');
    var key_arrow_up = $('[data-function-type="arrow_up"]');
    key_arrow_right.empty();
    key_arrow_right.append('<span class="glyphicon glyphicon-arrow-right"></span>');
    key_arrow_left.empty();
    key_arrow_left.append('<span class="glyphicon glyphicon-arrow-left"></span>');    
    key_arrow_down.empty();
    key_arrow_down.append('<span class="glyphicon glyphicon-arrow-down"></span>');
    key_arrow_up.empty();
    key_arrow_up.append('<span class="glyphicon glyphicon-arrow-up"></span>');
   

    var keys = body.find("button");
    keys.each(function () {
        KeyBind(this);
    });



    function KeyBind(key)
    {
        if ($(key).attr("data-function") == "true")
        {

        }

        if ($(key).attr("data-letter") == "true")
        {
            
            Write(key);
        }

        if ($(key).attr("data-number") == "true")
        {
            Write(key);
        }

        if ($(key).attr("data-other") == "true")
        {
            Write(key);
        }  
    }

    function bindInputs()
    {
        $('input').focus(function () {
            Target = $(this);
            console.log(this);
        });

        $('textarea').focus(function () {
            Target = $(this);
            console.log(this);
        });
    }

    function Write(key)
    {
        $(key).click(function () {
            console.log("press");
            var val = $(Target).val();
            $(Target).val(val + $(key).attr("data-key-value"));
            EventAfterWrite();
        });
    }

    function EventAfterWrite()
    {
        ResetShift();
    }

    function ResetShift()
    {
        $('[data-double-display="true"]').each(function () {
            var key = $(this);
            var first = key.attr("data-display-first");
            var secend = key.attr("data-display-secend");
            var bool = key.attr("data-double-value");

        
                $(this).empty();
                $(this).append(first);
                $(this).attr("data-double-value", "true");
                $(this).attr("data-key-value", first);
                capslock_bool = true;
            
        });
    }

    function SpecalKeySelect(key)
    {
        switch (key) {
            case "<- Backspace":
                BackspaceKey();
                break;
            case "Caps Lock":
                CapsLockKey();
                break;
            case "Shift":
                CapsLockKey();
                break;
        }
      
    }

    function KeyboardToggled()
    {

    }

    BindFunction();

    ////------------------------IFrame----------------------------
    var iframe = $('[data-iframe="true"]');
    var loop = $('[data-search="true"]');
    var input = $('[id="search"]');

    loop.click(function () {
        iframe.attr("src", input.val());
    });

});
