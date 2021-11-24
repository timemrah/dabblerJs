class dabblerDom {


    submitBtn = null


    constructor(selector){
        if(dabblerDom.#isElement(selector)){
            this.selectedItems = [selector];
        } else{
            switch (selector.constructor.name){
                case "String"     : this.selectedItems = document.querySelectorAll(selector); break;
                case "dabblerDom" : this.selectedItems = selector.getElements(); break;
            }
        }
    }


    getElement(){
        return this.selectedItems[0]
    }


    getElements(){
        return this.selectedItems
    }


    find(selector){
        this.selectedItems = this.selectedItems[0].querySelectorAll(selector)
    }


    toArray(){
        return Array.from(this.selectedItems)
    }


    map(callback){
        return this.toArray().map(callback)
    }


    html(html = null){
        if(html === null){
            return this.selectedItems[0].innerHTML;
        }
        this.selectedItems.forEach(item => {
            item.innerHTML = html
        })
        return this;
    }


    val(value = null){
        if(value === null){
            return this.selectedItems[0].value
        }
        this.selectedItems.forEach(item => {
            item.value = value
        })
        return this;
    }


    valInt(defValue = null){
        let value = parseInt(this.selectedItems[0].value);
        if(!Number.isInteger(value)){
            return defValue;
        }
        return value;
    }


    valFloat(defValue = null){
        let value = parseFloat(this.selectedItems[0].value);
        if(typeof value !== "number"){
            return defValue;
        }
        return value;
    }


    valPositive(defValue = null){
        let value = parseInt(this.selectedItems[0].value);
        if(typeof value !== "number" || value <= 0){
            return defValue;
        }
        return value;
    }


    formData(){
        return this.#createFormData(this.selectedItems[0]);
    }




    // EVENTS :
    click(callback){
        this.selectedItems.forEach(item => {
            item.addEventListener('click', e => {
                callback(e, item)
            });
        })
        return this;
    }


    submit(callback){
        this.selectedItems.forEach(item => {
            item.addEventListener('submit', e => {
                callback(e, item, this.#createFormData(item))
            });
        })
        return this;
    }


    //It also adds the values of the buttons to the form data.
    submitByBtn(callback){

        this.selectedItems.forEach(form => {

            let submitButtons = form.querySelectorAll('button');
            submitButtons.forEach(btn => {
                if(['button', 'reset'].indexOf(btn.type) !== -1){ return; }
                btn.addEventListener('click', e => {
                    form.submitBtn = btn
                    this.submitBtn = btn
                })
            })

            let submitInput = form.querySelectorAll('input[type="submit"]');
            submitInput.forEach(input => {
                input.addEventListener('click', e => {
                    this.submitBtn = input
                    form.submitBtn = input
                })
            })

            form.addEventListener('submit', e => {
                callback(e, form, this.#createFormData(form))
            });

        })


        return this;
    }


    submitByBtnPreventDef(callback){

        this.submitByBtn((e, form, formData) => {
            e.preventDefault();
            callback(e, form, formData);
        });

    }
    // EVENTS //




    // PRIVATE :
    #createFormData(formItem){

        const formData = new FormData(formItem);

        if(this.submitBtn){
            formData.set(this.submitBtn.name, this.submitBtn.value)
        }

        formData.getEntries = function(){
            const entriesArray = [];
            for(let pair of formData.entries()){
                if(dabblerDom.#isNumeric(pair[1])){
                    entriesArray[pair[0]] = parseFloat(pair[1])
                    continue;
                }
                entriesArray[pair[0]] = pair[1]
            }
            return entriesArray;
        }

        formData.getInt = function(key){
            return parseInt(formData.get(key));
        }

        formData.getFloat = function(key){
            return parseFloat(formData.get(key));
        }

        return formData;
    }


    static #isNumeric(num){
        let value1 = num.toString();
        let value2 = parseFloat(num).toString();
        return (value1 === value2);
    }


    static #isElement(obj) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return obj instanceof HTMLElement;
        }
        catch(e){
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof obj==="object") &&
                (obj.nodeType===1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument ==="object");
        }
    }
    // PRIVATE //


}


// QUICK USE
function dab(selector){
    return new dabblerDom(selector)
}