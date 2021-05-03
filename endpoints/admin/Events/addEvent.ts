var AWS = require('aws-sdk')
const uuid = require('uuid')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

const docClient = new AWS.DynamoDB.DocumentClient();
const eventsTable = "Events";

async function addEvent (newEvent){
    const eventId = uuid.v4()

    const newItem = {
        eventId: eventId,
        ...newEvent
    }

    var params = {
      TableName: eventsTable,
      Item: newItem
    }
    console.log(AWS.config)
    console.log(params)
    
    await docClient.put(params, function(err, data){
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    })

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':true
      },
      body: JSON.stringify(eventId)
    }
}

module.exports = addEvent