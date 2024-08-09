const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const env = require('dotenv')

env.config();


app.use(cors());

app.use(express.json());


const Database = mysql.createConnection({
    host: '10.2.27.202',
    user: 'root',
    password: process.env.PASSWORD,  
    database: 'userinfo'  
});


Database.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Database connected successfully');
    }
});


app.get('/UserData', (req, res) => {
    Database.query('SELECT * FROM usersDetails', (error, result) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(400).send('There was an error with the database query');
        } else {
            res.status(200).json(result); 
            console.log(result); 
        }
    });
});


app.post('/adduser', (req, res) => {
    const {name, age } = req.body;
    const query = 'INSERT INTO usersDetails (name, age) VALUES (?,?)';

    Database.query(query, [name, age], (error, result) => {
        if (error) {
            console.error('Database error:', error);
            res.status(400).send('It\'s a database error');
        } else {
            res.status(200).send('Data inserted successfully');
            console.log(result); 
        }
    });
});


app.listen(3000, () => {
    console.log(`Server is running on http://10.2.27.202:3000`);
});
