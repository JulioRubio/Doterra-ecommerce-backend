import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const eventsTable = process.env.tableName2


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const Event = event.pathParameters
    await deleteEvent(Event)
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: JSON.stringify(Event),
    }
}

async function deleteEvent(Event) {

    let params = {
        TableName: eventsTable,
        Key:{
            "eventId": Event.eventId
        }
    }

    const result = await docClient.delete(params).promise()
  
    return result
}