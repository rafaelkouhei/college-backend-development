const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "meu_banco.db"

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err)
    {
        console.error(err.message);
        throw err;
    }
    else
    {
        console.log("Conectando ao banco de dados SQLite")
        db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(100) NOT NULL, preco REAL NOT NULL)"),
        (err) => {
            if(err)
            {
                console.error("Erro ao criar tabela 'produto'");
            }
            else
            {
                const insert = "INSERT OR IGNORE INTO produtos (id, nome, preco) VALUES (?, ?, ?)";
                db.run(insert, [1, "Teclado Mecânico", 450.00]);
            }
        }

    }
})