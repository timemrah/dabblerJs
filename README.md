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

<br />

## DOCUMENTATION
<br />

### getElement
If you need a pure dom object, this method will return a dom object.
    
    let textElement = dab("#text").getElement()
    //Like this: document.querySelector("#text")

    //It can be shorter when you use other shortcut
    docSelect("#text")
    docId("text")
<br />

### getElements
If you need a pure dom objects, this method will return a dom objects.
    
    let elements = dab("div").getElements()
    //Like this: document.querySelectorAll("div")

    //It can be shorter when you use other shortcut
    docSelects("div")
<br />

### toArray
If you want to get multiple selected DOM elements as array.

    let arrayElements = dab("div").toArray()
    
    //Like this:
    let arrayElements = Array.from(document.querySelectorAll("div"))

## map
If you want to map multiple selected DOM elements.

    dab("div").map(item => {
        ...
    });

    //Like this:
    Array.from(document.querySelectorAll("div")).map(item => {
        ...
    });



# More to come...