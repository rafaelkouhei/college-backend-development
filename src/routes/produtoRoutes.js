const express = require('express');
const router = express.Router();

// Importamos o nosso controller
const produtoController = require('../controllers/produtoController');

// Definimos as rotas e associamos às funções do controller
router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;