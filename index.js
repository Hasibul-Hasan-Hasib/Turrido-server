const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const app = express();
const port = 3100;




app.use(cors());
app.use(express.json());





//localhost
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hourent",
// });



//clever-cloud
const db = mysql.createConnection({
    host: "byrqjjngba6yvpbbjxgx-mysql.services.clever-cloud.com",
    user: "uygdkmfe11hv0fdy",
    password: "ofW7kO8rb6143qFmaWIB",
    database: "byrqjjngba6yvpbbjxgx",
    connectionLimit: 10,
    acquireTimeout: 30000,
});



db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});



app.get('/', async (req, res) => {
    res.send('server is running.')
})



app.get('/tours', async (req, res) => {
    db.query("SELECT * FROM tour", (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})
app.get('/users', async (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})

app.get('/bookings', async (req, res) => {
    db.query("SELECT * FROM booking", (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})

app.delete('/bookings', async (req, res) => {
    const { booking_id } = req.body;
    console.log(booking_id);
    db.query(`DELETE FROM booking WHERE 'booking_id'='${booking_id}'`, (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})

app.post('/bookings', async (req, res) => {
    const { user_id, vendor_id, post_id, status } = req.body;
    console.log(req.body)
    db.query(`INSERT INTO booking (user_id, vendor_id, post_id, booking_status) VALUES ('${user_id}', '${vendor_id}', '${post_id}', '${status}')`, (err, result) => {
        err ? console.log(err) : res.send(result);;
    });
})


app.post('/reviews', async (req, res) => {
    const { user_id, rating, review_com, postId, status } = req.body;
    console.log(req.body)
    db.query(`INSERT INTO review (user_id, review_rating, review_com, booking_status, post_id) VALUES ('${user_id}', '${rating}', '${review_com}', '${status}', '${postId}')`, (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})

app.get('/reviews', async (req, res) => {
    db.query("SELECT * FROM review", (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})