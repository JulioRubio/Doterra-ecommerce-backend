import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const eventsTable = process.env.tableName2


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const newEvent = JSON.parse(event.body)
  const EventId = uuid.v4()

  const newItem = {
      eventId: EventId,
      createdAt: new Date().toISOString(),
      ...newEvent
  }

  await docClient.put({
    TableName: eventsTable,
    Item: newItem
  }).promise()


  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':true
    },
    body: JSON.stringify(EventId)
  }
}

