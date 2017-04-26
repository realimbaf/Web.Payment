import * as ko from "knockout";
import "knockout.validation";
import Resource from '../resource/resource';
export class ExportModalModel {
    onModalClose = () => {

    }

    onModalAction = () => {
        if (confirm(`Вы уверены, что хотите экcпортировать платежы ?`)) {
            this.modal.viewModel.erpExport(this.modal.exportModel);
            this.modal.show(false);
        }          
    }

    showModal = (viewModel,exportModel) => {
        this.modal.show(true);
        this.modal.viewModel = viewModel;
        if (exportModel) {
            this.modal.exportModel([exportModel]);
        } else {
            this.modal.exportModel(viewModel.getSnapForErp());
        }        
    }
    modal = {
        viewModel: undefined,
        exportModel : ko.observableArray(),
        header: "Подтверждение экспорта",
        closeLabel: "Отмена",
        primaryLabel: "Сохранить",
        show: ko.observable(false),
        onClose: () => {
            this.onModalClose();
        },
        isFocused: ko.observable(false),
        onAction: () => {
            this.onModalAction();
        }
    }
    errors = ko.validation.group(this.modal);
}
