'use strict'

let _response;

class ResponseBo {
    constructor(response) {
        _response = response;
    }

    get response() {
        return _response;
    }
    toString() {
        return JSON.stringify({
            response: this.response
        })
    }

    toJson() {
        return {
            response: this.response
        }
    }
}

module.exports = ResponseBo;