import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const docClient = new AWS.DynamoDB.DocumentClient()
const productsTable = process.env.tableName


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const newProduct = JSON.parse(event.body)
  const productId = uuid.v4()

  const newItem = {
      productId: productId,
      createdAt: new Date().toISOString(),
      ...newProduct
  }

  await docClient.put({
    TableName: productsTable,
    Item: newItem
  }).promise()


  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':true
    },
    body: JSON.stringify(productId)
  }
}

