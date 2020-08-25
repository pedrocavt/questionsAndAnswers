const Sequelize = require('sequelize');

//conectando com o banco
const connection = new Sequelize('guiaperguntas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;