const recipeModel = require("../models/recipes");

exports.canModify = async (req, res, next) => {
    const recipeId = Number(req.params.id);

    if (isNaN(recipeId)) {
        return res.status(400).json({ message: "ID inválido." });
    }

    try {
        const recipe = await recipeModel.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Receita não encontrada..." });
        }

        if (req.user.role === "admin") {
            return next();
        }

        if (recipe.owner_id === req.user.id) {
            return next();
        }

        return res.status(403).json({
            message: "Você não tem permissão para alterar ou excluir esta receita."
        });

    } catch (err) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};
