var ApiProcessor = require('../src/api/PreprocessApiProcessor');
const assert = require('chai').assert;

describe('preprocess ApiProcessor - Unit test', () => {
  /*
    it('should return transformed json when valid input json is passed', () => {
        ApiProcessor.process(inputData, '').then((result) => {
            assert.deepEqual(result, outputdata);
        }).catch(error => {
            console.log("error : ", error);
        });
    });

    it('should return error when invalid input json i.e. blank json is passed', () => {
        let jsonData = {};
        ApiProcessor.process(jsonData,'').then((result) => {
            assert.notStrictEqual(result, 'MissingRequiredParameter');
        }).catch(error => {
            console.log("error : ", error);
        })
    });

    it('should return error when invalid bucket name is passed in input json', () => {
        let inputData = {
            "keyName": "interfaces/transformers/Finance/FXRates_transformer.js",
            "objectLocation": "tvx-middleware-dev-Foramtest",
            "data": {
                "Currency": "AED",
                "Rate": 6.0994,
                "filename": "codagbp290814.csv",
                "interfaceName": "FX_RATES"
            }
        };
        ApiProcessor.process(inputData,'').then((result) => {
            assert.notEqual(result, null, 'done2');
            assert.notStrictEqual(result, 'bucket does not exist');
        }).catch(error => {
            console.log("error : ", error);
        })
    });

    it('should return error when invalid key name is passed in input json', () => {
        let inputData = {
            "keyName": "interfaces/transformers/Finance/FXRates_transformer123.js",
            "objectLocation": "tvx-middleware-dev",
            "data": {
                "Currency": "AED",
                "Rate": 6.0994,
                "filename": "codagbp290814.csv",
                "interfaceName": "FX_RATES"
            }
        };
        ApiProcessor.process(inputData,'').then((result) => {
            assert.notEqual(result, null, 'done3');
            assert.notStrictEqual(result, 'key does not exist');
        }).catch(error => {
            console.log("error : ", error);
        })
    });
*/
});