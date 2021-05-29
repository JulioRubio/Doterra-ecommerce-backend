var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
 
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEYID
  });
  
var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "productImages"; 

var s3 = new AWS.S3();
 

async function linkImageToProductId(paramId, productImage) {
    let productId = paramId.body.productId

    const newItem = {
        productId: productId,
        productImage: productImage
    }
    
    var params = {
        TableName: productsTable,
        Item: newItem
    }

    var result;
    try{
        result = await docClient.put(params).promise()
      }catch{
        return {
          statusCode: 400,
          headers: {
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Credentials':true
          },
          body: "No se pudo"
      }
      }finally{
        return {
          statusCode: 200,
          headers: {
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Credentials':true
          },
          body: newItem
      }
    }

}

module.exports = linkImageToProductId;