const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const eventsTable = "Events";

const getEvents = async() => {
  let params = {
    TableName: eventsTable,
  };

  const result = await docClient.scan(params).promise();
  console.log(result.Items)
  return result.Items;
}

module.exports = getEvents;
