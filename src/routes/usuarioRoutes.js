const express = require('express');
const router = express.Router();

// Importamos o nosso controller
const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.login);

// Rota para criar um novo usuário (Cadastro)
// POST /api/usuarios
router.post('/', usuarioController.criarUsuario);

// Rota para autenticar um usuário (Login)
// POST /api/usuarios/login
router.post('/login', usuarioController.login);

const { verificaToken } = require('../middlewares/auth')

// Definimos as rotas e associamos às funções do controller
router.get('/', verificaToken, usuarioController.listarTodos);
router.get('/:id', verificaToken, usuarioController.buscarPorId);
router.post('/', verificaToken, usuarioController.criar);
router.put('/:id', verificaToken, usuarioController.atualizar);
router.delete('/:id', verificaToken, usuarioController.deletar);

module.exports = router;