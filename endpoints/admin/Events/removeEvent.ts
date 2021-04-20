const AWS = require("aws-sdk");
const uuid = require("uuid");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const eventsTable = "Events";

async function removeEvent(Event) {
  console.log(Event)
  let params = {
    TableName: eventsTable,
    Key: {
      eventId: Event.eventId,
    },
  };

  const result = await docClient.delete(params).promise();

  return result;
}

module.exports = removeEvent;
