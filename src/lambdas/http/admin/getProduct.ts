import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const productsTable = process.env.tableName


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const productId = event.pathParameters
    const product = await getProduct(productId)
    
    console.log(event.pathParameters)


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: JSON.stringify(product)
    }
}

async function getProduct(productId) {
    let params = {
        TableName: productsTable,
        Key: productId
    }

    const result = await docClient.get(params).promise()
  
    return result.Item
}