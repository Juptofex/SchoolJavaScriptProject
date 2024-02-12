const listeExoplanetes = [];

module.exports.list = () => {
    return listeExoplanetes;
};

module.exports.add = (data) => {
    listeExoplanetes.push(data);
};