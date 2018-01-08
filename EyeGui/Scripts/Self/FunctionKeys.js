function CapsLockKey() {
    keysTable.each(function () {
        if ($.inArray($(this).attr("data-keyboard-value"), special_key) > -1) {

        }
        else {
            console.log("capslog_special");
            var value = $(this).attr("data-keyboard-value");


            if (capslock_bool) {
                value = value.toUpperCase();

                $(this).attr("data-keyboard-value", value);
                $(this).html(value);
            }
            if (!capslock_bool) {
                value = value.toLowerCase();
                console.log(value);
                $(this).attr("data-keyboard-value", value);
                $(this).html(value);
            }
        }
    });
    capslock_bool = !capslock_bool;
}
function BindFunction() {

    $('[data-function-type="<- Backspace"]').click(function () {
        var input = Target.val();
        input = input.slice(0, -1);
        Target.val(input);
    });

    $('[data-function-type="Caps Lock"]').click(function () {
        $('[data-double-display="true"]').each(function () {
            var key = $(this);
            var first = key.attr("data-display-first");
            var secend = key.attr("data-display-secend");
            var bool = key.attr("data-double-value");
            
            if ( bool === "true")
            {
                $(this).empty();
                $(this).append(secend);
                $(this).attr("data-double-value", "false");
                $(this).attr("data-key-value", secend);
                capslock_bool = false;
            }
            if ( bool === "false")
            {
                $(this).empty();
                $(this).append(first);
                $(this).attr("data-double-value", "true");
                $(this).attr("data-key-value", first);
                capslock_bool = true;
            }
        });
    });

    $('[data-function-type="Shift"]').click(function () {
        $('[data-double-display="true"]').each(function () {
            var key = $(this);
            var first = key.attr("data-display-first");
            var secend = key.attr("data-display-secend");
            var bool = key.attr("data-double-value");
        
            $(this).empty();
            $(this).append(secend);
            $(this).attr("data-double-value", "false");
            $(this).attr("data-key-value", secend);
            capslock_bool = false;
           
        });

    });
    $('[data-function-type="Space"]').click(function () {
        var val = $(Target).val();
        $(Target).val(val + $(key).attr("data-key-value"));
        EventAfterWrite();
    });
}