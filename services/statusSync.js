const battleye = require("./battleye");
const database = require("../database/database");

async function syncProducts() {

    const products = await battleye.fetchProducts();

    const changes = [];

    const existingProducts = database.getAllProducts();

    // First startup: initialize database only
    if (existingProducts.length === 0) {

        console.log("First startup detected. Initializing database...");

        for (const product of products) {
            database.saveProduct(product);
        }

        return {
            products,
            changes
        };
    }

    // Normal sync
    for (const product of products) {

        const existing = database.getProduct(product.id);

        if (!existing) {

            // New product added to GameVantage in the future
            database.saveProduct(product);

            console.log(`New product detected: ${product.name}`);

            continue;
        }

        if (existing.state !== product.state) {

            changes.push({

                product,

                oldState: existing.state,

                newState: product.state

            });

        }

        database.saveProduct(product);

    }

    return {

        products,

        changes

    };

}

module.exports = {

    syncProducts

};