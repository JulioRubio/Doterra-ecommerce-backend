const AWS = require("aws-sdk");
const uuid = require("uuid");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const pedidosTable = "Pedidos";

async function removePedidos(Pedidos) {
  console.log(Pedidos.Pedidos[0]);
  let result = [];

  Pedidos.Pedidos.forEach(async function (pedidoId) {
    let params = {
      TableName: pedidosTable,
      Key: {
        pedidoId: pedidoId,
      },
    };
  
    result.push(await docClient.delete(params).promise());
  });

  return result;
}

module.exports = removePedidos;
