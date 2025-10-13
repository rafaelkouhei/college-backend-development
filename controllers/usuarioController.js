// Por enquanto, nossos dados continuarão em memória aqui.
let usuarios = [
  { id: 1, nome: 'Rafael', idade: 26 },
  { id: 2, nome: 'Victor', idade: 21 },
  { id: 3, nome: 'Marcos', idade: 20 }
];
let nextId = 4;

// Função para listar todos os usuarios
exports.listarTodos = (req, res) => {
  res.json(usuarios);
};

// Função para buscar um produto por ID
exports.buscarPorId = (req, res) => {
  const idUsuario = parseInt(req.params.id);
  const usuarioEncontrado = usuarios.find(p => p.id === idUsuario);
  if (usuarioEncontrado) {
    res.json(usuarioEncontrado);
  } else {
    res.status(404).send('Usuário não encontrado.');
  }
};

// Função para criar um novo produto
exports.criar = (req, res) => {
  const { nome, idade } = req.body;
  if (!nome || idade === undefined) {
    return res.status(400).json({ message: 'Nome e idade são obrigatórios.' });
  }
  const novoUsuario = { id: nextId++, nome, idade };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

// Função para atualizar um produto
exports.atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(p => p.id === id);
  if (usuarioIndex !== -1) {
    const { nome, idade } = req.body;
    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], nome: nome || usuarios[usuarioIndex].nome, idade: idade !== undefined ? idade : usuarios[usuarioIndex].idade };
    res.json(usuarios[usuarioIndex]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
  }
};

// Função para deletar um produto
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