const express = require("express");
const nunjucks = require('nunjucks');
const Pool = require('pg').Pool;
const server = express();

//Congurando servidor
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

//Configuracao do BANCO
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

// Configurando a template engine
nunjucks.configure("./", {
    express: server,
    noCache: true
});

server.get("/", function (req, res) {

    db.query("SELECT * FROM donors", (err, result) => {
        if(err) return res.send("Erro de banco de dados.")

        const donors = result.rows;
        return res.render("index.html", { donors });
    });
});

server.post("/", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    /*
    //Colocando no Array
        donors.push({
            name: name, 
            blood: blood
        });
    */
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obirgatórios.");
    }
    const query = `INSERT INTO "donors" ("name", "email", "blood") 
    VALUES ($1, $2, $3)`;
    const values = [name, email, blood];
    db.query(query, values, (err) => {
        if(err) return res.send("Erro no banco de dados.");
        return res.redirect("/");
    });
});


server.listen(3333, () => {
    console.log("start server");
});