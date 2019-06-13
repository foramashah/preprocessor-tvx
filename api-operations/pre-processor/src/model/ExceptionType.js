'use strict';
let ExceptionType = {
    // Example: 
    'MISSING_CURRENCY': 'missingCurrency',
    'MISSING_FILENAME': 'missingFilename',
    'MISSING_RATE': 'missingRate',
    'TRANSFORMATION_FAILED': 'transformationError',
    'MISSING_FILE_ROW_DATA': 'missingFileRowData',
    'MISSING_CURRENCY': 'missingCurrency',
    'MISSING_RATE': 'missingRate',
    'UNKNOWN_ERROR': 'unknownError',
    "ERROR_WHILE_VALIDATION": 'errorWhileValidation',
    "ERROR_WHILE_READINGFILE": 'errorWhileReadingFile',
    "ERROR_WHILE_EVALUATING_FILE": 'errorWhileEvaluatingFile',
    "ERROR_WHILE_COPYINGFILE": 'errorWhileCopyingFile',
    "ERROR_WHILE_DELETINGFILE": 'errorWhileDeletingFile'
};

module.exports = ExceptionType;