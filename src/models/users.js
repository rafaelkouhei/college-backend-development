const db = require("../database.js");

const userModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT id, name, email, role FROM users", [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM users WHERE email = ?",
                [email],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row || null);
                }
            );
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT id, name, email, role FROM users WHERE id = ?",
                [id],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row || null);
                }
            );
        });
    },

    create: (name, email, role, hashedPassword) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (email, name, role, pswd) VALUES (?, ?, ?, ?)`,
                [email, name, role, hashedPassword],
                function (err) {
                    if (err) return reject(err);

                    resolve({
                        id: this.lastID,
                        name,
                        email,
                        role
                    });
                }
            );
        });
    }
};

module.exports = userModel;
