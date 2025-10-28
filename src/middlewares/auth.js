const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-secreto'; // O mesmo segredo usado no controller

exports.verificaToken = (req, res, next) => {
  // O token geralmente é enviado no header 'Authorization' no formato 'Bearer TOKEN'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  try {
    // Verifica se o token é válido usando nosso segredo
    const decoded = jwt.verify(token, JWT_SECRET);

    // Adiciona os dados do usuário (payload do token) ao objeto `req`
    // para que as rotas protegidas possam usá-los
    req.usuario = decoded;

    next(); // Se o token for válido, permite que a requisição continue para o controller
  } catch (error) {
    res.status(403).json({ message: "Token inválido ou expirado." }); // 403 Forbidden
  }
};