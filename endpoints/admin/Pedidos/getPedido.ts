const AWS = require('aws-sdk')
const uuid = require('uuid')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

const docClient = new AWS.DynamoDB.DocumentClient();
const pedidosTable = "Pedidos";

async function getPedido(pedidoId) {
    let params = {
        TableName: pedidosTable,
        Key: pedidoId
    }

    const result = await docClient.get(params).promise()
  
    return result.Item
}

module.exports = getPedido