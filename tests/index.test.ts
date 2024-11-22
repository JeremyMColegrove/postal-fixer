import { ISO2 } from 'ts-country-code';
import { InvalidPostalCodeError, fix } from '../src/postal-formatter';

describe('Zip format', () => {
  beforeEach(() => {
    // cleanup
  });

  it('Should format basic US 9 digit zip', () => {
    expect(fix('781302930', ISO2.US)).toBe('78130-2930')
  });

  it('Should format basic US 5 digit zip', () => {
    expect(fix('78130', ISO2.US)).toBe('78130')
  });

  it('Should throw an error for bad US address (6 digits)', () => {
    expect(()=>fix('781301', ISO2.US)).toThrow(InvalidPostalCodeError)
  });

  it('Should format basic canadian 6 digit zip', () => {
    expect(fix('A4A3R5', ISO2.CA)).toBe('A4A 3R5')
  });

  it('Should format incorrect canadian 6 digit zip with symbols', () => {
    expect(fix('A4A  3..R5__', ISO2.CA)).toBe('A4A 3R5')
  });

  it('Should throw an error for bad canadian address', () => {
    expect(()=>fix('A4A  3..R5__3', ISO2.CA)).toThrow(InvalidPostalCodeError)
  });

  it('Should return zip from unkown country', () => {
    expect(fix('A4AAS', ISO2.AL)).toBe('A4AAS')
  });
});