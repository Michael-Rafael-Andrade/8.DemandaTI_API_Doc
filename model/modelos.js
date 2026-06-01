const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

class Demanda extends Model { } // classe herdando de 'Model'

Demanda.init( // Construtor com a definição dos atributos
    {
        // substituindo o atributo 'chave'
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        urgencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        // Novo tipo ENUM, para limitar os valores possíveis do atributo 'status'
        status: {
            type: DataTypes.ENUM('pendente', 'em_andamento', 'concluido'),
            allowNull: false,
            defaultValue: 'pendente'
        }
    },
    {
        // Configurações adicionais do modelo
        sequelize, // para estabelecer conexão com BD
        freezeTableName: true, // nome da tabela igual ao nome da classe
        createdAt: 'criada_em', // nome do atributo 'createdAt'
        updatedAt: 'atualizada_em', // nome do atributo 'updatedAt'
    },
);

// Linhas de comando para sincronizar com o banco de dados
// sequelize.sync({ alter: true }).then(() => {
//     // alter = true, para aplicar alterações de código no BD
//     console.log('Modelos sincronizados com o banco de dados.');
// }).catch((error) => {
//     console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
// });

module.exports = Demanda;