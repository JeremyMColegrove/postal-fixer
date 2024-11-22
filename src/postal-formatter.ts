import {ISO2, ISO3} from 'ts-country-code'

export class InvalidPostalCodeError extends Error {
    constructor() {
        super('Invalid postal code.')
        Object.setPrototypeOf(this, InvalidPostalCodeError.prototype);
    }
}

// format will receive valid zip code, and will format zip correctly depending on country
function format(zip:string, country: ISO2 = ISO2.US) {
    switch (country) {
        case ISO2.US:
            if (zip.length == 9) {
                return zip.slice(0, 5) + '-' + zip.slice(5)
            }
            return zip
        case ISO2.CA:
            return zip.slice(0, 3) + ' ' + zip.slice(3)
    }
    return zip
}

function fix(postal:string, country: ISO2 = ISO2.US) {
    // validate the zip code
    switch (country) {
        case ISO2.US:
            postal = postal.replace(/[^0-9]/g, '')
            if (postal.length == 5 || postal.length == 9) {
                return format(postal, country)
            }
            throw new InvalidPostalCodeError()
        case ISO2.CA:
            postal = postal.toUpperCase().replace(/[^0-9A-Z]/g, '')
            if (postal.match(/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/)) {
                return format(postal, country)
            }
            throw new InvalidPostalCodeError()
        default:
            return format(postal, country)
    }
}

export {fix}