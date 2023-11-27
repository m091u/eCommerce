const router = require("express").Router();
const Product = require("../models/Product.model");
const axios = require('axios');

// ADMIN ONLY 
  // POST /api/products  -  Creates a new product
  // DELETE  /api/products/:productId  -  Deletes a specific product by id
  // PUT  /api/product/:productId  -  Updates a specific product by id


//  GET /api/products/:productId -  Retrieves a specific products by id
router.get('/products/productId', (req, res)=> {
    const{ productId } = req.params;

    Product.findById(productId)
    .then((product)=> {
        if (!product){
            return res.status(404).json('Product not found!')
        }
        res.status(200).json(product)
    })
    .catch(error => res.json(error));
})

// GET /api/products -  Retrieves all products
// router.get('/products', (req,res)=> {

//     Product.find()
//     .then(allProducts => res.status(200).json(allProducts))
//     .catch(err => res.json(err));
// });

// Route to fetch data from Perenual API
// const url = `https://perenual.com/api/species-list?key=sk-IlTF6568b08d08e193107`;
const url = `https://fakestoreapi.com/products/category/jewelery`;


router.get('/products', async (req,res)=> {
    try {
       // Make a request to Perenual API
    const response = await axios.get(url); 
    
     // Extract data from response
     const products = response.data.map((item) => ({
        // id: item.id,
        // name: item.common_name,
        // image: item.default_image.original_url,

        // id: item.id,
        name: item.title,
        image: item.image,
        // Add other properties as needed
    }));

    // Send the products to the client
    res.json(products);
} catch(error){
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
})

module.exports = router;