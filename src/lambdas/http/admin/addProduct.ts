import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { parseUserId } from '../../../auth/utils';

const docClient = new AWS.DynamoDB.DocumentClient()
const coursesTable = process.env.COURSES_TABLE


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newCourse = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const userId = parseUserId(jwtToken)
  
  const courseId = uuid.v4()

  const newItem = {
      courseId: courseId,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      ...newCourse
  }

  await docClient.put({
    TableName: coursesTable,
    Item: newItem
  }).promise()


  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':true
    },
    body: JSON.stringify(newItem)
  }
}