var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
 
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEYID
  });
  

var s3 = new AWS.S3();

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "productImages"; 


async function deleteProductImage(keyPath){
  let keyStartingPoint = keyPath.productImage.indexOf("imagenesProductos");
  let key = keyPath.productImage.substr(keyStartingPoint);


  console.log(keyPath.productImage)
  var params = {
    TableName : productsTable,
    Key:{
      "productImage" : keyPath.productImage
    },
    ConditionExpression: "productImage = :url",
    ExpressionAttributeValues: {
        ":url": keyPath.productImage
    }
  };

  docClient.delete(params, function(err, data) {
    if (err) {
        console.error("No se pudo borrar imágen. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Imagen borrada:", JSON.stringify(data, null, 2));
    }
  });

  return s3.deleteObject({ Bucket: process.env.BUCKET, Key: key }).promise()
}

module.exports = deleteProductImage;
