'use strict';

let ResponseDto = require('../model/ResponseDto');
let RequestBo = require('../model/preProcessorBo');
let ResponseBo = require('../model/ResponseBo');
let preProcessorValidator = require('./preProcessorValidator');

class PreProcessorTransformer {

    static async transformToBo(requestDto) {
        return new RequestBo(requestDto.data, requestDto.preprocessorRules, requestDto.jobDetails, requestDto.traceFields);
    }

    static async transformToDto(responseBo) {
        return new ResponseDto(responseBo.response.status, responseBo.response.message, responseBo.response.data);
    }
}

module.exports = PreProcessorTransformer;