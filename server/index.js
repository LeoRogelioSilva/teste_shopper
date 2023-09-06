const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();
var path = require('path');
const fileUpload = require('express-fileupload');

const port = 5000;

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));
app.use(cors());

app.listen(port, () => {
    console.log("Rodando na porta "+port+"...")
});

app.get('/noticias', (req, res) => {
    res.json([{
        'titulo': 'Uma noticia'
    }])
})
