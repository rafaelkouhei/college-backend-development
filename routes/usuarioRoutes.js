const express = require('express');
const router = express.Router();

// Importamos o nosso controller
const usuarioController = require('../controllers/usuarioController');

// Definimos as rotas e associamos às funções do controller
router.get('/', usuarioController.listarTodos);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', usuarioController.criar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.deletar);

module.exports = router;