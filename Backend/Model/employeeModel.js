import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const Employee = db.define('employees', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
    }

}, {
    freezeTableName: true,
    timestamps: false
});

export default Employee;