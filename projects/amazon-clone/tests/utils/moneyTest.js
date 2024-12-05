import {formatCurrency} from '../../scripts/utils/money.js';

// describe() creates a test suite in Jasmine
describe('Test suite: formatCurrency', () => {
    // it() creates a test
    it('Converts cents into dollars', () => {
        // expect() compare a value to other value, so we dont have to use the if statement
        // because expect gives an oject, we use toEqual() like '===' to make the comparision
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00')
    });

    it('Rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01')
    });
    
    it('Rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00')
    });

    it('Works with negative numbers', () => {
        expect(formatCurrency(-500)).toEqual('-5.00');
      });
});