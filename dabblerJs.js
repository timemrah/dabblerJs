
class dabblerJs
{




    constructor(selector){

        switch (selector.constructor.name){
            case "String": this.selectedItems = document.querySelectorAll(selector)
                break
            case "HTMLFormElement": this.selectedItems[0] = selector
                break
            case "dabblerJs": this.selectedItems = selector.gets()
                break
        }

    }


    get(){
        return this.selectedItems[0]
    }


    gets(){
        return this.selectedItems
    }

    toArray(){
        return Array.from(this.selectedItems)
    }


    map(callback){
        return this.toArray().map(callback);
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
        return dabblerJs.#createFormData(this.selectedItems[0]);
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
                callback(e, item, dabblerJs.#createFormData(item))
            });
        })
        return this;
    }


    submitByBtn(clickCall, submitCall){
        this.selectedItems.forEach(form => {


            let buttons = form.querySelectorAll('button');

            form.addEventListener('submit', submitCall);

            buttons.forEach(btn => {
                btn.addEventListener('click', e => {
                    const formData = dabblerJs.#createFormData(form);
                    formData.set("click-name", btn.name)
                    formData.set("click-value", btn.value)
                    clickCall(e, btn, formData, form)
                })
            });
        })
        return this;
    }
    // EVENTS //



    // PRIVATE :
    static #createFormData(formItem){

        const formData = new FormData(formItem);

        formData.getEntries = function(){
            const entries = formData.entries();
            const entriesArray = [];
            for(let pair of entries){
                if(dabblerJs.#isNumeric(pair[1])){
                    entriesArray[pair[0]] = parseFloat(pair[1])
                    continue;
                }
                entriesArray[pair[0]] = pair[1]
            }
            return entriesArray;
        }

        formData.getInt = function(key){
            const value = formData.get(key);
            return parseInt(value);
        }

        formData.getFloat = function(key){
            const value = formData.get(key);
            return parseFloat(value);
        }

        return formData;
    }
    static #isNumeric(num){
        num = num.toString();

        let castingValue = parseFloat(num);
        castingValue = castingValue.toString();

        return (num === castingValue);
    }
    // PRIVATE //


}




function dab(selector){
    return new dabblerJs(selector)
}


function docQuery(selector){
    return document.querySelector(selector)
}


function docQueryAll(selector){
    return document.querySelectorAll(selector)
}


function docId(id){
    return document.getElementById(id);
}