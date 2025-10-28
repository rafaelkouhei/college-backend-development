const db = require("../database.js");

const produtoModel = 
{
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM produtos", [], (err, rows) => {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(rows);
                }
            })
        })
    },

    findByID: () => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(err);
                }
            })
        })
    },

    create: (nome, preco) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO produtos (nome, preco) VALUES(?, ?)", [nome, preco], function (err) {
                if(err)
                {
                    reject(err);
                }
                resolve({ id: this.lastID, nome, preco });
            })
        })
    },

    update: (id, nome, preco) => {
        return new Promise((resolve, reject) => {
            db.run("UPDATE produtos SET nome = ?, preco = ? WHERE id = ?", [nome, preco, id], function(err) {
                if(err)
                {
                    reject(err);
                }
                resolve({ changes: this.changes });
            })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM produtos WHERE id = ?"), [id], function(err){
                if(err)
                {
                    reject(err);
                }
                resolve({ cahnges: this.changes });
            }
        })
    }
}