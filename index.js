const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.set("view engine", "ejs"); // Estou dizendo para o Express usar o EJS como View engine
app.use(express.static("public")); // Usamos para dizer aonde estão nossos arquivos staticos do nosso projeto

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ASC crescente & DESC decrescente
    ],
  }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  let body = req.body;
  Pergunta.create({
    titulo: body.titulo,
    descricao: body.descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  console.log("Aqui o resultado", id);
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [['id', "DESC"]]
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

app.listen(3000, () => console.log("Rodando"));
