const recipeModel = require("../models/recipes");

exports.listAll = async (req, res) => {
    try
    {
        const recipes = await recipeModel.findAll();
        res.json(recipes);
    }
    catch(err)
    {
        res.status(500).json({ message: "Erro no servidor ao buscar receitas..." });
    }
};

exports.searchById = async (req, res) => {
    const id = parseInt(req.params.id);
    try
    {
        const recipe = await recipeModel.findById(id);
        if(recipe)
        {
            res.json(recipe);
        }
        else
        {
            res.status(404).json({ message: "Receita não encontrada..." });
        }
    }
    catch(err)
    {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

exports.add = async (req, res) => {
    const { name, ingredients, instructions, time } = req.body;

    if(!name || !ingredients || !instructions || !time)
    {
        return res.status(400).json({ message: "Os campos são obrigatórios!" });
    }

    try
    {
        const newRecipe = await recipeModel.add(req.user.id, name, ingredients, instructions, time);
        res.status(201).json(newRecipe);
    }
    catch(err)
    {
        res.status(500).json({ message: "Erro no servidor ao criar receita..." });
    }

};

exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, ingredients, instructions, time } = req.body;

    if (!name || !ingredients || !instructions || !time) {
        return res.status(400).json({ message: 'Os campos são obrigatórios!' });
    }

    try {
        const result = await recipeModel.update(id, name, ingredients, instructions, time);
        if (result.changes > 0) {
            res.json({ id, name, ingredients, instructions, time });
        } else {
            res.status(404).json({ message: 'Receita não encontrada para atualização' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor ao atualizar receita" });
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);

    try
    {
        const result = await recipeModel.delete(id);
        if(result.changes > 0)
        {
            res.status(204).send();
        }
        else
        {
            res.status(404).json({ message: "Receita não encontrada..." });
        }
    }
    catch(err)
    {
        res.status(500).json({ message: "Erro no servidor ao deletar receita" });
    }
};