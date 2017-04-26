import * as ko from "knockout";
import { registerDatePicker } from '../../bindings/datepickerBinding';
import { SmsDateRangeModel as SmsDateRangeModel} from './smsRange';
import { SmsModel } from './sms';
import { UserHandlerModel } from "../user";

class SmsView
{
    userModel = new UserHandlerModel();
    smsModel = new SmsModel();
    dateRangeModel = new SmsDateRangeModel();
}
$(document)
    .ready(() => {
        registerDatePicker();
        ko.applyBindings(new SmsView());
    });