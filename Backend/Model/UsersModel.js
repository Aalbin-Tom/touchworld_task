import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
    },
    Name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    Address: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Age: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false,
    },

}, {
    freezeTableName: true,
    timestamps: false
});

export default Users;