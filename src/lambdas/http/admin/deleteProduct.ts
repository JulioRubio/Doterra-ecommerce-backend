import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const productsTable = process.env.tableName


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const product = event.pathParameters
    await deleteProduct(product)
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        body: JSON.stringify(product),
    }
}

async function deleteProduct(product) {

    let params = {
        TableName: productsTable,
        Key:{
            "productId": product.productId
        }
    }

    const result = await docClient.delete(params).promise()
  
    return result
}