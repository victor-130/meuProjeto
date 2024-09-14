const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Produto = sequelize.define('Produto',{
    codigo: {
        type: DataTypes.STRING,
        required: true,
        primaryKey: true
    },
    produto: {
        type: DataTypes.STRING,
        required: true,
    },
    modelo: {
        type: DataTypes.STRING,
        required: false
    },
    marca: {
        type: DataTypes.STRING,
        required: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        required: true
    },
    valorc: {
        type: DataTypes.FLOAT,
        required: true
    },
    valorv: {
        type: DataTypes.FLOAT,
        required: true
    }
},{
    tableName: 'produto'
})

module.exports = Produto;