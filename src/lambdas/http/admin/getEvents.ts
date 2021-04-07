import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const eventsTable = process.env.tableName2


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const events = await getEvents()
    
    console.log(event.pathParameters)


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: JSON.stringify(events)
    }
}

async function getEvents() {
    let params = {
        TableName: eventsTable,
    }

    const result = await docClient.scan(params).promise()
  
    return result.Items
}