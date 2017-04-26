import * as $ from "jquery";

 export default class ResourceService {

        static getPayments() {
            return $.ajax({
                url: "/api/Payments/",
                cache: false,
                contentType: "application/json"
            });
        }
        static getPayment(id) {
            return $.ajax({
                url: `/api/Payments/${id}`,
                cache: false,
                contentType: "application/json"
            });
        }
        static getClient(id) {
            return $.ajax({
                url: `/api/Clients/${id}`,
                cache: false,
                contentType: "application/json"
            });
        }
        static getClientByCode(id) {
            return $.ajax({
                url: `/api/Clients/Code/${id}`,
                cache: false,
                contentType: "application/json"
            });
        }
        static getClients(data: any) {
            return $.ajax({
                type: "POST",
                data: JSON.stringify(data),
                url: "/api/Clients/",
                contentType: "application/json"
            });
        }
        static addPayment(data: any) {
            return $.ajax({
                type: "POST",
                data: JSON.stringify(data),
                url: "/api/Payments/",
                contentType: "application/json"
            });
        }
        static updatePayment(id:number,data: any) {
            return $.ajax({
                type: "PUT",
                data: JSON.stringify(data),
                url: `/api/Payments/${id}`,
                contentType: "application/json"
            });
        }
        static deletePayment(id: number) {
            return $.ajax({
                type: "DELETE",
                url: `/api/Payments/${id}`
            });
        }
        static getUser() {
            return $.ajax({
                url: "/api/Clients/User",
                cache : false
            });
        }
        static addManager(data: any) {
            return $.ajax({
                type: "POST",
                data: data,
                url: "/api/Clients/Managers",
                cache: false
            });
        }
        static updateManager(id:number,data: any) {
            return $.ajax({
                type: "PUT",
                data: data,
                url: `/api/Clients/Managers/${id}`,
                cache: false
            });
        }
        static deleteManager(id: number) {
            return $.ajax({
                type: "DELETE",
                url: `/api/Clients/Managers/${id}`
            });
        }
        static getManagers() {
            return $.ajax({
                url: "/api/Clients/Managers",
                cache: false
            });
        }
        static logout() {
            return $.ajax({
                url: "/api/Account/Logout",
                cache: false,
                crossDomain: true
            });
        }
        static getSms() {
            return $.ajax({
                url: "/api/Sms/",
                cache: false
            });
        }
        static exportToErp(data) {
            return $.ajax({
                type: "POST",
                data: data,
                url: "/api/Export/Erp",
                cache: false
            });
        }
     }
