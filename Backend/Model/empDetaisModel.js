import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const EmpDetails = db.define('empdetails', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    emp_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,

    },
    jobsts: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }

}, {
    freezeTableName: true,
    timestamps: false
});

export default EmpDetails;