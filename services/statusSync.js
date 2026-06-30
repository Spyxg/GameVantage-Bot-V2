const battleye = require("./battleye");
const database = require("../database/database");

async function syncProducts() {

    const products = await battleye.fetchProducts();

    const changes = [];

    for (const product of products) {

        const existing = database.getProduct(product.id);

        if (!existing) {

            database.saveProduct(product);

            changes.push({

                product,

                oldState: null,

                newState: product.state

            });

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