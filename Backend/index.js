import express from "express";
import bodyParser from "body-parser";
import db from "./config/database.js";
import Routes from "./modules/Routes.js"

const app = express();


app.use(express.json());
app.use('/', Routes);



// Sequelize Connection
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


//connection port 
const PORT = 5000;
app.listen(PORT, () => console.log('http://localhost:5000'));

