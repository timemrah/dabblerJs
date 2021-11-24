dab('#calculator-form').submitByBtnPreDef((e, form, formData) => {

    dab('#process-icon').html(form.submitBtn.innerHTML)

    switch (form.submitBtn.value){
        case "addition":
            dab("#result").html(formData.getInt('num1') + formData.getInt('num2')); break
        case "subtraction":
            dab("#result").html(formData.getInt('num1') - formData.getInt('num2')); break
        case "multiplication":
            dab("#result").html(formData.getInt('num1') * formData.getInt('num2')); break
        case "division":
            dab("#result").html(formData.getInt('num1') / formData.getInt('num2'))
    }

})