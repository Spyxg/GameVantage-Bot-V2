const database = require("../database/database");

function getStatusData() {

    const products = database.getAllProducts();

    const operational = products
        .filter(product => product.state === "operational")
        .sort((a, b) => a.name.localeCompare(b.name));

    const updating = products
        .filter(product => product.state === "updating")
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        products,
        operational,
        updating
    };

}

module.exports = {
    getStatusData
};