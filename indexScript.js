

dab('#process button').click(function(){

    if(this.name === '+'){

        dab('#result').html(
            dab('#num1').valInt() + dab('#num2').valInt()
        );

    } else if(this.name === "*"){

        dab('#result').html(
            dab('#num1').valInt() * dab('#num2').valInt()
        );

    }

});