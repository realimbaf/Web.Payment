"use strict";
var ManagersModel = (function () {
    function ManagersModel() {
        var _this = this;
        this.managers = ko.observableArray();
        this.load = function () {
            ConfigApp.ResourceService.getManagers()
                .done(function (managers) {
                var observableManagers = ko.utils.arrayMap(managers, function (manager) {
                    return new ManagerModel(manager);
                });
                _this.managers(observableManagers);
            });
        };
        this.add = function (manager) {
            ConfigApp.ResourceService.addManager(manager)
                .done(function () {
                _this.managers.unshift(new ManagerModel(manager));
                ConfigApp.AlertsModel.addAlert("Менеджер успешно добавлен", ConfigApp.AlertPriority.Success);
            })
                .fail(function () {
                ConfigApp.AlertsModel.addAlert("Менеджер не добавлен", ConfigApp.AlertPriority.Error);
            });
        };
        this.delete = function (manager) {
            ConfigApp.ResourceService.deleteManager(manager.clientId())
                .done(function () {
                _this.managers.remove(manager);
                ConfigApp.AlertsModel.addAlert("Менеджер успешно удален", ConfigApp.AlertPriority.Success);
            })
                .fail(function () {
                ConfigApp.AlertsModel.addAlert("Менеджер не удален", ConfigApp.AlertPriority.Error);
            });
        };
        this.update = function (manager) {
            ConfigApp.ResourceService.updateManager(manager.Id, manager)
                .done(function (data) {
                _this.managers()
                    .forEach(function (item) {
                    if (manager.Id === item.clientId()) {
                        item.lastModified(data.LastModified);
                        item.phone(manager.Phone);
                    }
                });
                ConfigApp.AlertsModel.addAlert("Менеджер успешно обновлен", ConfigApp.AlertPriority.Success);
            })
                .fail(function () {
                ConfigApp.AlertsModel.addAlert("Менеджер не обновлен", ConfigApp.AlertPriority.Error);
            });
        };
        this.load();
    }
    return ManagersModel;
}());
exports.ManagersModel = ManagersModel;
var ManagerModel = (function () {
    function ManagerModel(data) {
        this.clientId = ko.observable("");
        this.phone = ko.observable("");
        this.name = ko.observable("");
        this.lastModified = ko.observable("");
        this.clientId(data.Id);
        this.phone(data.Phone);
        this.name(data.Name);
        this.lastModified(data.LastModified);
    }
    return ManagerModel;
}());
