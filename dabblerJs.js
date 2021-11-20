function dab(selector = null){ const O = {};




    if(selector){
        O.dom = document.querySelectorAll(selector);
    }




    O.get = function () {

        if (O.dom.length > 0) {

            const array = []
            O.dom.forEach(item => {
                array.push(item)
            })

            if (O.dom.length === 1) {
                return array[0]
            }

            return array
        }

        return null;

    }




    O.getFirst = function (){

        let dom = null;

        O.dom.forEach(item => {
            dom = item;
        });

        return dom;

    }




    O.click = function (callback = ()=>{}){
        O.dom.forEach(function (item){
            item.addEventListener('click', callback);
        });
    }




    O.html = function (html = null){

        if(html === null){
            let domFirst = O.getFirst();
            return domFirst.innerHTML;
        }

        O.dom.forEach(function (item){
            item.innerHTML = html;
        });

    }




    O.val = function (value = null){

        if(value === null){
            let domFirst = this.getFirst();
            return domFirst.value;
        }

        O.dom.forEach(function (item){
            item.value = value;
        });
    }




    O.getVal = function(type){

        let domFirst = this.getFirst();

        switch (type){
            case "int"  : return parseInt(domFirst.value)
            case "float": return parseFloat(domFirst.value)
            default     : return domFirst.value
        }

    }




    O.valInt = function(){
        return O.getVal('int');
    }




    O.valFloat = function (){
        return O.getVal('float');
    }




    return O;
}