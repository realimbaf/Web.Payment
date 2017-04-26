import * as ko from "knockout";
export default class TrModel {
    placeholder = ko.observable();
    name = ko.observable('');
    orderBy = ko.observable('asc');


    switchOrder = property => {
        property.orderBy() === "asc" ? property.orderBy("desc") : property.orderBy("asc");
    }
    constructor(item: any) {
        this.placeholder(item.placeholder);
        this.name(item.name);
        this.orderBy(item.orderBy);
    }
}


