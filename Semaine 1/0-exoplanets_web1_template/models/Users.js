const db = require('../models/db_conf.js');

module.exports.add = (name, firstname, email, password) => {
    db.prepare('INSERT INTO users (name, firstname, email, password) VALUES (?, ?, ?, ?)').run(name, firstname, email, password);
}

module.exports.find = (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);

}