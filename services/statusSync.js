const battleye = require("./battleye");
const database = require("../database/database");

async function syncProducts() {

    const products = await battleye.fetchProducts();

    const changes = [];

    const existingProducts = database.getAllProducts();

    // First startup
    if (existingProducts.length === 0) {

        console.log("First startup detected. Initializing database...");

        for (const product of products) {
            database.saveProduct(product);
        }

    } else {

        for (const product of products) {

            const existing = database.getProduct(product.id);

            // New product added later
            if (!existing) {

                database.saveProduct(product);

                console.log(`New product detected: ${product.name}`);

                continue;

            }

            // Status changed
            if (existing.state !== product.state) {

                changes.push({

                    product,

                    oldState: existing.state,

                    newState: product.state

                });

            }

            database.saveProduct(product);

        }

    }

    const operational = products
        .filter(product => product.state === "operational")
        .sort((a, b) => a.name.localeCompare(b.name));

    const updating = products
        .filter(product => product.state === "updating")
        .sort((a, b) => a.name.localeCompare(b.name));

    return {

        products,

        operational,

        updating,

        changes

    };

}

module.exports = {

    syncProducts

};