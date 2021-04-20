const AWS = require('aws-sdk')
const uuid = require('uuid')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

const docClient = new AWS.DynamoDB.DocumentClient();
let productsTable = "Products";

async function addProduct (newProduct){
    const productId = uuid.v4()

    const newItem = {
        productId: productId,
        ...newProduct
    }

    var params = {
      TableName: productsTable,
      Item: newItem
    }
    console.log(AWS.config)
    console.log(params)
    return await docClient.put(params, function(err, data){
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    })
}

module.exports = addProduct