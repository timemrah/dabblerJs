![alt text](https://github.com/timemrah/dabblerJs/blob/main/resource/logo-148x77.png?raw=true)

# DabblerJs
### A novice library

An extremely small javascript library with additional functionality as needed. <br />
For the browser of course.


### HTML

    <form id="calculator-form">
        <input name="num1" />
        <input name="num2" />

        <div id="process-icon"></div>        
        <div id="result"></div>

        <button name="submit-btn" value="addition">addition</button>
        <button name="submit-btn" value="multiplication">Multiplication</button>
    </form>

### JAVASCRIPT
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