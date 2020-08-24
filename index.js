const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//dizendo para express usar o EJS como view engine(renderizador de html)
app.set("view engine", 'ejs');
app.use(express.static('public'));
//Body parser - decodificar os dados enviados pelo formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", function(req, res) {
    res.render("index")
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    //recebendo as variavés do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send("Formulário recebido! Titulo " + titulo + " " + "descricao " + descricao)
})

app.listen(8000, () => {
    console.log("App rodando");
})