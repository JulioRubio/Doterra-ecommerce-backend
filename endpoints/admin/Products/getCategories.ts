var AWS = require('aws-sdk')
require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var categoriesTable = "Categories";

async function getCategories (){
    
    let params = {
        TableName: categoriesTable,
    }

    var result;
    
    try{result = await docClient.scan(params).promise()}
    catch{
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
            },
            body: "No se pudo"
        }
    }
    finally{
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
            },
            body: result
        }
    }
}

 async function getDBCategories() {
    let params = {
        TableName: categoriesTable,
    }

    const result =  await docClient.scan(params).promise()
    console.log(result)
    return result.Items
}

module.exports = getDBCategories;