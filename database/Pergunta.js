const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {});
//Não vai forçar a criação de uma tabela se caso ela já exista

module.exports = Pergunta;