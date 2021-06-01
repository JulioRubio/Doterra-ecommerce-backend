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
  let filterExp = `productPrice BETWEEN :minPrice AND :maxPrice`
  let expAttr = {}


  if(filterParams.minPrice != undefined){
    minPrice = Number(filterParams.minPrice)
    expAttr[":" + "minPrice"] = filterParams.minPrice;
  }else{
    expAttr[":" + "minPrice"] = minPrice;
  }

  if(filterParams.maxPrice != undefined){
    maxPrice = Number(filterParams.maxPrice)
    expAttr[":" + "maxPrice"] = filterParams.maxPrice;
  }else{
    expAttr[":" + "maxPrice"] = maxPrice;
  }

  
  let contains = true
  let secondFlag = false

  for (const property in filterParams) {

    if(property != "minPrice" && property != "maxPrice"){
      if(contains){
        filterExp += ` AND (`
        contains = false
      }
      if (secondFlag){
        filterExp += ` OR `
      }
      if (filterParams.hasOwnProperty(property)) {
        filterExp += `contains (productCategory, :${filterParams[property]})`
      }
  
      secondFlag = true

      expAttr[":" + property] = filterParams[property];
    }
  }

  if(!contains){
    filterExp += ")"
  }

  console.log(expAttr)
  console.log(filterExp)
  var params = {
    ExpressionAttributeValues: expAttr,
    FilterExpression: filterExp,
    TableName: productsTable,
  }

  let data = await docClient.scan(params).promise()
  console.log(data)
  return data.Items
}



module.exports = filterProducts;

//"contains(productType, :Oil) OR contains(productType, :SkinCare) OR contains(productType, :HairCare) OR contains(productType, :Difusor)"
