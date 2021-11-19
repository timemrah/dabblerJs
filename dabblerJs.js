class dab {




    // BASIC METHODS :
    static get(query){
        return document.querySelector(query);
    }


    static gets(query){
        return document.querySelectorAll(query);
    }


    static val(query, type = 'str'){
        let value = this.get(query).value;

        switch (type){
            case "int"  : return parseInt(value);
            case "float": return parseFloat(value);
        }

        return value;
    }


    static setVal(query, value){
        this.get(query).value = value;
    }


    static event(query, event, callback){
        this.get(query).addEventListener(event, callback);
    }
    // BASIC METHODS //




    static intVal(query){
        return this.val(query, 'int');
    }


    static floatVal(query){
        return this.val(query, 'float');
    }


    static html(query){
        return this.get(query).innerHTML;
    }


    static setHtml(query, html){
        this.get(query).innerHTML = html;
    }




}