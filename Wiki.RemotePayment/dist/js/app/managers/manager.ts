import * as ko from "knockout";
import Resource from '../../resource/resource';
import { AlertPriority } from '../../resource/alerts';
import Alerts from '../../resource/alerts';

export class ManagersModel {
    managers = ko.observableArray<ManagerModel>();

    load = () => {
        Resource.getManagers()
            .done((managers) => {
                var observableManagers =  ko.utils.arrayMap(managers,
                    (manager) => {
                        return new ManagerModel(manager);
                    });
                this.managers(observableManagers);
            });
           
    }
    add = (manager: ManagerModel) => {
        Resource.addManager(manager)
            .done(() => {
                this.managers.unshift(new ManagerModel(manager));
                Alerts.addAlert("Менеджер успешно добавлен",AlertPriority.Success);
            })
            .fail(() => {
                Alerts.addAlert("Менеджер не добавлен", AlertPriority.Error);
            });
    }
    delete = (manager) => {
        Resource.deleteManager(manager.clientId())
            .done(() => {
                this.managers.remove(manager);
                Alerts.addAlert("Менеджер успешно удален", AlertPriority.Success);
            })
            .fail(() => {
                Alerts.addAlert("Менеджер не удален", AlertPriority.Error);
            });
    }
    update = (manager) => {
        Resource.updateManager(manager.Id, manager)
            .done((data) => {
                this.managers()
                    .forEach(item => {
                        if (manager.Id === item.clientId()) {
                            item.lastModified(data.LastModified);
                            item.phone(manager.Phone);
                        }
                    });
                Alerts.addAlert("Менеджер успешно обновлен", AlertPriority.Success);
            })
            .fail(() => {
                Alerts.addAlert("Менеджер не обновлен", AlertPriority.Error);
            });
    }
    constructor() {
        this.load();
    }
}

class ManagerModel {
    clientId = ko.observable("");
    phone = ko.observable("");
    name = ko.observable("");
    lastModified = ko.observable("");

    constructor(data:any) {
        this.clientId(data.Id);
        this.phone(data.Phone);
        this.name(data.Name);
        this.lastModified(data.LastModified);
    }
}