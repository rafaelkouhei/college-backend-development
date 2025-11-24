const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "caldeirao_maldito.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err)
    {
        console.error(err.message);
        throw err;
    }
    else
    {
        console.log("Conectado ao Banco de Dados SQLite");

        db.run(`CREATE TABLE IF NOT EXISTS recipes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                owner_id INTEGER NOT NULL,
                name VARCHAR NOT NULL,
                ingredients TEXT NOT NULL,
                instructions TEXT NOT NULL,
                time INTEGER
            )`, (err) => {
                if(err)
                {
                    console.error("Erro ao criar tabela 'recipes': ", err.message);
                }
                else
                {
                    const insert = 'INSERT OR IGNORE INTO recipes (id, owner_id, name, ingredients, instructions, time) VALUES (?, ?, ?, ?, ?, ?)';
                    db.run(insert, [1, 1, "Macarrão Alho e Ódio", "Meio quilo de rancor, 5 quilos de ressentimento, 5 colheres de sopa de revolta.", "...", 40]);
                    db.run(insert, [2, 1, "Feijoada à Minha Custa", "Sempre sobra pra mim", "...", 50]);
                    db.run(insert, [3, 1, "Sopa de Diarreia", "Uma colher de sopa de leite integral, duas colheres de chá de Nutella e 50 gramas leite condensado.", "...", 90]);
                }
            });

        db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR NOT NULL,
                name VARCHAR NOT NULL,
                role VARCHAR NOT NULL,
                pswd TEXT NOT NULL
            )`, (err) => {
                if(err)
                {
                    console.error("Erro ao criar tabela 'users': ", err.message);
                }
            });
    }
});

module.exports = db;