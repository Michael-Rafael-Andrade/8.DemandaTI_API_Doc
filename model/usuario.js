const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

class Usuario extends Model { } // classe herdando de 'Model'

Usuario.init(
    {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        perfil: {
            type: DataTypes.ENUM('usuario', 'admin'),
            allowNull: false,
            defaultValue: 'usuario'
        },
    }, 
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

// // Sincroniza os modelos com o banco de dados, aplicando alterações de estrutura (alter : true )
// sequelize.sync({ force: true }).then(() => {
//     console.log('Modelos sincronizados com o banco de dados.');
// }).catch((error) => {
//     console.log('Erro ao sincronizar modelos com o banco de dados: ', error);
// });

module.exports = Usuario;