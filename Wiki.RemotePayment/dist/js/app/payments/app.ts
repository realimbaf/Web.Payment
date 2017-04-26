import * as ko from "knockout";
import Alerts from '../../resource/alerts';
import { PaymentsModel } from './payment';
import { PaymentsDateRangeModel as PaymentsDateRangeModel } from './paymentsRange';
import { PayersModel } from './payer';
import { PaymentModalModel } from '../../widget/paymentModal';
import { ExportModalModel } from '../../widget/erpExportModal';
import { UserHandlerModel } from "../user";
import { registerDatePicker } from '../../bindings/datepickerBinding';
import { registerModal } from '../../bindings/modalBinding';
import { registerAlert } from '../../bindings/alertBinding';
import "knockout.validation";
import "knockout.validation/localization/ru-RU.js"

class PaymentView {
    alertsModel = new Alerts();
    paymentsModel = new PaymentsModel();
    modalModel = new PaymentModalModel();
    exportModalModel = new ExportModalModel();
    userModel = new UserHandlerModel();
    payerModel = new PayersModel();
    dateRangeModel = new PaymentsDateRangeModel();
}     
$(document)
    .ready(() => {
        registerDatePicker();
        registerModal();
        registerAlert();
        ko.validation.init({
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: true,
            parseInputAttributes: true,
            messageTemplate: null
        }, true);
        ko.validation.locale('ru-RU');
        ko.applyBindings(new PaymentView());
    });