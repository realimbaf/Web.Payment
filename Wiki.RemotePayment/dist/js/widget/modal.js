"use strict";
var resource_1 = require("../resource/resource");
var ModalModel = (function () {
    function ModalModel() {
        var _this = this;
        this.onModalClose = function () {
        };
        this.onModalAction = function () {
            var payment = {
                Type: _this.modal.selectedType(),
                OperatorId: _this.modal.operatorId(),
                ClientCode: _this.modal.clientCode(),
                ClientId: _this.modal.clientId(),
                Price: _this.modal.price(),
                Id: _this.modal.id() || ""
            };
            if (_this.modal.paymentModel === null) {
                _this.modal.viewModel.paymentsModel.addPayment(payment);
            }
            else {
                _this.modal.viewModel.paymentsModel.updatePayment(payment);
            }
            _this.modal.show(false);
        };
        this.showModal = function (viewModel, paymentModel) {
            _this.modal.viewModel = viewModel;
            _this.modal.paymentModel = paymentModel;
            _this.modal.isDisabled(false);
            if (_this.modal.paymentModel !== null) {
                _this.modal.clientCode(paymentModel.clientCode());
                _this.modal.selectedType(paymentModel.type());
                _this.modal.price(paymentModel.price());
                _this.modal.id(paymentModel.id());
                _this.modal.clientId(paymentModel.clientId());
                _this.modal.isDisabled(true);
            }
            _this.modal.operatorId(viewModel.userModel.currentUser().clientId());
            _this.modal.operatorName(viewModel.userModel.currentUser().name());
            _this.modal.show(true);
        };
        this.modal = {
            viewModel: undefined,
            paymentModel: undefined,
            header: "Добавить/Изменить платеж",
            closeLabel: "Отмена",
            primaryLabel: "Сохранить",
            availableTypes: ko.observableArray([{ name: "вручную", id: 2 }, { name: "авто", id: 1 }]),
            selectedType: ko.observable(""),
            selectedBadges: {
                title: ko.observable("Введите код клиента "),
                css: ko.observable("label label-info")
            },
            isFocused: ko.observable(false),
            operatorId: ko.observable(""),
            operatorName: ko.observable(""),
            clientCode: ko.observable(""),
            clientId: ko.observable(""),
            isDisabled: ko.observable(false),
            price: ko.observable(""),
            id: ko.observable(""),
            isClientValid: ko.observable(false),
            show: ko.observable(false),
            onClose: function () {
                _this.onModalClose();
            },
            onAction: function () {
                _this.onModalAction();
            },
            checkClient: function () {
                resource_1.default.getClientByCode(_this.modal.clientCode())
                    .done(function (data) {
                    if (data == null) {
                        _this.modal.selectedBadges.css("label label-danger");
                        _this.modal.selectedBadges.title("Упс.Клиент не найден");
                    }
                    else {
                        _this.modal.selectedBadges.css("label label-success");
                        _this.modal.selectedBadges.title(data.Name);
                    }
                })
                    .fail(function (data) {
                    _this.modal.selectedBadges.css("label label-danger");
                    _this.modal.selectedBadges.title("Упс.Клиент не найден");
                });
            }
        };
    }
    return ModalModel;
}());
exports.ModalModel = ModalModel;
