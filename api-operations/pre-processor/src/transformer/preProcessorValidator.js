'use strict';

let GenericException = require('generic-exception').GenericException;
const ExceptionCategory = require('../model/ExceptionCategory');
const ExceptionType = require('../model/ExceptionType');

class GenericTransformerValidator {

    async validate(generictransformerDto) {
        if (!(generictransformerDto.name && generictransformerDto.name.trim())) {
            throw this.generateValidationException(ExceptionType.MISSING_CUSTOMER_FIRSTNAME);
        }
        if (!(generictransformerDto.email && generictransformerDto.email.trim())) {
            throw this.generateValidationException(ExceptionType.MISSING_CUSTOMER_EMAIL);
        }
        if (!generictransformerDto.email.toString().match('.com')) {
            throw this.generateValidationException(ExceptionType.INVALID_EMAIL, {
                'emailId': generictransformerDto.email.toString()
            });
        }
        return generictransformerDto;
    }

    generateValidationException(exceptionType, inspectionFields) {
        return new GenericException.Builder(exceptionType, global.messageBundle)
            .withMessage(`Validation error : ${exceptionType}`)
            .withExceptionCategory(ExceptionCategory.VALIDATION_ERROR)
            .withInspectionFields(inspectionFields)
            .build();
    }
}

module.exports = new GenericTransformerValidator();