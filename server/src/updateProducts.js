const connection = require('./connection');

const updateProduct = async (productId, new_price) => {

    const sql = 'UPDATE shopper.products SET sales_price = ?  WHERE code = ?';
    const values = [new_price, productId];

    const [result] = await connection.execute(sql, values);

    return result.affectedRows > 0 ? 'Produto atualizado com sucesso' : 'Produto não encontrado';
};

module.exports = updateProduct;
