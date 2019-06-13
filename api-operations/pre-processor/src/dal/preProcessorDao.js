'use strict';

let AWS = require('aws-sdk');
let s3 = new AWS.S3({
    region: 'eu-west-1'
})

class PreProcessorDao {

    async getStream(bucket, file) {
        try {
            let params = { Bucket: bucket, Key: file }
            return new Promise((resolve, reject) => {
                s3.getObject(params)
                    .createReadStream()
                    .on('data', data => {
                        resolve(data);
                    })
                    .on('error', error => {
                        reject(error)
                    });
            })
        } catch (e) {
            console.log('$$$$$$$$$$$', e)
            throw e;
        }
    }

    async copyFile(destLoc, sourceLoc, fileKey ) {
        try {
            let params = { Bucket: destLoc, CopySource:sourceLoc, Key: fileKey }
            return new Promise((resolve, reject) => {
                s3.copyObject(params, (err, data)=>{
                    if (err){
                        //reject(`{msg:${err}, status:false}`)
                        reject(`Error occured while copying file : ${err}`)
                    }
                    resolve({status:true})
                })
            })
        } catch (e) {
            console.log('$$$$$$$$$$$', e)
        }
    }

    async deleteFile(deleteLoc, fileKey ) {
        try {
            let params = { Bucket: deleteLoc, Key: fileKey }
            return new Promise((resolve, reject) => {
                s3.deleteObject(params, (err, data)=>{
                    if (err){
                        //reject(`{msg:${err}, status:false}`)
                        reject(`Error occured while deleting file from original location: ${err}`)
                    }
                    resolve({status:true})
                })
            })
        } catch (e) {
            console.log('$$$$$$$$$$$', e)
        }
    }
}

module.exports = new PreProcessorDao();

