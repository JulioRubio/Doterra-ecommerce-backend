var AWS = require('aws-sdk')
var uuid = require('uuid')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

async  function addProduct (newProduct){
    const productId = uuid.v4()

    const newItem = {
        productId: productId,
        ...newProduct
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

module.exports = addProduct