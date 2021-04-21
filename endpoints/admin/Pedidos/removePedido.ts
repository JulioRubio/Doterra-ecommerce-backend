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

async function removePedido(Pedido) {
  console.log(Pedido)
  let params = {
    TableName: pedidosTable,
    Key: {
      pedidoId: Pedido.pedidoId,
    },
  };

  const result = await docClient.delete(params).promise();

  return result;
}

module.exports = removePedido;
