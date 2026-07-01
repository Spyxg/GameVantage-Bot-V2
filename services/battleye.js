const axios = require("axios");
const config = require("../config/config");

const {
    getBattleyeProduct
} = require("./products");

const API_URL = "https://api.battleye.dev/v1/products";

/**
 * Fetches products from the Battleye API
 * and converts them into GameVantage's
 * internal product model.
 */
async function fetchProducts() {

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${config.battleyeApiKey}`
        }
    });

    const apiProducts = response.data.data.products;

    const products = [];

    for (const apiProduct of apiProducts) {

        // Find this product in our registry
        const product = getBattleyeProduct(apiProduct.product_name);

        // Ignore products we don't sell
        if (!product) continue;

        // Normalize Battleye status
        let state = "updating";

        if (
            apiProduct.status === "undetected" &&
            apiProduct.purchase_available &&
            !apiProduct.frozen
        ) {
            state = "operational";
        }

products.push({

    id: product.id,

    name: product.displayName,

    displayName: product.displayName,

    shortName: product.shortName,

    provider: product.provider,

    state,

    raw: apiProduct

});

    }

    return products;

}

module.exports = {

    fetchProducts

};