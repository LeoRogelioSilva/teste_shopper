const connection = require('./connection')

const allPacks = async () => {
    const [query] = await connection.execute('SELECT * FROM shopper.packs');
    return query
}

module.exports = allPacks