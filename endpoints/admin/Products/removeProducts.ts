var AWS = require('aws-sdk')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

async function removeProducts(products) {
  console.log(products.Products[0]);
  let result = [];

  products.Products.forEach(async function (productId) {
    let params = {
      TableName: productsTable,
      Key: {
        productId: productId,
      },
    };
  
    result.push(await docClient.delete(params).promise());
  });
  return result;
}

module.exports = removeProducts;