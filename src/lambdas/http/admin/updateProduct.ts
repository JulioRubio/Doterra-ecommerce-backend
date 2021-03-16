import "source-map-support/register";
import * as AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

const docClient = new AWS.DynamoDB.DocumentClient();
const productsTable = process.env.tableName;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const product = JSON.parse(event.body);
  const productId = product.productId;
  delete product["productId"];
  console.log(product);

  console.log("Updating the item...");

  let updateExpression = "set";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};
  for (const property in product) {
    updateExpression += ` #${property} = :${property} ,`;
    ExpressionAttributeNames["#" + property] = property;
    ExpressionAttributeValues[":" + property] = product[property];
  }

  console.log(ExpressionAttributeNames);

  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: productsTable,
    Key: {
      productId: productId,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };

  await docClient.update(params).promise();

  /* docClient.update(params).promise().then(result => {
       return result;
   })*/

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(product),
  };
};
