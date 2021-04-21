const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const pedidosTable = "Pedidos";

const getPedidos = async() => {
  let params = {
    TableName: pedidosTable,
  };

  const result = await docClient.scan(params).promise();
  console.log(result.Items)
  return result.Items;
}

module.exports = getPedidos;
