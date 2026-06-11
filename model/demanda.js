const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');
const Usuario = require('./usuario.js');

class Demanda extends Model { } // classe herdando de 'Model'

Demanda.init( // construtor com a definição dos atributos
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
            },
        },
        // novo tipo ENUM, para limitar os valores possíveis do atributo 'status'
        status: {
            type: DataTypes.ENUM('pendente', 'em_andamento', 'concluido'),
            allowNull: false,
            defaultValue: 'pendente'
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        // configurações adicionais do modelo
        sequelize, // para estabelecer conexão com Banco de Dados
        freezeTableName: true, // nome da tabela igual ao nome da classe
        createdAt: 'criada_em', // nome do atributo 'createdAt'
        updatedAt: 'atualizada_em', // nome do atributo 'updatedAt'
    },
)
// hasmany = tem muitos(as)

Usuario.hasMany(Demanda, { foreignKey: 'usuario_id' });

// belongsTo = pertence a

Demanda.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Sincroniza os modelos com o banco de dados, aplicando alterações de estrutura (alter : true )
// sequelize.sync({ force: true }).then(() => {
//     console.log('Modelos sincronizados com o banco de dados.');
// }).catch((error) => {
//     console.log('Erro ao sincronizar modelos com o banco de dados: ', error);
// });

module.exports = { Demanda, Usuario };