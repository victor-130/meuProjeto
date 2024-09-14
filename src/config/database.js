const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'lojamoto',
    'victor',
    '1234',{
        host: 'localhost',
        dialect: 'mysql'
    }
    
)
module.exports = sequelize;