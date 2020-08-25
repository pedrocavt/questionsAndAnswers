const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
    .authenticate()
    .then(() => { //se for conectada com sucesso
        console.log("conexão feita com o banco")
    })
    .catch((msgErro) => { //se der erro
        console.log(msgErro)
    })

//dizendo para express usar o EJS como view engine(renderizador de html)
app.set("view engine", 'ejs');
app.use(express.static('public'));
//Body parser - decodificar os dados enviados pelo formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", function(req, res) {
    //SELECT * FROM perguntas;
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC'] //Coloca descrescente para mostrar os ultimos primeiro
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas //mandando para a pagina
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    //recebendo as variavés do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    if (titulo != "" && descricao != "") {
        //salvando no banco
        Pergunta.create({
            titulo: titulo,
            descricao: descricao
        }).then(() => {
            res.redirect("/"); //redirecionando para index
        });
    } else {
        res.redirect("/");
    }
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id //pegando parametro da URL
    Pergunta.findOne({ //busca o id no banco de dados
        where: { id: id }

    }).then(pergunta => {
        if (pergunta != undefined) { //pergunta(id) encontrada

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        } else { //não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    })

})

app.listen(8000, () => {
    console.log("App rodando");
});