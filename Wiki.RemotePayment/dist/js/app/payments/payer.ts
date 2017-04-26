import * as ko from "knockout";
import Utils from '../../resource/utils';
import Resource from '../../resource/resource';
import {PaymentModel} from './payment';

export class PayersModel {
    totalEachManager = ko.observableArray([]);
    total = ko.observable<TotalSumm>(new TotalSumm());
    activedLink = ko.observable();
    selectLink = (data) => {
        this.activedLink(data);
    };
    payments = ko.observableArray([]);
    load = () => {
        Resource.getPayments()
            .done(data => {
                var payments = ko.utils.arrayMap(data,
                    item => {
                        return new PaymentModel(item);
                    });
                this.payments(payments);
                this.groupBy(null,null);
            })
            .fail(data => {
            });
    }
    groupBy = (startDate, endDate) => {
        var array = new Array<EachManagerSumm>();
        var total = new TotalSumm();
        this.payments()
            .reduce((previous, current) => {
                var indexOf = Utils.findWhere(array, current, "operatorName");
                    if (indexOf !== null) {
                        reduceUpdate(array[indexOf],current,startDate,endDate,total);
                    } else {                          
                        array.push(reduceAdd(current,startDate,endDate,total));
                    }
                },
                array);
        this.totalEachManager(array);
        this.total(total);
    }
    constructor() {
        this.load();
    }
}
export class TotalSumm {
    totalManual = ko.observable(0);
    totalAuto = ko.observable(0);    
    total = ko.computed(() => {
        return this.totalManual() + this.totalAuto();
    });
    displayPrice = (price: any) => {
        return ko.computed(() => {
            return Utils.displayPrice(price);
        });
    }

    private addToManual = (price) => {
        this.totalManual(this.totalManual() + price);
    }
    private addToAuto = (price) => {
        this.totalAuto(this.totalAuto() + price);
    }
    add = (payment: PaymentModel) => {
        if (payment.type() === "смс") {
            this.addToAuto(payment.price());
        }
        else {
            this.addToManual(payment.price());
        }
    }


}
export class EachManagerSumm extends TotalSumm {
    operatorName = ko.observable("");
    init = (payment:PaymentModel) => {
        if (payment.type() === "смс") {
            this.totalAuto(payment.price());
        }
        else {
            this.totalManual(payment.price());
        }
    }
    constructor(operatorName:string) {
        super();
        this.operatorName(operatorName);
    }
}


function reduceUpdate(manager: EachManagerSumm, current: any, startDate: any, endDate: any,total:TotalSumm) {
    if (startDate === null && endDate === null) {
        manager.add(current);
        total.add(current);
    }
    else if (Utils.convertToDate(startDate) <= Utils.convertToDate(current.createDate()) && Utils.convertToDate(current.createDate()) <= Utils.convertToDate(endDate)){
        manager.add(current);
        total.add(current);
    }
}

function reduceAdd(current: any, startDate: any, endDate: any,total:TotalSumm) {
    const manager = new EachManagerSumm(current["operatorName"]());
    if (startDate === null && endDate === null) {
        manager.init(current);
        total.add(current);
    }
    else if (Utils.convertToDate(startDate) <= Utils.convertToDate(current.createDate()) && Utils.convertToDate(current.createDate()) <= Utils.convertToDate(endDate)) {
        manager.init(current);
        total.add(current);
    }
    return manager;
}

