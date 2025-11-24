const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

const JWT_SECRET = "my-super-hyper-mega-secret";

// create
exports.createUser = async (req, res) => {
    const { name, email, role, pswd } = req.body;

    if (!name || !email || !role || !pswd) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const existing = await userModel.findByEmail(email);
        if (existing) {
            return res.status(400).json({ message: "Usuário já cadastrado..." });
        }

        const hashedPassword = await bcrypt.hash(pswd, 10);

        const newUser = await userModel.create(name, email, role, hashedPassword);

        return res.status(201).json(newUser);
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ message: "Erro no servidor ao criar usuário." });
    }
};

// login
exports.login = async (req, res) => {
    const { email, pswd } = req.body;

    if (!email || !pswd) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas..." });
        }

        const isValid = await bcrypt.compare(pswd, user.pswd);
        if (!isValid) {
            return res.status(401).json({ message: "Credenciais inválidas..." });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Autenticação realizada com sucesso!",
            token
        });
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        return res.status(500).json({ message: "Erro no servidor ao realizar login." });
    }
};
