const battleye = require("./battleye");
const database = require("../database/database");
const { PRODUCTS } = require("./products");

async function syncProducts() {

    // Fetch current Battleye product states
    const battleyeProducts = await battleye.fetchProducts();

    const changes = [];

    // Check if database is empty
    const existingProducts = database.getAllProducts();

    if (existingProducts.length === 0) {

        console.log("First startup detected. Initializing database...");

        // Add EVERY product to SQLite
        for (const product of PRODUCTS) {

            database.saveProduct({

                id: product.id,
                name: product.displayName,
                provider: product.provider,

                // Manual products default to operational.
                // Battleye products will immediately be overwritten below.
                state: "operational"

            });

        }

    }

    // Update Battleye products
    for (const product of battleyeProducts) {

        const existing = database.getProduct(product.id);

        if (!existing) continue;

        if (existing.state !== product.state) {

            changes.push({

                product,

                oldState: existing.state,

                newState: product.state

            });

        }

        database.saveProduct(product);

    }

    // Read EVERYTHING from SQLite
    const allProducts = database.getAllProducts();

    const operational = allProducts
        .filter(product => product.state === "operational")
        .sort((a, b) => a.name.localeCompare(b.name));

    const updating = allProducts
        .filter(product => product.state === "updating")
        .sort((a, b) => a.name.localeCompare(b.name));

    return {

        products: allProducts,

        operational,

        updating,

        changes

    };

}

module.exports = {

    syncProducts

};