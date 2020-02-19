const express = require("express");
const nunjucks = require('nunjucks');

const server = express();

//Congurando servidor
server.use(express.static('public'));
server.use(express.urlencoded({extended: true}));


// Configurando a template engine
nunjucks.configure("./",{
    express: server,
    noCache: true
});

const donors = [
    {
        name: "Ana Clara",
        blood: "AB+"
    },
    {
        name: " Cleiton Souza",
        blood: "B+"
    },
    {
        name: "Robson Marques",
        blood: "A+"
    },
    {
        name: " Mayk Brito ",
        blood: "O+"
    }


];


server.get("/", function(req, res){
    return res.render("index.html", {donors});
});

server.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    donors.push({
        name: name, 
        blood: blood
    });

    return res.redirect("/");
});


server.listen(3333, () =>{
    console.log("start server");
});