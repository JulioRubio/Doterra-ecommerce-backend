import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import {awsConfig} from '../config/awsConfig'

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();
let productsTable = "Products";

export default class ProductService(){

    async addProduct(product){
        const productId = uuid.v4();
    }
}
