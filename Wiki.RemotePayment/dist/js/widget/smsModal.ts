import * as ko from "knockout";
import "knockout.validation";
export class ManagerModalModel {
    onModalClose = () => {

    }

    onModalAction = () => {
        if (this.errors().length === 0) {
            var manager = {
                Phone: `${this.modal.phone().replace(/(-)|(\()|(\))/g, "")}`,
                Id: parseInt(this.modal.clientId())
            };
            if (this.modal.managerModel === null) {
                this.modal.viewModel.add(manager);
            } else {
                this.modal.viewModel.update(manager);
            }
            this.modal.show(false);
        }
        else {
            this.errors.showAllMessages();
        }
    }

    showModal = (viewModel,managerModel) => {
        this.modal.viewModel = viewModel;
        this.modal.managerModel = managerModel;
        this.modal.isDisabled(false);
        if (this.modal.managerModel !== null) {
            this.modal.clientId(managerModel.clientId());
            this.modal.phone(managerModel.phone());
            this.modal.isDisabled(true);
        }
        this.modal.show(true);
    }
    modal = {
        viewModel: undefined,
        managerModel: undefined,
        header: "Добавить/Изменить оператора",
        closeLabel: "Отмена",
        primaryLabel: "Сохранить",
        isDisabled : ko.observable(false),
        isFocused : ko.observable(false),
        clientId: ko.observable("").extend({ require: true }),
        phone: ko.observable("").extend({ require: true }),
        show: ko.observable(false),
        onClose: () => {
            this.onModalClose();
        },
        onAction: () => {
            this.onModalAction();
        }
    }
    errors = ko.validation.group(this.modal);
}
