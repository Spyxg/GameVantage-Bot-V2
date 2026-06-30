const Database = require("better-sqlite3");

const db = new Database("./database/status.db");

db.exec(`
CREATE TABLE IF NOT EXISTS products (

    id TEXT PRIMARY KEY,

    name TEXT NOT NULL,

    provider TEXT NOT NULL,

    state TEXT NOT NULL,

    last_changed INTEGER NOT NULL

);
`);

console.log("✅ SQLite initialized.");

function getProduct(id) {

    return db.prepare(`
        SELECT *
        FROM products
        WHERE id = ?
    `).get(id);

}

function getAllProducts() {

    return db.prepare(`
        SELECT *
        FROM products
    `).all();

}

function saveProduct(product) {

    db.prepare(`
        INSERT INTO products
        (
            id,
            name,
            provider,
            state,
            last_changed
        )

        VALUES
        (
            @id,
            @name,
            @provider,
            @state,
            @last_changed
        )

        ON CONFLICT(id)

        DO UPDATE SET

            name = excluded.name,
            provider = excluded.provider,
            state = excluded.state,
            last_changed = excluded.last_changed

    `).run({

        id: product.id,
        name: product.name,
        provider: product.provider,
        state: product.state,
        last_changed: Date.now()

    });

}

function deleteProduct(id) {

    db.prepare(`
        DELETE
        FROM products
        WHERE id = ?
    `).run(id);

}

function hasStateChanged(product) {

    const existing = getProduct(product.id);

    if (!existing) {

        return true;

    }

    return existing.state !== product.state;

}

module.exports = {

    getProduct,
    getAllProducts,
    saveProduct,
    deleteProduct,
    hasStateChanged

};