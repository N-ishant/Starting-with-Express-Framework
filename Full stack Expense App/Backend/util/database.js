const Sequelize = require('sequelize');

const sequelize = new Sequelize('Expense-Tracker-App', 'root', 'Nishantkao@12', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;