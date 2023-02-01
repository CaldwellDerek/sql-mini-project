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

// db.query("SELECT * FROM reviews", (error, data)=> {
//     if (error){
//         throw error;
//     } else {
//         console.table(data);
//     }
// })

server.get("/api/movies", (request, response) => {
    db.query("SELECT * FROM movies", (error, data)=> {
        if (error) throw error;
        response.json(data);
    })
});

server.get("/api/reviews", (request, response) => {
    db.query("SELECT * FROM reviews", (error, data)=> {
        if (error) throw error;
        response.json(data);
    })
});

server.post("/api/add-movie", (request, response)=> {
    if (request.body){
        const {movie_name} = request.body;
        
        db.query("INSERT INTO movies (movie_name) VALUES (?)", [movie_name], (error)=> {
            if (error) throw error;
        });

        response.send("Successfully added movie!");
    } else {
        response.send("Unable to add movie!");
    }
});

server.post("/api/update-review", (request, response)=> {
    if (request.body){
        const {review, movie_id} = request.body;

        db.query("UPDATE reviews SET review = ? WHERE movie_id = ?", [review, movie_id], error => {
            if (error) throw error;
        })

        response.send("Successfully updated movie!");
    } else {
        response.send("Unable to update movie!");
    }
});

server.delete("/api/movie/:id", (request, response)=> {
    db.query("DELETE FROM movies WHERE id = ?", [request.params.id], error =>{
        if (error){
            response.send("Unable to delete movie!");
            throw error;
        } else {
            response.send("Successfully delete movie!");
        }
    });
});

server.listen(PORT, ()=> {
    console.log(`SERVER RUNNING - Listening on port: ${PORT}`);
});