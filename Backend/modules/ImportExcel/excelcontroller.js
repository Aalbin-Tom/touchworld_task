import Users from "../../Model/UsersModel.js";
import readXlsxFile from "read-excel-file/node";
import moment from "moment";
import { createClient } from 'redis';


export const importExceltodb = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path = `../backend/public/${req.file.filename}`;
        console.log(path);

        readXlsxFile(path, { sheet: 1 }).then(async (rows) => {
//validation
            const validateData = (row, index) => {
                const name = row[0];
                const address = row[1];
                const age = row[2];
                const dob = moment(row[3], 'MM-DD-YYYY');

                const errors = [];


                if (!address || address.length < 25) {
                    errors.push(`Invalid Address at line ${index + 2}`);
                }

                if (!age || typeof age !== 'number') {
                    errors.push(`Invalid Age at line ${index + 2}`);
                }

                if (!dob.isValid()) {
                    errors.push(`Invalid DOB at line ${index + 2}`);
                }

                return { isValid: errors.length === 0, errors };
            };

            // Skip header
            rows.shift();

            let sheetDatas = [];
            let invalidRecords = [];

            rows.forEach((row, index) => {
                const originalDOB = row[3];
                const formattedDOB = moment(originalDOB, 'MM-DD-YYYY').format('YYYY-MM-DD');

                console.log(formattedDOB);
                let sheetData = {
                    Name: row[0],
                    Address: row[1],
                    Age: row[2],
                    DOB: formattedDOB, // Use the formatted date
                };
                sheetDatas.push(sheetData);
            });
            rows.forEach((row, index) => {
                const validation = validateData(row, index);
                if (validation.isValid) {
                    let sheetData = {
                        Name: row[0],
                        Address: row[1],
                        Age: row[2],
                        DOB: moment(row[3], 'MM-DD-YYYY').format('YYYY-MM-DD'), // Convert to YYYY-MM-DD format
                    };
                    sheetDatas.push(sheetData);
                } else {
                    invalidRecords.push(...validation.errors);
                }
            });


            if (invalidRecords.length > 0) {
                return res.status(400).json({ errors: invalidRecords });
            }
            console.log(sheetDatas)
            Users.truncate();
            // const client = redis.createClient();

            const client = await createClient({
                host: '127.0.0.1', // Replace with your Redis server's host
                port: 6379,        // Replace with your Redis server's port
            })
                .on('error', err => console.log('Redis Client Error', err))
                .connect();

            Users
                .bulkCreate(sheetDatas)
                .then(() => {
                    Users.findAll()
                        .then(async (users) => {
                            const usersJSON = JSON.stringify(users);

                            // Save the users data in Redis with an expiration time (e.g., 1 hour)
                            client.set('users', usersJSON);
                            const value = await client.get('users');
                            console.log(value);
                            res.status(200).json(value);
                        })
                        .catch((error) => {
                            console.error('Error fetching users from the database:', error);
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                })
                .catch((error) => {
                    res.status(500).send({
                        message:
                            "Fail to import data into database!" + req.file.originalname,
                        error: error.message,
                    });
                });
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};