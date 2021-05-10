var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
 
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEYID
  });
  

var s3 = new AWS.S3();