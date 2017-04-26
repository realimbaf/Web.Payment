import * as ko from "knockout";
export default class Alerts {
    static staticModel: Alerts;
    alerts = ko.observableArray<AlertModel>();
    static addAlert = (msg: string, priority: string) => {

        var model = new AlertModel(msg, priority);
        Alerts.staticModel.alerts.push(model);
        window.setTimeout(() => {
            Alerts.staticModel.alerts.remove(model);
        },
            5000);
    };
    constructor() {
        Alerts.staticModel = this;
    }
}
export class AlertModel {
    message: string;
    priority: string;
    constructor(message: string, priority: string) {
        this.message = message;
        this.priority = priority;
    }
}
export class AlertPriority {
    static Error = 'danger';
    static Warning = 'warning';
    static Success = 'success';
    static Info = 'info';
}
