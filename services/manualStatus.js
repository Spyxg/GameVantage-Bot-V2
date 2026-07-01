const database = require("../database/database");
const { getProduct } = require("./products");

async function updateManualStatus(productId, newState) {

    const dbProduct = database.getProduct(productId);
    const registryProduct = getProduct(productId);

    if (!dbProduct || !registryProduct) {
        return {
            success: false,
            message: "Product not found."
        };
    }

    const product = {
        ...dbProduct,
        ...registryProduct
    };

    if (product.provider !== "manual") {
        return {
            success: false,
            message: `${product.displayName} is managed automatically by Battleye.`
        };
    }

    if (product.state === newState) {
        return {
            success: false,
            message: `${product.displayName} is already ${newState}.`
        };
    }

    const oldState = product.state;

    database.saveProduct({
        id: product.id,
        name: product.displayName,
        provider: product.provider,
        state: newState
    });

    return {
        success: true,
        message: `${product.displayName} updated successfully.`,
        changes: [
            {
                product: {
                    ...product,
                    state: newState
                },
                oldState,
                newState
            }
        ]
    };

}

module.exports = {
    updateManualStatus
};