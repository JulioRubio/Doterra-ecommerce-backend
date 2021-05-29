var AWS = require('aws-sdk')

require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

async function searchProducts(searchBarItem){
    
    let searchParam = searchBarItem.value.toLowerCase();
    //searchParam = searchParam.replace(/ /g,"_");
    console.log(searchParam)
    var params = {
        ExpressionAttributeValues: {
            ':searchString': searchParam
        },
        FilterExpression:"contains(searchParam, :searchString)",
        TableName: productsTable,
    }

    let data = await docClient.scan(params).promise()
    console.log(data)
    return data.Items
}

module.exports = searchProducts;


