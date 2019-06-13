'use strict';

const GenericException = require('generic-exception').GenericException;
const ExceptionType = require('../model/ExceptionType');
const ExceptionCategory = require('../model/ExceptionCategory');
const ResponseBo = require('../model/ResponseBo');
const preprocessorDao = require('../dal/preProcessorDao');
//let jobDetails = require("./xpressmoneyuk-jobdetails.json");
//let ifConfig = require("./xpressmoneyuk.json")

class PreProcessorService {

    /**
     * performs the pre processing at file level with the object passed
     * @param {Object} requestBo
     * @description It pre processes the file using preprocessor rule file which is stored in S3 bucket.
     */
    async process(requestBo) {
        
        try {
            let preprocessorrules = requestBo.interfaceConfig.preProcessors.rules;
            console.log("11111preProcessorRules : ", preprocessorrules);
            if (preprocessorrules.length > 0){
                for (let i = 0; i < preprocessorrules.length; i++){
                    let preprocessorrulename = `interfaces/preprocessors/${requestBo.jobDetails.domain}/${requestBo.jobDetails.interfaceName}/${requestBo.jobDetails.jobName}/${preprocessorrules[i]}`;
                    let readStream = await this.readStream(requestBo.jobDetails.bucketName, preprocessorrulename);
                    console.log('22222222222', readStream)
                    let preprocessor1 = await this.evalStream(readStream.toString());
                    console.log('3333333333', preprocessor1)
                    let ruleresponse = await preprocessor1.apply(requestBo);
                    console.log('444444444', ruleresponse)
                    let jsonresponse = JSON.parse(ruleresponse)
                    console.log('555555555', jsonresponse)
                 
                    if (!jsonresponse.status){
                        let destLoc = requestBo.jobDetails.bucketName+'/'+requestBo.interfaceConfig.s3.errorObjectKey ;
                        let sourceLoc = requestBo.jobDetails.bucketName+'/'+requestBo.interfaceConfig.s3.inputObjectKey + requestBo.jobDetails.fileName ;
                        let fileKey =  requestBo.jobDetails.fileName;
                        let copyResponse = await this.copyFile(destLoc, sourceLoc, fileKey);
                        console.log('666666666', copyResponse)
                        if (copyResponse.status){
                            let delLoc = requestBo.jobDetails.bucketName; 
                            let delFile = requestBo.interfaceConfig.s3.inputObjectKey + fileKey;
                            console.log(delLoc, "delete");
                            let deleteResponse = await this.deleteFile(delLoc, delFile)
                            console.log('777777777777', deleteResponse)
                            if (deleteResponse.status == true){
                                console.log("File deleted from Original location")
                            }
                        }
                        return jsonresponse;
                    }
                }
                requestBo.isPreprocessorExecuted = true;
                console.log(requestBo)
                //invoke data processor from here.
                return {success:true}
            }else{
                console.log("No preprocessor rules defined")
                requestBo.isPreprocessorExecuted = true;
                console.log(requestBo)
                return {success:true}
            }  
           /* original code to be used after editing BO object. commented temporarily.
            let response = '';
            response = await Promise.all(requestBo.preprocessorRules.map(async rule => {
                let readStream = await this.readStream(requestBo.jobDetailss.bucketName, rule.key);
                let transformer = await this.evalStream(readStream.toString());
                return await transformer.transform(requestBo.data, requestBo.jobDetailss, null, requestBo.traceFields);
            }));
            if (response && response.length > 1 && (response.length == requestBo.preprocessorRules.length)) {
                return new ResponseBo(response[0]);
            } else {
                return new ResponseBo(response[0]);
            }
            */
        } catch (exception) {
            if (!(exception instanceof GenericException)) {
                throw new GenericException.Builder(ExceptionType.ERROR_WHILE_VALIDATION)
                    .withInspectionFields(', File row must be provided')
                    .withExceptionCategory(ExceptionCategory.VALIDATION_ERROR)
                    .withWrappedException(exception)
                    .withMessage(exception.message)
                    .build()
            } else {
                console.error('########', exception);
                throw exception;
            }
        }
    }


    async readStream(bucket, key) {
        try {
            return await preprocessorDao.getStream(bucket, key);
        } catch (ex) {
            console.error(ex);
            throw new GenericException.Builder(ExceptionType.ERROR_WHILE_READINGFILE)
                .withWrappedException(ex)
                .withMessage(ex.message)
                .build()
        }
    }

    async evalStream(stream) {
        try {
            return eval(stream);
        } catch (ex) {
            console.error(ex);
            throw new GenericException.Builder(ExceptionType.ERROR_WHILE_EVALUATING_FILE)
                .withWrappedException(ex)
                .withMessage(ex.message)
                .build()
        }
    }

    async copyFile(destLoc, sourceLoc, fileKey) {
        try {
            return await preprocessorDao.copyFile(destLoc, sourceLoc, fileKey);
        } catch (ex) {
            console.error(ex);
            throw new GenericException.Builder(ExceptionType.ERROR_WHILE_COPYINGFILE)
                .withExceptionCategory(ExceptionCategory.FILEMOVEMENT_ERROR)
                .withWrappedException(ex)
                .withMessage(ex.message)
                .build()
        }
    }

    async deleteFile(delLoc, delFile) {
        try {
            return await preprocessorDao.deleteFile(delLoc, delFile);
        } catch (ex) {
            console.error(ex);
            throw new GenericException.Builder(ExceptionType.ERROR_WHILE_DELETINGFILE)
                .withExceptionCategory(ExceptionCategory.FILEMOVEMENT_ERROR)
                .withWrappedException(ex)
                .withMessage(ex.message)
                .build()
        }
    }
}

module.exports = new PreProcessorService();