const PRODUCTS = [

    // =========================
    // Battleye Products
    // =========================

    {
        id: "apex-full",
        battleyeName: "Apex Legends External",
        displayName: "APEX LEGENDS: FULL",
        shortName: "Apex Legends",
        provider: "battleye"
    },

    {
        id: "arc-full",
        battleyeName: "ARC Raiders Internal",
        displayName: "ARC RAIDERS: FULL",
        shortName: "ARC Raiders",
        provider: "battleye"
    },

    {
        id: "abi-full",
        battleyeName: "Arena Breakout Infinite Internal",
        displayName: "ABI: FULL",
        shortName: "Arena Breakout Infinite",
        provider: "battleye"
    },

    {
        id: "delta-full",
        battleyeName: "Delta Force Internal",
        displayName: "DELTA FORCE: FULL",
        shortName: "Delta Force",
        provider: "battleye"
    },

    {
        id: "fortnite-full",
        battleyeName: "Fortnite External",
        displayName: "FORTNITE: FULL",
        shortName: "Fortnite",
        provider: "battleye"
    },

    {
        id: "r6-full",
        battleyeName: "Rainbow Six Full Internal",
        displayName: "R6: FULL",
        shortName: "Rainbow Six",
        provider: "battleye"
    },

    {
        id: "r6-lite",
        battleyeName: "Rainbow Six Lite Internal",
        displayName: "R6: LITE",
        shortName: "Rainbow Six Lite",
        provider: "battleye"
    },

    {
        id: "rust-full",
        battleyeName: "Rust External",
        displayName: "RUST: FULL",
        shortName: "Rust",
        provider: "battleye"
    },

    {
        id: "valorant-full",
        battleyeName: "Valorant External",
        displayName: "VALORANT: FULL",
        shortName: "Valorant",
        provider: "battleye"
    },

    // =========================
    // Manual Products
    // =========================

    {
        id: "bo7-full",
        displayName: "BO7: FULL",
        shortName: "Black Ops 7",
        provider: "manual"
    },

    {
        id: "scum-full",
        displayName: "SCUM: FULL",
        shortName: "SCUM",
        provider: "manual"
    },

    {
        id: "dayz-full",
        displayName: "DAYZ: FULL",
        shortName: "DayZ",
        provider: "manual"
    },

    {
        id: "eft-full",
        displayName: "EFT: FULL",
        shortName: "Escape From Tarkov",
        provider: "manual"
    },

    {
        id: "eft-lite",
        displayName: "EFT: LITE",
        shortName: "Escape From Tarkov Lite",
        provider: "manual"
    },

    {
        id: "warthunder-full",
        displayName: "WAR THUNDER: FULL",
        shortName: "War Thunder",
        provider: "manual"
    },

    {
        id: "ark-full",
        displayName: "ARK: FULL",
        shortName: "ARK: Survival Ascended",
        provider: "manual"
    }

];

/**
 * Returns every product.
 */
function getProducts() {
    return PRODUCTS;
}

/**
 * Finds a product by Battleye product name.
 */
function getBattleyeProduct(name) {
    return PRODUCTS.find(product =>
        product.battleyeName === name
    );
}

/**
 * Finds a product by internal ID.
 */
function getProduct(id) {
    return PRODUCTS.find(product =>
        product.id === id
    );
}

/**
 * Returns only Battleye products.
 */
function getBattleyeProducts() {
    return PRODUCTS.filter(product =>
        product.provider === "battleye"
    );
}

/**
 * Returns only manual products.
 */
function getManualProducts() {
    return PRODUCTS.filter(product =>
        product.provider === "manual"
    );
}

module.exports = {
    PRODUCTS,
    getProducts,
    getProduct,
    getBattleyeProduct,
    getBattleyeProducts,
    getManualProducts
};