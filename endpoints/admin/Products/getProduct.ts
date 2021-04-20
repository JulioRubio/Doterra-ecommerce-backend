var AWS = require('aws-sdk')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

 async function getProduct (productId){
    const product =  await getDBProduct(productId)
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: product
    }
}

 async function getDBProduct(productId) {
    let params = {
        TableName: productsTable,
        Key: {
            "productId":productId
        }
    }
    const result =  await docClient.get(params).promise()
    return result.Item
}

module.exports = getProduct;