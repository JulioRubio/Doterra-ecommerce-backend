var AWS = require("aws-sdk");
var uuid = require("uuid");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";

async function updateproduct(newproduct) {
  const result = newproduct//JSON.parse(newproduct);
  const productId = result.productId;
  delete result["productId"];

  let paramsOld = {
    TableName: productsTable,
    Key: {
        "productId":productId
    }
  }
  let oldProduct =  await docClient.get(paramsOld).promise()
  console.log(oldProduct)
  
  let name 
  let desc
  if(newproduct.productName != undefined){
    name = newproduct.productName.toLowerCase()
  }else{
    name = oldProduct.Item.productName.toLowerCase()
  }

  if(newproduct.productDesc != undefined){
    desc = newproduct.productDesc.toLowerCase()
  }else{
    desc = oldProduct.Item.productDesc.toLowerCase()
  }
  name = name.replace(/ /g,"_");
  desc = desc.replace(/ /g,"_");
  

  let searchParam = name + "_" + desc;

  let updateExpression = "set";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};
  for (const property in result) {
    updateExpression += ` #${property} = :${property} ,`;
    ExpressionAttributeNames["#" + property] = property;
    ExpressionAttributeValues[":" + property] = result[property];
  }

  updateExpression += `#searchParam = :searchParam,`;
  ExpressionAttributeNames["#" + "searchParam"] = "searchParam";
  ExpressionAttributeValues[":" + "searchParam"] = searchParam;

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
