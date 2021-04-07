import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const eventsTable = process.env.tableName2


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const eventId = event.pathParameters
    const result = await getEvent(eventId)
    
    console.log(event.pathParameters)


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: JSON.stringify(result)
    }
}

async function getEvent(eventId) {
    let params = {
        TableName: eventsTable,
        Key: eventId
    }

    const result = await docClient.get(params).promise()
  
    return result.Item
}