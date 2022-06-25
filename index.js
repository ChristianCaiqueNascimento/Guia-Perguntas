const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Estou dizendo para o Express usar o EJS como View engine
app.use(express.static('public')); // Usamos para dizer aonde estão nossos arquivos staticos do nosso projeto

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.listen(3000, () => console.log("Rodando"))