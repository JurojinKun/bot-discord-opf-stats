const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pet = sequelize.define('pet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: 'pets'
    });

    return Pet;
};