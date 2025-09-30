const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para parar o servidor, pressione Ctrl + C no terminal.');
});