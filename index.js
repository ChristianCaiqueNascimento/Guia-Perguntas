const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

connection
.authenticate()
.then(() => {
    console.log("Conexão feita com o banco");
})
.catch((msgErro) => {
    console.log(msgErro);
})

app.set('view engine', 'ejs'); // Estou dizendo para o Express usar o EJS como View engine
app.use(express.static('public')); // Usamos para dizer aonde estão nossos arquivos staticos do nosso projeto

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Pergunta.findAll({raw: true}).then(perguntas => console.log(perguntas))
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    let body = req.body
    Pergunta.create({
        titulo: body.titulo,
        descricao: body.descricao
    }).then(() => {res.redirect("/")});
});

app.listen(3000, () => console.log("Rodando"))