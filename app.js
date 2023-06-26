const express = require('express')
const app = express()
const {products} = require('./data') 


app.get('/', (req, res) => {
    //res.json(products)
    res.send('<h1>Home page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
    //res.json(products) sends back all products
    const newProducts = products.map((product)=> {
        //destructure, use brackets to destructure the object
        const {id, name, image} = product;
        return{id, name, image};
    })

    res.json(newProducts)

})

app.get('/api/products/:productID', (req, res) => {
    //console.log(req);
    //console.log(req.params)
    const {productID} = req.params;

    const singleProduct = products.find((product) => 
    product.id === Number(productID))

    if (!singleProduct) {
        return res.status(404).send('Product does not exist')
    }
    res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res)=> {
    console.log(req.params)
    res.send('hello world')
})

app.get('/api/v1/query', (req, res)=> {
    //console.log(req.query);
    const {search, limit} = req.query
    let sortedProducts = [...products]
    

    if (search) {
        sortedProducts = sortedProducts.filter((product)=> {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    //res.status(200).json(sortedProducts)

    if (sortedProducts.length < 1) {
        //res.status(200).send('no products matched your search')
        return res.status(200).json({ success: true, data:[]})
    }
    return res.status(200).json(sortedProducts)
})


app.listen(5003, () => {
    console.log('Server is listening on port 5003... ')
})


//try this in browser window
//http://localhost:5003/api/v1/query?limit=3
//try changing the limit
//try taking  away ?limit= after query
//try passing in ?limitabc
// try query?search=a&limit=1



