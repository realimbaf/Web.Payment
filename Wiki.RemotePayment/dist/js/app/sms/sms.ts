import * as ko from "knockout";
import Resource from '../../resource/resource';
import Utils from '../../resource/utils';
import Pagination from '../../widget/pagination';
import * as moment from 'moment';
import 'moment/locale/ru.js';
export class SmsModel {
    fulldata = ko.observableArray<Message>();
    currentData = ko.observableArray();
    pagination = new Pagination();

    clear = () => {
        this.pagination.pagedList(this.fulldata());
    }
    load = () => {
        return Resource.getSms()
            .done(data => {
                var payments = ko.utils.arrayMap(data,
                    item => {
                        return new Message(item);
                    });
                this.fulldata(payments);
                this.currentData(payments);
            })
            .fail(data => {
                console.log(data);
            });
    }
    groupBy = (startDate,endDate) => {
        var array = ko.utils.arrayFilter(this.fulldata(),
            item => {
                return Utils.isInInterval(startDate, endDate, item.createDate());
            });
        this.pagination.pagedList(array);
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
export class Message {
    id = ko.observable();
    number = ko.observable();
    text = ko.observable();
    createDate = ko.observable();
    direction = ko.observable();
    status = ko.observable();
    sendDate = ko.observable();
    receiveDate = ko.observable();
    isProcessed = ko.observable();

    cssColor = ko.observable();
    statusTypes = {
        1: { title: "Получено", css: "successTd" },
        2: { title: "Отправлено", css: "errorTd" },
        3: { title: "Отправлено(с уведомлением)", css: "infoTd" }
    };

    constructor(message) {
        const dates = calcDates(message);
        this.id(message.ID);
        this.number(message.Number);
        this.text(message.Text);
        this.createDate(dates.createDate);
        this.direction(message.Direction === 1 ? "Входящее":"Исходящее");
        this.status(this.statusTypes[message.Status].title);
        this.sendDate(dates.sendDate);
        this.receiveDate(dates.receiveDate);
        this.isProcessed(message.IsProcessed);
        this.cssColor(this.statusTypes[message.Status].css);
    }
}
function calcDates(data: any) {
    moment.locale('ru');
    const result = {
        "createDate": moment(data.CreateDate).format('DD.MM.YYYY HH:mm'),
        "sendDate": moment(data.SendDate).format('DD.MM.YYYY HH:mm'),
        "receiveDate": ""
    };
    if (data.Direction === 2) {
        result.receiveDate = moment(data.ReceiveDate).format('DD.MM.YYYY HH:mm') === "01.01.0001 00:00"
            ? ""
            : moment(data.ReceiveDate).format('DD.MM.YYYY HH:mm');
    }
    return result;
}
