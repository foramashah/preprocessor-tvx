const GenericException = require('generic-exception').GenericException;

const ExceptionType = require('../model/ExceptionType');
const ExceptionCategory = require('../model/ExceptionCategory');

const STATUS = Object.freeze({ SUCCESS: "SUCCESS", FAILED: "FAILED", SKIPPED: "SKIPPED" });




/**
 * Base Transformer Class, this will be extended in interface specific transformers and `transform` method will be overriden .
 * 
 */
class BaseTransformer {
    /**
     * Base Transformer Class
     */
    constructor() {
        this.errorMessages = [];

    }
    get utils() {
        return
    }

    get status() {
        return STATUS;
    }
    /**
     * Transforms the data as per mapper
     * @param {JSON} data  JSON data
    *  It transforms the data based on transformer file
     */
    transform(dataRow, jobDetails, interfaceConfig, traceFields) { }


    addErrorMessage(_message) {
        if (_message)
            this.errorMessages.push({ errorMessage: _message });
    }


    sendTransformedData(status, message, data, errors) {
        if (errors && errors.length > 0) {
            return generateError(errors);
        }
        else {
            return {
                status: status,
                message: message,
                data: data,
                errors: errors
            }
        }
    }

    toGenericError(exception) {
        if (!(exception instanceof GenericException)) {
            throw new GenericException.Builder(ExceptionType.TRANSFORMATION_FAILED)
                .withExceptionCategory(ExceptionCategory.TRANSFORMATION_ERROR)
                .withWrappedException(exception)
                .withInspectionFields()
                .build();
        } else {
            throw exception;
        }
    }
}

function generateError(errorMessages) {
    throw new GenericException.Builder(ExceptionType.TRANSFORMATION_FAILED)
        .withReason(errorMessages)
        .withMessage('Transformation failed, check reason property!')
        .withExceptionCategory(ExceptionCategory.TRANSFORMATION_ERROR)
        .withInspectionFields()
        .build();
}
module.exports = BaseTransformer;