const express = require("express");
const mysql = require("mysql2");
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: false}));
server.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movie_db'
    }
)

db.query("SELECT * FROM reviews", (error, data)=> {
    if (error){
        throw error;
    } else {
        console.table(data);
    }
})

server.listen(PORT, ()=> {
    console.log(`SERVER RUNNING - Listening on port: ${PORT}`);
});