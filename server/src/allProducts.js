const connection = require('./connection')

const allProducts = async () => {
    const [query] = await connection.execute('SELECT * FROM shopper.products');
    return query
}

module.exports = allProducts