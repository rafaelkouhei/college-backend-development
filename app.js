require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// CRUD
// C - Create (POST)
// R - Read (GET)
// U - Update (PUT / PATCH)
// D - Delete (DELETE)

let products = [
    {id: 1, name: "Mechanical Keyboard", price: 450.00},
    {id: 2, name: "Gaming Mice", price: 150.00},
    {id: 3, name: "Ultra Wide Screen", price: 1200.00},
]

let nextId = 4;

const app = express();
const PORT = 3000;

// POST
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

// +++----------------------------------------------------------------------------------------------------------------------------+++ //

// const users = [
//     {id: 1, email: "admin@app.com", passwordhash: "", role: "admin"},
//     {id: 2, email: "user@app.com", passwordhash: "", role: "user"}
// ]

// const verifyToken = (req, res, next) => {
//     const authenticator = req.headers["authorization"];
//     const token = authenticator && authenticator.split(" ")[1];
// }

// if(!token)
// {
//     return res.status(401).json({
//         message: "Acesso negado. Token não fornecido."
//     })
// }

// try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// } catch(err) {
//     return res.status(403)
// }