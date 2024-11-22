var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ISO2 } from 'ts-country-code';
var InvalidPostalCodeError = /** @class */ (function (_super) {
    __extends(InvalidPostalCodeError, _super);
    function InvalidPostalCodeError() {
        var _this = _super.call(this, 'Invalid postal code.') || this;
        Object.setPrototypeOf(_this, InvalidPostalCodeError.prototype);
        return _this;
    }
    return InvalidPostalCodeError;
}(Error));
export { InvalidPostalCodeError };
// format will receive valid zip code, and will format zip correctly depending on country
function format(zip, country) {
    if (country === void 0) { country = ISO2.US; }
    switch (country) {
        case ISO2.US:
            if (zip.length == 9) {
                return zip.slice(0, 5) + '-' + zip.slice(5);
            }
            return zip;
        case ISO2.CA:
            return zip.slice(0, 3) + ' ' + zip.slice(3);
    }
    return zip;
}
function fix(postal, country) {
    if (country === void 0) { country = ISO2.US; }
    // validate the zip code
    switch (country) {
        case ISO2.US:
            postal = postal.replace(/[^0-9]/g, '');
            if (postal.length == 5 || postal.length == 9) {
                return format(postal, country);
            }
            throw new InvalidPostalCodeError();
        case ISO2.CA:
            postal = postal.toUpperCase().replace(/[^0-9A-Z]/g, '');
            if (postal.match(/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/)) {
                return format(postal, country);
            }
            throw new InvalidPostalCodeError();
        default:
            return format(postal, country);
    }
}
export { fix };
