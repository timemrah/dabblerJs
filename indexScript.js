dab('#process button').click((btn, e) => {

    if(btn.name === '+'){

        dab('#result').html(
            dab('#num1').valInt() + dab('#num2').valInt()
        )

    } else if(btn.name === "*"){

        dab('#result').html(
            dab('#num1').valInt() * dab('#num2').valInt()
        )

    }


});