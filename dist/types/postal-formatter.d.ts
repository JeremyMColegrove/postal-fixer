import { ISO2 } from 'ts-country-code';
export declare class InvalidPostalCodeError extends Error {
    constructor();
}
declare function fix(postal: string, country?: ISO2): string;
export { fix };
