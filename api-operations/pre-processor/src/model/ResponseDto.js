'use strict'

let _status, _message, _data;

class ResponseDto {
    constructor(status, message, data) {
        _status = status;
        _message = message;
        _data = data;
    }

    get status() {
        return _status;
    }

    get message() {
        return _message;
    }

    get data() {
        return _data;
    }


    toString() {
        return JSON.stringify({
            status: this.status,
            message: this.message,
            data: this.data
        })
    }

    toJson() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        }
    }
}

module.exports = ResponseDto;