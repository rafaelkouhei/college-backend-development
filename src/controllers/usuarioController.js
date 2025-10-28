const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Vamos usar um segredo para nosso token. Em um projeto real, isso estaria em um arquivo .env!
const JWT_SECRET = 'seu-segredo-super-secreto';

// Função para CRIAR um novo usuário (Rota de Cadastro)
exports.criarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se o email já existe
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email já cadastrado." });
  }

  // Criptografa a senha ANTES de salvar
  const senhaCriptografada = bcrypt.hashSync(senha, 10); // O 10 é o "salt rounds"

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: senhaCriptografada // Salvamos a senha já criptografada!
  };

  usuarios.push(novoUsuario);

  // Não retornamos a senha na resposta
  const { senha: _, ...usuarioSemSenha } = novoUsuario;
  res.status(201).json(usuarioSemSenha);
};

// Função de LOGIN
exports.login = (req, res) => {
  const { email, senha } = req.body;

  // 1. Encontrar o usuário pelo email
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ message: "Credenciais inválidas." }); // 401 Unauthorized
  }

  // 2. Comparar a senha enviada com a senha criptografada no "banco"
  const senhaValida = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  // 3. Se tudo estiver correto, gerar o Token JWT
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome }, // Payload: dados que queremos guardar no token
    JWT_SECRET, // Nosso segredo
    { expiresIn: '1h' } // Opções, como o tempo de expiração
  );

  // 4. Enviar o token para o cliente
  res.status(200).json({
    message: "Login bem-sucedido!",
    token: token
  });
};

// Por enquanto, nossos dados continuarão em memória aqui.
let usuarios = [
  { id: 1, nome: 'Rafael', email: 'rafael@senai.org', senha: '' },
  { id: 2, nome: 'Victor', email: 'victor@senai.org', senha: '' },
  { id: 3, nome: 'Marcos', email: 'marcos@senai.org', senha: '' }
];
let nextId = 4;

// Função para listar todos os usuarios
exports.listarTodos = (req, res) => {
  res.json(usuarios);
};

// Função para buscar um usuário por ID
exports.buscarPorId = (req, res) => {
  const idUsuario = parseInt(req.params.id);
  const usuarioEncontrado = usuarios.find(p => p.id === idUsuario);
  if (usuarioEncontrado) {
    res.json(usuarioEncontrado);
  } else {
    res.status(404).send('Usuário não encontrado.');
  }
};

// Função para criar um novo usuário
exports.criar = (req, res) => {
  const { nome, email } = req.body;
  if (!nome || email === undefined) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
  }
  const novoUsuario = { id: nextId++, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

// Função para atualizar um usuário
exports.atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(p => p.id === id);
  if (usuarioIndex !== -1) {
    const { nome, email } = req.body;
    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], nome: nome || usuarios[usuarioIndex].nome, email: email !== undefined ? email : usuarios[usuarioIndex].email };
    res.json(usuarios[usuarioIndex]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
  }
};

// Função para deletar um usuário
exports.deletar = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = usuarios.length;
  usuarios = usuarios.filter(p => p.id !== id);
  if (usuarios.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
  }
};