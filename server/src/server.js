const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();
var path = require('path');
const fileUpload = require('express-fileupload');
const allProducts = require('./allProducts');
const allPacks = require('./allPacks');
const updateProduct = require('./updateProducts');

const port = 5000;

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));
app.use(cors());

app.listen(port, () => {
    console.log("Rodando na porta " + port + "...")
});

app.get('/products', async (req, res) => {
    const query = await allProducts();
    return res.status(201).json(query)
});


//Essa rota não é necessária mas estou usando apenas para veificar os dados no bd
app.get('/packs', async (req, res) => {
    const query = await allPacks();
    return res.status(201).json(query)
});

app.put('/products', async (req, res) => {
    try {
        const packs = await allPacks();
        const products = await allProducts();

        const updatedProducts = req.body.products;
        
        for (const updatedProduct of updatedProducts) {
            const actualProduct = products.find((obj) => obj.code === parseInt(updatedProduct.code));

            const matchingPacks = packs.filter((objeto) => objeto.pack_id === parseInt(updatedProduct.code));
            
            updateProduct(updatedProduct.code, parseFloat(updatedProduct.sales_price))
            if (matchingPacks.length > 1) { //encontrei mais de um pack, o que significa que é um kit. não há menção a atualilzação de preço de kit na descrição do problema, então vou ignorar

            } else if(matchingPacks.length === 1){ //é um pack, então atualiza o produto e o pack
                updateProduct(matchingPacks[0].product_id, parseFloat(updatedProduct.sales_price / matchingPacks[0].qty).toFixed(2))
            }
            else{ //é um produto, então atualiza o produto e procura packs e kits que tenham o produto e atualiza
                const packsAndKits = packs.filter((obj) => obj.product_id === parseInt(updatedProduct.code))
                
                for(const packOrKit of packsAndKits){
                    const packOrKitId = packOrKit.pack_id; //pega o id do pack
                    
                   const packProduct = products.find((obj) => obj.code === packOrKitId)
                   
                   packProduct.sales_price = parseFloat(packProduct.sales_price) - parseFloat(actualProduct.sales_price)*parseInt(packOrKit.qty)
                   packProduct.sales_price += parseFloat(updatedProduct.sales_price)*parseInt(packOrKit.qty)
                    updateProduct(packProduct.code, packProduct.sales_price);
                }

            }
        }
        res.status(200).json({ message: 'Produtos atualizados com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar os produtos' });
    }
});


