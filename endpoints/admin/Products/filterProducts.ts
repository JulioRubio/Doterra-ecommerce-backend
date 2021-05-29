var AWS = require('aws-sdk')

require('dotenv').config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
});

var docClient = new AWS.DynamoDB.DocumentClient();
var productsTable = "Products";


async function filterProducts(filterParams){
  let minPrice = 0
  let maxPrice = 9999999

  let filterFlag = false;

  console.log(filterParams)
  let oilValue = "...."
  let skinCareValue = "...."
  let hairCareValue = "...."
  let difusorValue = "...."

  if(filterParams.minPrice != undefined){
    minPrice = Number(filterParams.minPrice)
  }

  if(filterParams.maxPrice != undefined){
    maxPrice = Number(filterParams.maxPrice)
  }

  if(filterParams.Oil != undefined){
    oilValue = "Oil"
    filterFlag = true
  }

  if(filterParams.SkinCare != undefined){
    skinCareValue = "SkinCare"
    filterFlag = true
  }

  if(filterParams.HairCare != undefined){
    hairCareValue = "HairCare"
    filterFlag = true
  }

  if(filterParams.Difusor != undefined){
    difusorValue = "Difusor"
    filterFlag = true
  }


  if(!filterFlag){
    oilValue = "Oil"
    skinCareValue = "SkinCare"
    hairCareValue = "HairCare"
    difusorValue = "Difusor"
  }
  var params = {
    ExpressionAttributeValues: {
        ':minPrice': minPrice,
        ':maxPrice': maxPrice,
        ':Oil': oilValue,
        ':SkinCare': skinCareValue,
        ':HairCare': hairCareValue,
        ':Difusor': difusorValue
    },
    FilterExpression: "productPrice BETWEEN :minPrice AND :maxPrice AND (contains(productType, :Oil) OR contains(productType, :SkinCare) OR contains(productType, :HairCare) OR contains(productType, :Difusor)) ",
    TableName: productsTable,
  }

  let data = await docClient.scan(params).promise()
  console.log(data)
  return data.Items

}



module.exports = filterProducts;

//"contains(productType, :Oil) OR contains(productType, :SkinCare) OR contains(productType, :HairCare) OR contains(productType, :Difusor)"