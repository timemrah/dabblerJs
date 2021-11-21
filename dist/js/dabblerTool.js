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


function getUniqString(){
    let timestamp = Date.now();
    return timestamp.toString(36);
}


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


function decodeHTMLEntities(text) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}


function encodeHTMLEntities(text) {
    let textArea = document.createElement('textarea');
    textArea.innerText = text;
    return textArea.innerHTML;
}
// TOOLS FUNCTIONS -------------------------------------------------------------------------------------------------- //