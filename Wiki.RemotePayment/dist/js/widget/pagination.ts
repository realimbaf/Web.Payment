import * as ko from "knockout";
export default class Pagination {
    data = ko.observable<any>([]);
    pageSize = ko.observable(100);
    avalaibleSizes = ko.observableArray([20,50,100,200]);
    pageIndex = ko.observable(0);

    maxPageIndex = ko.computed(() => (Math.ceil(this.data().length / this.pageSize()) - 1));

    previousPage = () => {
        if (this.pageIndex() > 0) {
            this.pageIndex(this.pageIndex() - 1);
        }
    };
    nextPage = () => {
        if (this.pageIndex() < this.maxPageIndex()) {
            this.pageIndex(this.pageIndex() + 1);
        }
    };
    allPages = ko.computed(() => {
        var pages = [];
        for (let i = 0; i <= this.maxPageIndex(); i++) {
            pages.push({ pageNumber: (i + 1) });
        }
        return pages;
    });
    moveToPage = index => {
        this.pageIndex(index);
    };
    pagedList = ko.computed({
        read: () => {
            if (this.data().length > 0) {
                var size = this.pageSize();
                var start = this.pageIndex() * size;
                return this.data().slice(start, start + size);
            }
        },
        write: (func) => {
            return this.data(func);
        },
        owner: this
    });
    init = (settings) => {
        this.data(settings.data || this.data());
        this.pageSize(settings.pageSize || this.pageSize());
        this.avalaibleSizes(settings.avalaibleSizes || this.avalaibleSizes());
        this.pageIndex(settings.pagedIndex || this.pageIndex());
    }
}