import * as ko from "knockout";
import "bootstrap";

export function registerModal() {
    ko.bindingHandlers["bootstrapModal"] = {
        init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            const props = valueAccessor();
            var vm = bindingContext.createChildContext(viewModel);
            ko.utils.extend(vm, props);
            vm.close = () => {
                vm.show(false);
                vm.onClose();
            };
            vm.action = () => {
                vm.onAction();
            };
            vm.del = () => {
                if (confirm('Вы уверены, что хотите удалить?'))
                 vm.onDelete();
            };
            $(element)
                .on('shown.bs.modal',
                    () => {
                        vm.isFocused(true);
                    });
            $("form")
                .on("submit",
                    () => {
                        vm.onAction();
                });
            ko.utils.toggleDomNodeCssClass(element, "modal", true);
            ko.renderTemplate($(element).attr('id'), vm, null, element);
            const showHide = ko.computed(() => {
                $(element)["modal"](vm.show() ? 'show' : 'hide');
            });
            return {
                controlsDescendantBindings: true
            };
        }
    }
}