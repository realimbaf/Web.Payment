import * as ko from "knockout";
import { ManagersModel } from './manager';
import Alerts from '../../resource/alerts';
import { UserHandlerModel } from './../user';
import { ManagerModalModel } from '../../widget/smsModal';
import { registerModal } from '../../bindings/modalBinding';
import { registerAlert } from '../../bindings/alertBinding';
import { registerMask } from '../../bindings/maskBinding';
import "knockout.validation";
import "knockout.validation/localization/ru-RU.js"
class ManagerView {
    alertsModel = new Alerts();
    modalModel = new ManagerModalModel();
    userModel = new UserHandlerModel();
    managerModel = new ManagersModel();
}

$(document)
    .ready(() => {
        registerAlert();
        registerModal();
        registerMask();
        ko.validation.init({
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: true,
            parseInputAttributes: true,
            messageTemplate: null
        }, true);
        ko.validation.locale('ru-RU');
        ko.applyBindings(new ManagerView());
    });
