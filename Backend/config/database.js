import {Sequelize} from "sequelize";


const db = new Sequelize('empolyees','root','123456',{
    host: "127.0.0.1",
    dialect: "mysql",
});

 
export default db;