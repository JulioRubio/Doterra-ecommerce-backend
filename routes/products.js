var express = require('express')
var addProduct = require('../endpoints/admin/Products/addProduct.ts')
var getProduct = require('../endpoints/admin/Products/getProduct.ts')
var getProducts = require('../endpoints/admin/Products/getProducts.ts')
var updateProduct = require('../endpoints/admin/Products/updateProduct.ts')
var removeProduct = require('../endpoints/admin/Products/removeProduct.ts')
var removeProducts = require('../endpoints/admin/Products/removeProducts.ts')
var deleteProductImage = require('../endpoints/admin/Products/deleteProductImage.ts')
var upload = require('../endpoints/admin/Products/addProductImage.ts')
var query = require('../endpoints/admin/Products/searchProducts.ts')
var filter = require('../endpoints/admin/Products/filterProducts.ts')
var linkProductImage = require('../endpoints/admin/Products/linkProductImage.ts')
var getProductImage = require('../endpoints/admin/Products/getProductImage.ts')
var unlinkProductImage = require('../endpoints/admin/Products/unlinkProductImage.ts')

const singleUpload = upload.single('image');

const router = express.Router()

router.get('/getProduct/:productId', async(req,res) => {
    let product;
    let productImage;
    let productBody;
    try{
        product = await getProduct(req.params.productId);
    }catch{

    }finally{
        try{
            productImage = await getProductImage(req.params.productId);
        }catch{
            //res.send(product);
        }finally{
            product.body.productImages = []
            for(let i = 0; i < productImage.body.length; i++){
                product.body.productImages[i] = productImage.body[i].productImage
            }
            res.send(product)
        }
    }
});

router.get('/getProducts', async (req,res) => {
    let products;
    try{
         products = await getProducts()
    }catch(err){

    }finally{
        for(let i = 0; i < products.body.Count; i++){
            products.body.Items[i].productImages = []
            try{

                let productImage = await getProductImage( products.body.Items[i].productId)
                products.body.Items[i].productImages = productImage.body[0].productImage
            }catch{

            }
        }
        res.send(products)
    }
});

router.post('/addProduct', async(req,res) => {
    let newProduct;
    let image;
    try{
        newProduct = await addProduct(req.body);
    }catch{

    }finally{  
        for(let i = 0; i < req.body.productImages.length; i++){
            try{
                console.log(req.body.productImages[i])
                image = await linkProductImage(newProduct, req.body.productImages[i])
                console.log(image)
            }catch{

            }
        }
        res.send(newProduct);
    }
});

router.post('/linkProductImage', async(req,res) => {
    try{
        await linkProductImage(req.body.productId, req.body.productImage)
    }catch{
        res.status(400).send("error ligando imágen")
    }finally{
        res.status(200).send(`imagen: ${req.body.productImage} ligada`)
    }
});

router.post('/addProductImage', function(req,res){
    console.log(req)
    singleUpload(req,res,function(err){
        if(err){
            return res.status(400).send({errors: [{title: "Error subiendo archivo", detail: err.message}] });
        }
        return res.json({'imageUrl': req.file.location});
    });
});

router.delete('/deleteProductImage', async(req,res) => {
    let result
    try{
        result = await deleteProductImage(req.body);
        
    }catch{

    }
    finally{
        try{
            await unlinkProductImage(req.body)
        }catch{

        }
        res.send(result)
    }
});

router.put('/updateProduct', async(req,res) => {
    try {
        console.log(req.body)
        const result = await updateProduct(req.body)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.put('/updateProductImage', async(req,res) => {
    try{
        await linkProductImage(req, req.body.productImage);
        return res.status(200).send("Imagen agregada")
    }catch{

    }
});

router.delete('/deleteProduct/:productId', async (req, res) => {
    try {
        const result = await removeProduct(req.params)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.delete('/deleteProducts', async (req, res) => {
    try {
        let result = await removeProducts(req.body)
        res.send(result);
    } catch (error) {
        res.status(500).json({ err: 'Something went wrong'});
    }
    finally{
        let productImages;
        req.body.Products.forEach(async function (productId) {
            try{
                productImages = await getProductImage(productId)
            }catch{
                console.log("no productImage")
            }finally{
                productImages.body.forEach(async element => {
                    try{
                        let jsonObject = {
                            "productImage":element.productImage
                        }
                        await deleteProductImage(jsonObject)
                        
                    }catch{
                        console.log("error deleting")
                    }
                    try{
                            await unlinkProductImage(element)
                    }catch{
                        console.log("err")
                    }
                });
            res.status(200).send()
            }
        });
    }
});

router.get('/searchProduct', async (req,res) => {
    let queryResult;
    try{
        queryResult = await query(req.body)
        res.send(queryResult)
    }catch{

    }
});

router.get('/filterProducts', async (req,res) =>{
    let filterItems;
    try{
        filterItems = await filter(req.body)
        res.send(filterItems)
    }
    catch{

    }
});

module.exports = router;


