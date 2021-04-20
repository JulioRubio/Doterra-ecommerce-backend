import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import {awsConfig} from '../../../config/awsConfig'

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();
let productsTable = "Products";

function removeProduct (){
    
    //const product = event.pathParameters
    //await deleteProduct(product)
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        //body: JSON.stringify(product),
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