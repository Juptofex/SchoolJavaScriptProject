const db = require('../models/db_conf.js');


module.exports.list = () => {
    const stmt_all = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year, ist AS IST, pclass AS pClass FROM exoplanets");
    return stmt_all.all();
};

module.exports.add = (name, hClass, year) => {
    const stmt_insert = db.prepare('INSERT INTO exoplanets (unique_name, hclass, discovery_year) VALUES (?, ?, ?)');
    stmt_insert.run(name, hClass, year);
};

module.exports.search = (data) => {
    const stmt_search = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year FROM exoplanets WHERE name LIKE ?");
    return stmt_search.all(data+'%');
};

module.exports.findById = (id) => {
  const stmt_details = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year, ist AS IST, pclass AS pClass FROM exoplanets WHERE id = ?");
  return stmt_details.get(id);
};

module.exports.delete = (id) => {
    const stmt_delete = db.prepare("DELETE FROM exoplanets WHERE exoplanet_id = ?");
    stmt_delete.run(id);
};

module.exports.filterYear = (year) => {
    const stmt_filter = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year, ist AS IST, pclass AS pClass FROM exoplanets WHERE year = ?");
    return stmt_filter.all(year);
};

module.exports.filterClass = (hClass) => {
    const stmt_filter = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year, ist AS IST, pclass AS pClass FROM exoplanets WHERE hClass = ?");
    return stmt_filter.all(hClass);
};