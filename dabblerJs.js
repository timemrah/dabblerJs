
class dabblerJs
{

    selectedItems


    constructor(selector){

        this.selectedItems = document.querySelectorAll(selector);

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


    valInt(defValue = 0){
        let value = parseInt(this.selectedItems[0].value);
        if(!Number.isInteger(value)){
            return defValue;
        }
        return value;
    }


    valFloat(defValue = 0.0){
        let value = parseFloat(this.selectedItems[0].value);
        if(typeof value !== "number"){
            return defValue;
        }
        return value;
    }


    click(callback){
        this.selectedItems.forEach(item => {
            item.addEventListener('click', function(e){
                callback(this, e)
            });
        })

        return this;
    }





}




function dab(selector){
    return new dabblerJs(selector);
}
