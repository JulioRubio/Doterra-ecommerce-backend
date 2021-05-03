var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
 
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEYID
  });
  

var s3 = new AWS.S3();
 

//TODO: Hacer esto pero seguro
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'doterra-app',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "Test metadata"});
    },
    key: function (req, file, cb) {
      cb(null, "imagenesProductos/"+Date.now().toString())
    }
  })
})

module.exports = upload;
 