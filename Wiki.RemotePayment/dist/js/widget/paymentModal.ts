import * as ko from "knockout";
import Resource from '../resource/resource';
import "knockout.validation";
export class PaymentModalModel {

    onModalClose = () => {

    }
    onModalAction = () => {
        if (this.errors().length === 0) {
            var payment = {
                Type: this.modal.selectedType(),
                OperatorId: this.modal.operatorId(),
                ClientCode: this.modal.clientCode(),
                ClientId: this.modal.clientId(),
                Price: this.modal.price(),
                Id: this.modal.id() || ""
            }
            if (this.modal.paymentModel === null) {
                Resource.getClientByCode(this.modal.clientCode())
                    .done((data) => {
                        console.log(data);
                        if (confirm(`Вы уверены, что хотите добавить платеж клиенту : ${data.Name}?`))
                            this.modal.viewModel.paymentsModel.addPayment(payment);
                    })
                    .fail((data) => {
                        console.log(data);
                    });
            } else {
                this.modal.viewModel.paymentsModel.updatePayment(payment);
            }
            this.modal.show(false);
        } else {
            this.errors.showAllMessages();
        }
    }
    modal = {   
                  
        viewModel: undefined,
        paymentModel: undefined, 

        header: "Добавить/Изменить платеж",
        closeLabel: "Отмена",
        primaryLabel: "Сохранить",
        availableTypes: ko.observableArray([{ name: "вручную", id: 2 }, { name: "смс", id: 1 }]),
        selectedType: ko.observable(""),
        selectedBadges: {
            title: ko.observable("Введите код клиента "),
            css: ko.observable("label label-info")
        },
        isFocused: ko.observable(false),          
        operatorId: ko.observable(""),
        operatorName : ko.observable(""),
        clientCode: ko.observable("").extend({require:true}),
        clientId: ko.observable(""),
        isUpdate : ko.observable(false),
        price: ko.observable("").extend({ require: true }),
        id : ko.observable(""),
        isClientValid: ko.observable(false),           
        show: ko.observable(false),
        onClose: () => {
            this.onModalClose();
        },
        onAction: () => {
            this.onModalAction();
        },
        onDelete: () => {
            this.modal.viewModel.paymentsModel.deletePayment(this.modal.id());
            this.modal.show(false);
        }
    };
    errors = ko.validation.group(this.modal);
    showModal = (viewModel, paymentModel) => {
        this.modal.viewModel = viewModel;
        this.modal.paymentModel = paymentModel;
        this.modal.isUpdate(false);
        this.modal.operatorId(viewModel.userModel.currentUser().clientId());
        this.modal.operatorName(viewModel.userModel.currentUser().name());
        if (this.modal.paymentModel !== null) {

            this.modal.clientCode(paymentModel.clientCode());
            this.modal.selectedType(paymentModel.type());
            this.modal.price(paymentModel.price());
            this.modal.id(paymentModel.id());
            this.modal.clientId(paymentModel.clientId());
            this.modal.isUpdate(true);
            this.modal.operatorId(paymentModel.operatorId());
            this.modal.operatorName(paymentModel.operatorName());
        }
        
        this.modal.show(true);
    }
}

