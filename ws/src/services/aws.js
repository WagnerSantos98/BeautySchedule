const AWS = require('aws-sdk');

module.exports = {
    IAM_USER_KEY: 'AKIAXARWLHOPSCLDLO32',
    IAM_USER_SECRET: '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',
    BUCKET_NAME: 'us-east-1',
    AWS_REGION:'beauty-schedule-dev',

    uploadToS3: function (file, filename, acl = 'public-read') {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME,
            });

            s3bucket.createBucket(function(){
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: filename,
                    Body: file.data,
                    ACL: acl,
                };

                s3bucket.upload(params, function(err, data){
                    if(err){
                        console.error(err);
                        return resolve({ error: true, message: err});
                    }
                    console.log(data);
                    return resolve({ error: false, message: data});
                });
            });
        });
    },
    deleteFileS3: function(key){
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;

            let s3buckets = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME,
            });

            s3buckets.createBucket(function(){
                s3buckets.deleteObject(
                    {
                    Bucket: BUCKET_NAME,
                    Key: key,
                    },
                    function(err, data){
                        if (err) {
                            console.error(err);
                            return resolve({ error: true, message: err });
                        }
                        console.error(data);
                        return resolve({ error: false, message: data });
                    }
                );
            });
        });
    }

};