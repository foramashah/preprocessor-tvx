'user strict';

let _data, _businessRules, _preprocessorRules, _jobDetails, _traceFields;

class RequestBo {
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
        let preprocessorRules = [];
        if (_preprocessorRules && _preprocessorRules.length > 0) {
            // _preprocessorRules.map(rule => {
            //     return `interfaces/transformers/${this.jobDetails.domain}/${rule}`;
            // })
            for (let i = 0; i < _preprocessorRules.length; i++) {
                let fileName = `interfaces/transformers/${this.jobDetails.domain}/${this.jobDetails.interfaceName}/${this.jobDetails.jobName}/${_preprocessorRules[i]}`;
                //let fileName = `interfaces/transformers/${this.jobDetails.domain}/${_preprocessorRules[i]}`;
                preprocessorRules.push({ file: _preprocessorRules[i], key: fileName })
            };
        } else {
            console.log('No transformations rules defined')
        }
        return preprocessorRules;
    }

    get jobDetails() {
        return new JobDetails(_jobDetails.bucketName, _jobDetails.domain, _jobDetails.interfaceName, _jobDetails.jobName, _jobDetails.fileName, _jobDetails.sizeInKb, _jobDetails.region);
    }
    get traceFields() {
        return _traceFields;
    }

    toString() {
        return JSON.stringify({
            data: this.data,
            preprocessorRules: this.preprocessorRules,
            jobDetails: this.jobDetails,
            traceFields: this.traceFields
        })
    }

}

class JobDetails {
    constructor(bucketName, domain, interfaceName, jobName, fileName, sizeInKb, region) {
        // if (bucketName)
        this.bucketName = bucketName;
        //if (domain)
        this.domain = domain;
        // if (interfaceName)
        this.interfaceName = interfaceName;
        //  if (jobName)
        this.jobName = jobName;
        this.fileName = fileName;
        this.sizeInKb = sizeInKb;
        this.region = region;
    }
}

module.exports = RequestBo;