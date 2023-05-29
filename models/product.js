const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Product = config.db.define('product', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_price:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_stock:{
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    freezeTableName:true
});


module.exports = {Product}