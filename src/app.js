// server config
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

// root route
app.get("/", (req, res) => {
    res.send("Welcome to my Server!");
});

// about route
app.get("/about", (req, res) => {
    res.send("GUITAR CROSS OVERFACT!!!<br>Equipe composta por: Cristoffer, Gustavo, Marcos, Rafael e Victor");
});

app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});