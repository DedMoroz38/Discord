const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: "3306",
    password: "password",
    database: "sys",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', async (req, res) => {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlInsert = 'INSERT INTO emails (email, password, userName) VALUES (?,?,?)';

    db.query(sqlInsert, [email, hashedPassword, userName], (err, result) => {
        if (err) {
            res.send({
                message: "Error!",
                err: err
            })
        } else {
            res.send({
                message: "OK",
                result
            })
        }
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = 'SELECT * FROM emails WHERE email = ?;'
    console.log(email, password);
    db.query(sqlInsert, [email],
        async (err, result) => {
            console.log(1);
            if (err) {
                console.log(0);
                res.send({
                    message: "Error!",
                    err: err
                })
            } else if (result) {
                console.log(-1);
                console.log(result);
                if (result.length === 0) {
                    res.send({
                        message: "Account doesn't exist!",
                        result
                    })
                } else {
                    const validPass = await bcrypt.compare(password, result[0].password);
                    console.log(validPass);
                    if (validPass) {
                        res.send({
                            message: "OK",
                            result
                        })
                    } else {
                        console.log(result);
                        res.send({
                            message: "Wrong password!",
                            result
                        })
                    }
                }

            } else {
                alert("Uncatched ERROR");
            }
        });
});




app.listen(3001, () => {
    console.log('Listening!');
});