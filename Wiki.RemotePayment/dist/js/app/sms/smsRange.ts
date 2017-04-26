import * as ko from "knockout";
export class SmsDateRangeModel {

    init = (viewModel) => {
        this.datepicker.viewModel = viewModel;
    }
    datepicker = {
        startDate: ko.observable(''),
        endDate: ko.observable(''),
        viewModel: undefined,
        groupBy: () => {
            this.datepicker.viewModel.smsModel.groupBy(this.datepicker.startDate(), this.datepicker.endDate());
        },
        clear: () => {
            this.datepicker.startDate('');
            this.datepicker.endDate('');
            this.datepicker.viewModel.smsModel.clear();
        }
    }
} 
