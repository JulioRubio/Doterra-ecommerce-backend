var AWS = require('aws-sdk')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

async function removeProduct(Product) {
    let params = {
      TableName: productsTable,
      Key: {
        productId: Product.productId,
      },
    };
  
    var result;
    try{
      result = await docClient.delete(params).promise();
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
        body: result
    }
    }
   
  
    return result;
  }
  
  module.exports = removeProduct;
  