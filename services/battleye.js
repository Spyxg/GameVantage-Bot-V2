const axios = require("axios");

const {
    getBattleyeProduct
} = require("./products");

const API_URL = "https://api.battleye.dev/v1/products";

async function fetchProducts() {

    const response = await axios.get(API_URL, {

        headers: {

            Authorization: `Bearer ${process.env.BATTLEYE_API_KEY}`

        }

    });

    const apiProducts = response.data.data.products;

    const products = [];

    for (const apiProduct of apiProducts) {

        const product = getBattleyeProduct(apiProduct.product_name);

        if (!product) continue;

        products.push({

            id: product.id,

            name: product.displayName,

            provider: "battleye",

            state:
                apiProduct.status === "undetected" &&
                apiProduct.purchase_available &&
                !apiProduct.frozen
                    ? "operational"
                    : "updating",

            raw: apiProduct

        });

    }

    return products;

}

module.exports = {

    fetchProducts

};