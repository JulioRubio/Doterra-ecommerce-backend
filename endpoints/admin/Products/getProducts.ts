var AWS = require('aws-sdk')
require('dotenv').config();

//
AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

async function getProducts (){
    let params = {
        TableName: productsTable,
    }

    var result;
    
    try{result = await docClient.scan(params).promise()}
    catch{
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
            },
            body: "No se pudo"
        }
    }
    finally{
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
            },
            body: result
        }
    }
}

 async function getDBProducts() {
    let params = {
        TableName: productsTable,
    }

    const result =  await docClient.scan(params).promise()
    return result.Items
}

module.exports = getProducts;