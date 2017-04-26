import * as ko from "knockout";
import Resource from '../../resource/resource';
import TrModel from './tr';
import Alerts from '../../resource/alerts';
import Utils from '../../resource/utils';
import {AlertPriority } from '../../resource/alerts';
import Pagination from '../../widget/pagination';

export class PaymentsModel {
    fulldata = ko.observableArray<PaymentModel>();
    currentData = ko.observableArray<PaymentModel>();
    activeTr = ko.observable();
    setActiveTr = (paymentModel: PaymentModel) => {
        this.activeTr(paymentModel);
    }
    pagination = new Pagination();
    findTypes = {
        "clientCode" : {
            predicate: (payment: PaymentModel, code: string) => {
                return Utils.stringStartsWith(payment.clientCode().toString().toLowerCase(), code.toLowerCase());
            },
            observableValue : ko.observable("")
        },
        "clientName" : {
            predicate: (payment: PaymentModel, name: string) => {
                return Utils.stringStartsWith(payment.operatorName().toLowerCase(), name.toLowerCase());
            },
            observableValue: ko.observable("")
        },
        "price" : {
            predicate: (payment: PaymentModel, price: string) => {

                return Utils.stringStartsWith(payment.price().toString().toLowerCase(), price.toLowerCase());
            },
            observableValue: ko.observable("")
        },
        "erpCode" : {
            predicate: (payment: PaymentModel, code: string) => {
                return Utils.stringStartsWith(payment.erpCode().toString().toLowerCase(), code.toLowerCase());
            },
            observableValue: ko.observable("")
        }
    };

    
    filterTrOption = ko.observableArray<TrModel>([
        new TrModel({ placeholder: "Менеджер", name: "operatorName", orderBy: "asc" }),
        new TrModel({ placeholder: "Дата создания платежа", name: "createDate", orderBy: "asc" }),
        new TrModel({ placeholder: "Тип", name: "type", orderBy: "asc" }),
        new TrModel({ placeholder: "Код", name: "clientCode", orderBy: "asc" }),
        new TrModel({ placeholder: "Клиент", name: "clientName", orderBy: "asc" }),
        new TrModel({ placeholder: "Сумма", name: "price", orderBy: "asc" }),
        new TrModel({ placeholder: "№ Документа(ERP)", name: "erpCode", orderBy: "asc" }),
        new TrModel({ placeholder: "", name: "erpSubmit", orderBy: "asc" })
    ]);

