import * as ko from "knockout";
export class PaymentsDateRangeModel {

    init = (viewModel) => {
        this.datepicker.viewModel = viewModel;
    }
    datepicker ={
        startDate : ko.observable(''),
        endDate: ko.observable(''),
        viewModel: undefined,
        groupBy : () => {
            this.datepicker.viewModel.payerModel.groupBy(this.datepicker.startDate(), this.datepicker.endDate());
            this.datepicker.viewModel.paymentsModel.filterByDate(this.datepicker.startDate(), this.datepicker.endDate());
        },
        clear: () => {
            this.datepicker.startDate('');
            this.datepicker.endDate('');
            this.datepicker.viewModel.payerModel.groupBy(null, null);
            this.datepicker.viewModel.paymentsModel.clear();
        }
    }       
} 
