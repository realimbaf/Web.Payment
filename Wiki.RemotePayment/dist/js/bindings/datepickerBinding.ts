import * as moment from 'moment';
import * as ko from "knockout";
import "bootstrap";
import 'moment/locale/ru.js';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js';
import "bootstrap-datepicker/js/locales/bootstrap-datepicker.ru";

export function registerDatePicker() {
   ko.bindingHandlers["datepicker"] = {
       init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
           var startDate = $(element).find('.startDate').first();
           var endDate = $(element).find('.endDate').first();
           var vm = viewModel;
           startDate["datepicker"]({
                   format: "dd.mm.yyyy",
                   maxViewMode: 0,
                   todayBtn: "linked",
                   language: "ru"
               })
               .on("changeDate",
                   (event) => {
                       moment.locale('ru');
                       var value = valueAccessor();
                       if (value.end() === undefined) {
                           value.end(moment(event["date"]).format('L'));
                       }
                       value.start(moment(event["date"]).format('L'));
                       if (moment(value.start(), 'L').isAfter(moment(value.end(), 'L'))) {
                           value.end(moment(event["date"]).format('L'));
                       }
                       endDate["datepicker"]('setDate', event["date"]);
                   });
           endDate["datepicker"]({
                   format: "dd.mm.yyyy",
                   maxViewMode: 0,
                   todayBtn: "linked",
                   language: "ru"
               })
               .on("changeDate",
                   (event) => {
                       var value = valueAccessor();
                       moment.locale('ru');
                       value.end(moment(event["date"]).format('L'));
                       vm.dateRangeModel.init(vm);
                       vm.dateRangeModel.datepicker.groupBy();
               });
           $("#reset-date")
               .click(() => {
                   var value = valueAccessor();
                   startDate.val("")['datepicker']('update');
                   endDate.val("")['datepicker']('update');
                   value.clear();
               });
       }
   }; 
}

