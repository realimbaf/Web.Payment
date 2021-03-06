﻿import * as ko from "knockout";
ko.bindingHandlers.maxLength = ko.bindingHandlers.maxLength || {
    init: function (element, valueAccessor) {
        var underlyingObservable = valueAccessor();
        if (underlyingObservable > 0) {
            ko.applyBindingsToNode(element, {
                attr: {
                    maxlength: underlyingObservable
                }
            });
        }
    }
};
ko.extenders.maxLength = function (target, maxLength) {
    var result = ko.computed({
        read: target,
        write: function (val) {
            if (maxLength > 0) {
                if (val.length > maxLength) {
                    var limitedVal = val.substring(0, maxLength);
                    if (target() === limitedVal) {
                        target.notifySubscribers();
                    }
                    else {
                        target(limitedVal);
                    }
                    result.css("errorborder");
                    setTimeout(function () { result.css(""); }, 500);
                }
                else { target(val); }
            }
            else { target(val); }
        }
    }).extend({ notify: 'always' });
    result.css = ko.observable();
    result(target());
    return result;
};
