const express = require('express');
const app = express();
const PORTA = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Importamos o nosso arquivo de rotas
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Usamos o roteador na nossa aplicação, definindo um prefixo
// Todas as rotas em 'produtoRoutes' terão '/api/produtos' antes
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Produtos e Usuários funcionando!');
});

// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});