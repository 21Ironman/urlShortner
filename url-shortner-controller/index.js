const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

// DB Credentials
const port = 9000;
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'url'
})

// Get req for retreiving all records
app.get('/all', (req, res) => {
    
    const viewSql = "SELECT * FROM short_url";
    db.query(viewSql,(err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

// Get req for redirecting to fullUrl and updating clicks
app.get('/u', (req,res) => {

    const uk = req.query.k;
    const getKey = "SELECT fullurl,clicks FROM short_url WHERE shorturl=?";
    db.query(getKey, uk, (err, result) => {
        if (err) {
            console.log(err);
        } else {
           const redirectUrl = result[0].fullurl;
           const upClick = result[0].clicks + 1;
           const updateClick = "UPDATE short_url SET clicks=? WHERE shorturl=?";
           db.query(updateClick, [upClick,uk]);
           res.redirect(redirectUrl);
        }
    });
})

// Post req for adding url and key to DB
app.post('/saveurl', (req, res) => {
    const furl = req.body.furl;
    const ukey = req.body.ukey;

    const insSql = "INSERT INTO short_url (fullurl , shorturl) VALUES (?,?)";

    db.query(insSql, [furl,ukey],(err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(ukey);
        }
    })
})




app.listen(port, (req, res) => {
    console.log('Server started at port: ' + port);
});