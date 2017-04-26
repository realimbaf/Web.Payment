import * as ko from "knockout";
import "jquery-mask-plugin/dist/jquery.mask.min.js";

export function registerMask() {
    ko.bindingHandlers["masked"] = {
        init(element, valueAccessor, allBindingsAccessor) {
            var mask = allBindingsAccessor().mask || {};
            $(element)["mask"](mask);
            ko.utils.registerEventHandler(element,
                'focusout',
                () => {
                    var observable = valueAccessor();
                    observable($(element).val());
                });
        },
        update(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).val(value);
        }
    };
}