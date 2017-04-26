export default class Utils {

    static dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a, b) => {
            var result = (a[property]() < b[property]()) ? -1 : (a[property]() > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    static findWhere(array, element, property) {
        if (array.length === 0) return null;
        for (let i = 0; i < array.length; i++) {
            if (array[i][property]() === element[property]()) {
                return i;
            }
        }
        return null;
    }
    static stringStartsWith(string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };
    static convertToDate(date: any) {
        const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        var dateWithHour = new Date(date.replace(pattern, '$3-$2-$1'));
        return dateWithHour.setHours(0, 0, 0, 0);
    }
    static displayPrice = (price: any) => {
        var spaceCounter = 0;
        var result = "";
        var priceToString = price().toString();
        for (let i = priceToString.length - 1; i >= 0; i--) {
            if (spaceCounter === 2) {
                result = ` ${priceToString[i]}${result}`;
                spaceCounter = 0;
            } else {
                result = `${priceToString[i]}${result}`;
                spaceCounter++;
            }

        }
        return result;
    }
    static isInInterval(startDate, endDate, currentDate) {
    return Utils.convertToDate(startDate) <= Utils.convertToDate(currentDate) &&
        Utils.convertToDate(currentDate) <= Utils.convertToDate(endDate);
}
}
