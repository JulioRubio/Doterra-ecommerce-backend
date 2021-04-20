const AWS = require('aws-sdk')
const uuid = require('uuid')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

const docClient = new AWS.DynamoDB.DocumentClient();
const eventsTable = "Events";

async function getEvent(eventId) {
    let params = {
        TableName: eventsTable,
        Key: eventId
    }

    const result = await docClient.get(params).promise()
  
    return result.Item
}

module.exports = getEvent