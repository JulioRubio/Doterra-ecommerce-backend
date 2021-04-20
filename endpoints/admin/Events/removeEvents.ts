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

async function removeEvents(Events) {
  console.log(Events.Events[0]);
  let result = [];

  Events.Events.forEach(async function (eventId) {
    let params = {
      TableName: eventsTable,
      Key: {
        eventId: eventId,
      },
    };
  
    result.push(await docClient.delete(params).promise());
  });

  return result;
}

module.exports = removeEvents;
