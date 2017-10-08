/**
 * Created by bhavyaagg on 7/10/17.
 */

const Sequelize = require('sequelize');

const db = new Sequelize('sharesource', 'sharesource', 'sharesource', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

const Users = db.define('users', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: Sequelize.DataTypes.STRING,
  contact: Sequelize.DataTypes.STRING,
  balance: {type: Sequelize.DataTypes.INTEGER, defaultValue: 0}
});

const Locations = db.define('locations', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: Sequelize.DataTypes.STRING
});

const TimeResource = db.define('timeresource', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: Sequelize.DataTypes.STRING,
  cost: Sequelize.DataTypes.INTEGER
});

const QuantityResource = db.define('quantityresource', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: Sequelize.DataTypes.STRING,
  cost: Sequelize.DataTypes.INTEGER
});

const BillResource = db.define('billresource', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: Sequelize.DataTypes.STRING,
});

const LocationTimeResource = db.define('locationtimeresource', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
});

LocationTimeResource.belongsTo(Locations);
LocationTimeResource.belongsTo(TimeResource);
Locations.hasMany(LocationTimeResource);
TimeResource.hasMany(LocationTimeResource);

const LocationQuantityResource = db.define('locationquantityresource', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},

});

LocationQuantityResource.belongsTo(Locations);
LocationQuantityResource.belongsTo(QuantityResource);
Locations.hasMany(LocationQuantityResource);
QuantityResource.hasMany(LocationQuantityResource);

const LocationBillResource = db.define('locationbillresource', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
});

LocationBillResource.belongsTo(Locations);
LocationBillResource.belongsTo(BillResource);
Locations.hasMany(LocationBillResource);
BillResource.hasMany(LocationBillResource);

const Usage = db.define('usage', {
  id: {type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  amount: Sequelize.DataTypes.INTEGER,
  slot: {type: Sequelize.DataTypes.INTEGER, defaultValue: 0}
});

Usage.belongsTo(Users);
Usage.belongsTo(LocationTimeResource);
Usage.belongsTo(LocationQuantityResource);
Usage.belongsTo(LocationBillResource);
Users.hasMany(Usage);
LocationTimeResource.hasMany(Usage);
LocationQuantityResource.hasMany(Usage);
LocationBillResource.hasMany(Usage);

db.sync({alter: false}).then(() => {
  console.log('Database configured')
});

module.exports = {
  models: {
    Users,
    Locations,
    TimeResource,
    QuantityResource,
    BillResource,
    LocationTimeResource,
    LocationQuantityResource,
    LocationBillResource,
    Usage
  }
};