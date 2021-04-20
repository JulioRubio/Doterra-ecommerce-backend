const AWS = require("aws-sdk");
const uuid = require("uuid");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const productsTable = "Products";

async function updateproduct(newproduct) {
  const result = newproduct//JSON.parse(newproduct);
  const productId = result.productId;
  delete result["productId"];
  console.log(result);

  console.log("Updating the item...");

  let updateExpression = "set";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};
  for (const property in result) {
    updateExpression += ` #${property} = :${property} ,`;
    ExpressionAttributeNames["#" + property] = property;
    ExpressionAttributeValues[":" + property] = result[property];
  }

  console.log(ExpressionAttributeNames);

  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: productsTable,
    Key: {
      productId: productId,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };

  return await docClient.update(params).promise();
}

module.exports = updateproduct;
