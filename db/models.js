/**
 * Created by bhavyaagg on 7/10/17.
 */

const Sequelize = require('sequelize');

const db = new Sequelize('mathongo', 'muser', 'mathongopass', {
  host: 'mathongo.cdkn595tutfq.ap-south-1.rds.amazonaws.com',
  port: 5432,
  dialect: 'postgres'
});

// const db = new Sequelize('mathongo', 'muser', 'mpass', {
//   host: 'localhost',
//   dialect: 'postgres'
// });






db.sync({alter: false}).then(() => {
  console.log('Database configured')
});

module.exports = {

}