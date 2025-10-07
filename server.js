const express = require('express');
const app = express();
const PORT = 3000;
require("dotenv").config();
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

let products = [
    {id: 1, name: "Mechanical Keyboard", price: 450.00},
    {id: 2, name: "Gaming Mice", price: 150.00},
    {id: 3, name: "Ultra Wide Screen", price: 1200.00},
]
let nextId = 4;

app.get('/', (req, res) => {
    res.send('Bem-vindo à primeira API back-end com Express!')
})

app.get('/about', (req, res) => {
    res.send("Our group's name is Guitar Cross Overfact!")
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para parar o servidor, pressione Ctrl + C no terminal.');
});

// CREATE
app.post("/api/products", (req, res) => {
    const {name, price} = req.body;

    if(!name || price === undefined){
        return res.status(400).json({message: "Name and Price are required!"});
    }

    const newProduct = {
        id: nextId++,
        name,
        price
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// UPDATE
app.post("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.Id === id);

    if(productIndex !== -1){
        const {name, price} = req.body;
    }
    if(!name && price === undefined){
        return res.status(400).json({message: "At least one field "})
    }


})