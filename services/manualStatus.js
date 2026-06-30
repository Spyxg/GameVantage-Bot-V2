const database = require("../database/database");

async function updateManualStatus(productId, newState) {

    const product = database.getProduct(productId);

    if (!product) {
        return {
            success: false,
            message: "Product not found."
        };
    }

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

    product.state = newState;

    database.saveProduct(product);

    return {
        success: true,
        message: `${product.displayName} updated successfully.`,
        changes: [
            {
                product,
                oldState,
                newState
            }
        ]
    };

}

module.exports = {
    updateManualStatus
};