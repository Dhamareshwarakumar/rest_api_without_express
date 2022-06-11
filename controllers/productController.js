const Product = require('../models/productModel');
const { getPostData } = require('../utils');


// @Des     Get all products
// @route   /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();


        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(products));
        res.end();
    } catch (error) {
        console.log(error);
    }
}


// @Des     Get Specific product
// @route   /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            not_found(req, res);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(product));
            res.end();
        }

    } catch (error) {
        console.log(`get Product Id ERROR:` + error);
    }
}


// @Des     create a product
// @route   POST /api/products/
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newProduct));

    } catch (error) {
        console.log(error);
    }
}

// @Des     Update a product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            not_found(req, res);
        } else {
            const body = await getPostData(req);

            const { title, description, price } = JSON.parse(body);

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.description
            };

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updProduct));
        }

    } catch (error) {
        console.log(error);
    }
}

// @Des     Delete a product
// @route   DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            not_found(req, res);
        } else {
            await Product.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: `Product ${id} removed` }));
            res.end();
        }

    } catch (error) {
        console.log(error);
    }
}

function not_found(req, res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
        { message: 'Page Not Found' },
        { suggestion: 'Please Visit product api (/api/products)' }
    ]));
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    not_found
}