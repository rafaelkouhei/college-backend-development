const express = require('express');

const app = express();

const PORT = 3000;

const prod = [
    {id: 1, name: 'banana', price: 5.00},
    {id: 2, name: 'apple', price: 6.00},
    {id: 3, name: 'grape', price: 10.00}
]

app.get('/', (req, res) => {
    res.send('Bem-vindo à primeira API back-end com Express!')
})

app.get('/sobre', (req, res) => {
    res.send("Our group's name is Guitar Cross Overfact!")
})

app.get('/fruits', (req, res) => {
    res.json(prod)
})

// Mais 4 rotas: 1 matriz e 3 filiais de uma empresa de Plano de Saúde, os procedimentos autorizados para executar (consulta, cirurgia) em JSON com nomes e valores
// Conta da Netflix com dependentes

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para parar o servidor, pressione Ctrl + C no terminal.');
});