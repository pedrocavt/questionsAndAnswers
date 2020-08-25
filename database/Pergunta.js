const Sequilize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas', {

    //configurando tabela
    titulo: {
        type: Sequilize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequilize.TEXT,
        allowNull: false
    }
});

//criando no banco
Pergunta.sync({ force: false }).then(() => {});

module.exports = Pergunta;