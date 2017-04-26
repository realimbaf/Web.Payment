import * as ko from "knockout";
import Resource from '../resource/resource';
export class UserHandlerModel {

    roles = {
        admin: "AdminPayment",
        manager: "ManagerPayment",
        auditor: "AuditorPayment"
    }
    load = () => {
        Resource.getUser()
            .done((data) => {
                this.setUser(data);
            });
    }
    currentUser = ko.observable<UserModel>();
    setUser = (user: UserModel) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUser(new UserModel(user));
    }
    clearUser = () => {
        localStorage.clear();
    }
    logout = () => {
        Resource.logout()
            .done(() => {
                this.clearUser();
            });
    }
    getUser = () => {
        return JSON.parse(localStorage.getItem("user"));    
    }
    isAdmin = () => {
        return this.currentUser().seniorRole() === this.roles.admin;
    }
    isManager = () => {
        return this.currentUser().seniorRole() === this.roles.manager;
    }
    isAuditor = () => {
        return this.currentUser().seniorRole() === this.roles.auditor;
    }

    constructor() {
        this.currentUser(new UserModel({ Name: "", Id: "", CompanyId: "", ClientId: "", ClientCode: "", SeniorRole: "" }));
        if (localStorage.getItem("user") == null) {
            this.load();
        } else {
            this.currentUser(new UserModel(this.getUser()));
        }         
    }
}
export class UserModel {
    constructor(data: any) {
        this.id(data.Id || '');
        this.name(data.Name || '');
        this.companyId(data.CompanyId || '');
        this.clientId(data.ClientId || '');
        this.clientCode(data.ClientCode || '');
        this.seniorRole(data.SeniorRole || '');
    }

    id = ko.observable("");
    name = ko.observable("");
    companyId = ko.observable("");
    clientId = ko.observable("");
    clientCode = ko.observable("");
    seniorRole = ko.observable("");

        
}
