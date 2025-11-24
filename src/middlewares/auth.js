const jwt = require("jsonwebtoken");
const JWT_SECRET = "my-super-hyper-mega-secret";

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
    {
        return res.status(401).json({ message: "Acesso negado! Nenhum token fornecido..." });
    }

    try
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();
    }
    catch(error)
    {
        res.status(403).json({ message: "Token inválido ou expirado..." });
    }
};