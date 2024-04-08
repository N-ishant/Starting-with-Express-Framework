const Sequelize = require('sequelize');

const sequelize = new Sequelize('Booking Appointment App', 'root', 'Nishantkao@12', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;