class Vendor{
    constructor(vendorName){
        this._vendorName = vendorName;
    }

    get vendorName(){
        return this._vendorName;
    }

    set vendorName(vendorName){
        this._vendorName = vendorName;
    }
}