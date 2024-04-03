const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Nishantkao@12', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;