    getSnapForErp = () => {
        var arrayToErp = [];
        this.pagination.allPages().forEach((pageNumber, index) => {
            this.pagination.moveToPage(index);
            this.pagination.pagedList()
                .forEach((payment) => {
                    if (!payment.erpCode())
                        arrayToErp.push(payment);
                });
        });
        this.pagination.moveToPage(0);
        return arrayToErp;
    }
    erpExport = (arrayToErp) => {
        Resource.exportToErp({
                Ids: arrayToErp().map((item) => {
                    return item.id();
                })
            })
            .done(() => {
                Alerts.addAlert("Данные отправлены успешно", AlertPriority.Success);
            })
            .fail(() => {
                Alerts.addAlert("Внутрення ошибка сервера", AlertPriority.Error);
            });
    }
    addPayment = (payment) => {
        Resource.addPayment(payment)
            .done((data) => {
                Resource.getPayment(data.Id)
                    .done((newPayment) => {
                        this.currentData().unshift(new PaymentModel(newPayment));
                        this.pagination.pagedList(this.currentData());
                        Alerts.addAlert("Платеж создан", AlertPriority.Success);
                    })
                    .fail(() => {
                        Alerts.addAlert("Платеж не создан", AlertPriority.Error);
                    });
            })
            .fail(() => {
                Alerts.addAlert("Платеж не создан", AlertPriority.Error);
            });          
    }
    updatePayment = (payment) => {
       Resource.updatePayment(payment.Id, payment)
            .done((data) => {
                this.currentData()
                    .forEach(item => {
                        if (item.id() === payment.Id) {
                            item.clientId(payment.ClientId);
                            item.lastModified(data.LastModified);
                            item.price(payment.Price);
                            item.operatorId(payment.OperatorId);
                            item.type(payment.Type);
                            Alerts.addAlert("Платеж успешно обновлен", AlertPriority.Success);
                        }
                    });
            })
            .fail(() => {
                Alerts.addAlert("Платеж не обновлен", AlertPriority.Error);
            });
    }
    deletePayment = (paymentId) => {
        var payment: PaymentModel;
            Resource.deletePayment(paymentId)
                .done(() => {                
                    this.currentData()
                        .forEach(item => {
                            if (item.id() === paymentId)
                                payment = item;
                        });
                    this.currentData.remove(payment);
                    this.pagination.pagedList(this.currentData());           
                    Alerts.addAlert("Платеж успешно удален", AlertPriority.Success);
                })
                .fail(() => {
                    Alerts.addAlert("Платеж не удален", AlertPriority.Error);
                });
        }    

  
    load = () => {
       return Resource.getPayments()
            .done(data => {
                var payments = ko.utils.arrayMap(data,
                    item => {
                        return new PaymentModel(item);
                    });
                this.fulldata(payments);
                this.currentData(payments);              
            })
            .fail(data => {
                console.log(data);
            });
    }
    filterByDate = (startDate, endDate) => {        
        var array = ko.utils.arrayFilter(this.fulldata(),
            item => {
                return Utils.isInInterval(startDate, endDate, item.createDate());
            });
        this.pagination.pagedList(array);
    }
    filterByName = (name, startDate, endDate, paymentType) => {
        var array = ko.utils.arrayFilter(this.fulldata(),
            item => {           
               if(name === null ) {
                   return startDate() === '' ? paymentType === item.type() : Utils.isInInterval(startDate(), endDate(), item.createDate()) && paymentType === item.type();
                }
               var operatorNameCompare = name() === item.operatorName();
               if (startDate() === '') {
                    return paymentType === null
                        ? operatorNameCompare
                        : operatorNameCompare && paymentType === item.type();
                } else {
                    return paymentType === null
                        ? operatorNameCompare &&
                        Utils.isInInterval(startDate(), endDate(), item.createDate())
                        : operatorNameCompare &&
                        paymentType === item.type() &&
                        Utils.isInInterval(startDate(), endDate(), item.createDate());
                }
            });
        this.pagination.pagedList(array);
    }
    clear = () => {
        this.pagination.pagedList(this.fulldata());
    }


    find = (filter: string, value: any) => {
        var array = [];
        if (value() === "") {
            array = this.fulldata();
        } else {
            array = ko.utils.arrayFilter(this.fulldata(),
                item => {
                    return this.findTypes[filter].predicate(item,value());
                });
        }
        this.pagination.pagedList(array);
    };
    switchOrder = ko.observable("");

    orderBy = (property: TrModel) => {
        var option = property.orderBy() === "asc" ? `-${property.name()}` : property.name();
        if (this.fulldata() !== undefined) {
            this.pagination.pagedList(this.fulldata().sort(Utils.dynamicSort(option)));
            property.switchOrder(property);
        }          
    }

    constructor() {
        this.load()
            .done(() => {
                this.pagination.init(
                {
                    data: this.currentData()
                });                 
            });
    }

}

export class PaymentModel {
    id = ko.observable();
    type = ko.observable('');
    clientId = ko.observable('');
    clientCode = ko.observable('');
    clientName = ko.observable('');
    operatorId = ko.observable('');
    operatorCode = ko.observable('');
    operatorName = ko.observable('');
    price = ko.observable<number>();
    displayPrice = (price) => {
        return Utils.displayPrice(price);
    }
    erpCode = ko.observable();
    createDate = ko.observable('');
    lastModified = ko.observable('');

    constructor(data: any) {
        this.id(data.Id);
        this.type(data.Type == '1' ? 'смс' : 'вручную');
        this.clientId(data.ClientId);
        this.clientCode(data.ClientCode);
        this.clientName(data.ClientName);
        this.operatorId(data.OperatorId);
        this.operatorCode(data.OperatorCode);
        this.operatorName(data.OperatorName);
        this.price(data.Price);
        this.erpCode(data.ErpCode);
        this.createDate(data.CreatedDate);
        this.lastModified(data.LastModified || "");
    }
   
}




