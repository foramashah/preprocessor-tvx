const apiProcessor = require('pre-processor').apiProcessor;
//const winston_wrapper = require('winston_wrapper');
//const logger = winston_wrapper.getLogger('preprocess-preprocessor-handler')
module.exports.handle = function (event, context, callback) {
    //winston_wrapper.serverlessFunction(event, context, () => {
    console.log("Entered handler with request " + JSON.stringify(event));
    apiProcessor.process(event).then((body) => {
        console.log("Exiting with response ", body);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body)
        })
    }).catch(error => {
        console.error('Handler', error)
        callback(null, {
            statusCode: error.httpStatusCode,
            body: JSON.stringify({
                status: 'failed',
                message: error.reason || error.description,
                data: JSON.parse(event.body).data
            })
        })
    })
    // })
};
