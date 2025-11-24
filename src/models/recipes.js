const db = require('../database.js');

const recipeModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM recipes", [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },

    add: (owner_id, name, ingredients, instructions, time) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO recipes (owner_id, name, ingredients, instructions, time) VALUES (?, ?, ?, ?, ?)", [owner_id, name, ingredients, instructions, time], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ id: this.lastID, owner_id, name, ingredients, instructions, time });
            });
        });
    },

    update: (id, name, ingredients, instructions, time) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE recipes 
                       SET name = ?, ingredients = ?, instructions = ?, time = ?
                     WHERE id = ?`,
                     [name, ingredients, instructions, time, id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM recipes WHERE id = ?", 
                   [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = recipeModel;