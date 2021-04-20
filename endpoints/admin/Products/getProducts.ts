import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import {awsConfig} from '../../../config/awsConfig'

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();
let productsTable = "Products";


function getProducts (){
    
    //const products = await getProducts()
    
    //console.log(event.pathParameters)


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true
        },
        //body: JSON.stringify(products)
    }
}

async function getDBProducts() {
    let params = {
        TableName: productsTable,
    }

    const result = await docClient.scan(params).promise()
  
    return result.Items
}