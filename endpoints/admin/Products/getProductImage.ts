var AWS = require('aws-sdk')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "productImages";

 async function getProductImage (productId){
    const product =  await getDBProductImage(productId)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: product
    }
}

 async function getDBProductImage(productId) {
     console.log(productId)
    var params = {
        ExpressionAttributeValues: {
            ':productId': productId
        },
        FilterExpression:"contains(productId, :productId)",
        TableName: productsTable,
    }

    let data = await docClient.scan(params).promise()
    return data.Items
}

module.exports = getProductImage;