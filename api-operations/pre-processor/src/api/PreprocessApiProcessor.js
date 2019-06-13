'use strict';

const GenericException = require('generic-exception').GenericException;
const RequestDto = require('../model/preProcessorDto');
const preProcessorService = require('../service/preProcessorService');
const BoDtoTransformer = require('../transformer/preProcessorTransformer');

const ExceptionType = require('../model/ExceptionType');

class PreprocessApiProcessor {
    async process(event) {
        try {
            if (event.body) {
                event = JSON.parse(event.body)
            }
            //const requestDto = new RequestDto(event.data, event.preprocessorRules, event.jobDetail, event.traceFields);
            //const requestBo = await BoDtoTransformer.transformToBo(requestDto);
            //const responseBo = await preProcessorService.process(requestBo);
            const responseBo = await preProcessorService.process(event);
            //const responseDto = await BoDtoTransformer.transformToDto(responseBo);
            //return responseDto.toJson();
            return responseBo;

        } catch (exception) {
            console.error(`Error occurred:  ${exception.message}`);
            if (!(exception instanceof GenericException)) {
                throw new GenericException.Builder(ExceptionType.UNKNOWN_ERROR)
                    .withWrappedException(exception)
                    .withMessage(exception.message)
                    .build();
            } else {
                console.error(exception.toString())
                throw exception;
            }
        }
    }
}
  
module.exports = new PreprocessApiProcessor();