import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import {awsConfig} from '../../../config/awsConfig'

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();
let productsTable = "Products";


function getProduct (Event){
    
    //const productId = event.pathParameters
    //const product = await getProduct(productId)
    

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        //body: JSON.stringify(product)
    }
}

async function getDBProduct(productId) {
    let params = {
        TableName: productsTable,
        Key: productId
    }

    const result = await docClient.get(params).promise()
  
    return result.Item
}

module.exports.getProduct = getProduct;