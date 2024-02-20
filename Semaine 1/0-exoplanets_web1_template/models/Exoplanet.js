let searchResult = null;
const db = require('../models/db_conf.js');


module.exports.list = () => {
    const stmt_all = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year, ist AS IST, pclass AS pClass FROM exoplanets");
    return stmt_all.all();
};

module.exports.add = (name, hClass, year) => {
    const stmt_insert = db.prepare('INSERT INTO exoplanets (unique_name, hclass, discovery_year) VALUES (?, ?, ?)');
    const info = stmt_insert.run(name, hClass, year);
};

module.exports.search = (data) => {
    const stmt_search = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass as hClass, discovery_year AS year FROM exoplanets WHERE name LIKE ?");
    const searchResult = stmt_search.all(data+'%');
    return searchResult;
};

module.exports.findById = (id) => {
  let details = null;
  for (const planet of stmt_all) {
      if (planet.id === id) {
          details = planet;
          break;
      }
  }
  return details;
};