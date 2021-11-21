// METHOD 1 :
/*dab('#calculator-form').submit(e => {
    e.preventDefault();
});
dab("#addition").click((e, btn) => {
    dab("#result").html(
        dab("#num1").valInt() + dab("#num2").valInt()
    );
});
dab("#multiplication").click((e, btn) => {
    dab("#result").html(
        dab("#num1").valInt() * dab("#num2").valInt()
    );
});*/




// METHOD 2 :
/*dab('#calculator-form').submit(e => {
    e.preventDefault();
});
dab('#calculator-form button').click((e,btn) => {
    if(btn.value === "addition"){
        dab("#result").html(
            dab("#num1").valInt() + dab("#num2").valInt()
        );
    } else if(btn.value === "multiplication"){
        dab("#result").html(
            dab("#num1").valInt() * dab("#num2").valInt()
        );
    }
});*/




// METHOD 3 :
dab('#calculator-form').submitByBtn((e, btn, formData, form) => {

    if(btn.value === 'addition'){
        dab("#result").html(
            formData.getInt('num1') + formData.getInt('num2')
        );
    } else if(btn.value === 'multiplication'){
        dab("#result").html(
            formData.getInt('num1') * formData.getInt('num2')
        );
    }

}, e => e.preventDefault() );