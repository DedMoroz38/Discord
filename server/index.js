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
    db.query(sqlInsert, [email],
        async (err, result) => {
            if (err) {
                res.send({
                    message: "Error!",
                    err: err
                });
            } else if (result) {
                if (result.length === 0) {
                    res.send({
                        message: "Account doesn't exist!",
                        result
                    })
                } else {
                    const validPass = await bcrypt.compare(password, result[0].password);
                    if (validPass) {
                        res.send({
                            message: "OK",
                            result
                        })
                    } else {
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
app.post('/searchFriend', (req, res) => {
    console.log(1);
    const username = req.body.username;


    const sqlInsert = 'SELECT * FROM emails WHERE userName = ?;'
    db.query(sqlInsert, [username],
        (err, result) => {
            if (err) {
                res.send({
                    message: "Error!",
                    err: err
                });
            } else {
                res.send({
                    message: "Fine!",
                    result
                });
            }



        });
});

app.post('/requesFriend', (req, res) => {
    console.log(1);
    const friendId = req.body.friendId;
    const userId = req.body.userId;

    const sqlInsert = 'INSERT INTO user_friend (source_id, target_id, status) VALUES (?,?,0);'
    db.query(sqlInsert, [userId, friendId],
        (err, result) => {
            if (err) {
                res.send({
                    message: "Error!",
                    err: err
                });
            } else {
                res.send({
                    message: "Fine!",
                    result
                });
            }
        }
    );
});



app.listen(3001, () => {
    console.log('Listening!');
});