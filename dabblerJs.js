// DOM ACCESS AND HANDLE CLASS -- dablerJs --------------------------------------------------------------------------- :
class dabblerJs {


    constructor(selector){
        switch (selector.constructor.name){
            case "String"         : this.selectedItems    = document.querySelectorAll(selector); break;
            case "HTMLFormElement": this.selectedItems[0] = selector; break;
            case "dabblerJs"      : this.selectedItems    = selector.getElements(); break;
        }
    }


    getElement(){
        return this.selectedItems[0]
    }


    getElements(){
        return this.selectedItems
    }


    toArray(){ return Array.from(this.selectedItems) }


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
            const entriesArray = [];
            for(let pair of formData.entries()){
                if(isNumeric(pair[1])){
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
    // PRIVATE //


}


// QUICK USE
function dab(selector){
    return new dabblerJs(selector)
}
// DOM ACCESS AND HANDLE CLASS -- dablerJs -------------------------------------------------------------------------- //








// QUICK SELECTORS --------------------------------------------------------------------------------------------------- :
function docQuery(selector){
    return document.querySelector(selector)
}


function docQueryAll(selector){
    return document.querySelectorAll(selector)
}


function docId(id){
    return document.getElementById(id);
}
// QUICK SELECTORS -------------------------------------------------------------------------------------------------- //








// TOOLS FUNCTIONS --------------------------------------------------------------------------------------------------- :
function isNumeric(num){
    let value1 = num.toString();
    let value2 = parseFloat(num).toString();
    return (value1 === value2);
}


function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomAdvance(length, type = "default"){

    let value = '';

    let numericChars     = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let stringLowerChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let stringUpperChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    let useChars = [];

    switch(type){
        case "lower"       : useChars = numericChars.concat(stringLowerChars); break;
        case "upper"       : useChars = numericChars.concat(stringUpperChars); break;
        case "string"      : useChars = stringLowerChars.concat(stringUpperChars); break;
        case "lowerString" : useChars = stringLowerChars; break;
        case "upperString" : useChars = stringUpperChars; break;
        default: useChars = numericChars.concat(stringLowerChars).concat(stringUpperChars); break;
    }

    for(let i = 0; i < length; i++){
        let char = useChars[random(0,useChars.length - 1)];
        value   += String(char);
    }

    return value;
}


let maxSize = function($img, maxWidth, maxHeight){

    let width  = $img.width;
    let height = $img.height;

    if(width > height){
        if(width > maxWidth){
            height *= maxWidth / width;
            width   = maxWidth;
        }
    } else{
        if(height > maxHeight){
            width *= maxHeight / height;
            height = maxHeight;
        }
    }

    return { 'width' : width, 'height' : height };
};


let fileReaderPromise = function(file){
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = resolve;
        fileReader.readAsDataURL(file);
    });
};


function nestedObjToFormData(obj, formData = new FormData()){

    let delegateFormData = formData;

    const createFormData = function(obj, subKeyStr = ''){
        for(let i in obj){
            let value = obj[i];
            let subKeyStrTrans = subKeyStr ? `${subKeyStr}[${i}]` : i;
            if(typeof(value) === 'string' || typeof(value) === 'number'){
                delegateFormData.append(subKeyStrTrans, value);
            }
            else if(typeof(value) === 'object'){
                createFormData(value, subKeyStrTrans);
            }
        }
    }

    createFormData(obj);
    return delegateFormData;
}


function nl2br (str, replaceMode, isXhtml) {
    let breakTag = (isXhtml) ? '<br />' : '<br>';
    let replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}


function br2nl (str, replaceMode) {
    let replaceStr = (replaceMode) ? "\n" : '';
    // Includes <br>, <BR>, <br />, </br>
    return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
}
// TOOLS FUNCTIONS -------------------------------------------------------------------------------------------------- //