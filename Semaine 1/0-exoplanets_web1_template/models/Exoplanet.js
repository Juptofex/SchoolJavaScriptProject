const listeExoplanetes = [];
let searchResult = null;

module.exports.list = () => {
    const trappist = { id: 1, name: "TRAPPIST-1", hClass: "Mésoplanète", year: "2016", IST : "0,90", pClass : "Sous-terrienne chaude" };
    const koi = { id: 2, name: "KOI-1686.01", hClass: "Mésoplanète", year: "2011", IST : "0,89", pClass : "Super-terrienne chaude" };
    const lhs = { id: 3 , name: "LHS 1723 b", hClass: "Mésoplanète", year: "2017", IST : "0,89", pClass : "Super-terrienne chaude" };
    listeExoplanetes.push(trappist, koi, lhs);
    return listeExoplanetes;
};

module.exports.add = (name, hClass, year) => {
    const newExoplanet = {
        id: listeExoplanetes.length + 1,
        name: name,
        hClass: hClass,
        year: year
      };
    listeExoplanetes.push(newExoplanet);
};

module.exports.search = (data) => {
    for (const planet of listeExoplanetes) {
        if(planet.name.toLocaleLowerCase().startsWith(data.toLocaleLowerCase())){  
            console.log("trouvé");
            searchResult = planet.name;
            break;
        } else {
            searchResult = "Non trouvé"
        }
    }
    return searchResult;
}

module.exports.details = (data) => {
    let ret = {planet: null, err: false};
    const exoplanetIdParam = parseInt(data);
    let id_error = false;
    let exoplanetFound = null;

  if (isNaN(exoplanetIdParam)) {
    ret.err = true;
  }
  else {

    for (let exoplanet of listeExoplanetes) {
      if (exoplanet.id === exoplanetIdParam) {
        ret.planet = exoplanet;
        break;
      }
    }
  }
  return ret;
}