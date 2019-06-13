'use strict'

let _data, _preprocessorRules, _jobDetails, _traceFields;

class RequestDto {
    constructor(data, preprocessorRules, jobDetails, traceFields) {
        _data = data;
        _preprocessorRules = preprocessorRules;
        _jobDetails = jobDetails;
        _traceFields = traceFields;
    }

    get data() {
        return _data;
    }

    get preprocessorRules() {
        return _preprocessorRules;
    }

    get jobDetails() {
        return _jobDetails;
    }

    get traceFields() {
        return _traceFields;
    }

    toString() {
        return JSON.stringify({
            data: this.data,
            preprocessorRules: this.preprocessorRules,
            jobDetails: this.jobDetails,
            traceFields: this.data.traceFields
        })
    }
}

module.exports = RequestDto;