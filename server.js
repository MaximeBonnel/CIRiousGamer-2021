/**** Import npm libs ****/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jf = require('jsonfile');
const session = require("express-session")({
    // CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});

const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const mysql = require('mysql');

// Connexion à la base de donnée
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ciriousgame"
});

con.connect(err => {
    if (err) throw err;
    else console.log('Connexion a mysql effectuée');
});
/***************/

const bcrypt = require('bcryptjs');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/Front'));
app.use(urlencodedParser);
app.use(session);
app.use(express.json());

// Le serveur ecoute sur ce port
http.listen(8880, () => {
    console.log('Serveur lancé sur le port 8880');
})

io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));

// redirige vers la page d'accueil
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/Front/HTML/index.html');
    let sessionData = req.session;
});

// redirige vers la page de connexion si l'URL contient '/login'
app.get("/login", (req, res) => {
    res.sendFile(__dirname + '/Front/HTML/login.html');
});


// redirige vers la page d'enregistrement si l'URL contient '/register'
app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/Front/HTML/register.html');
});

// redirige vers la page de la carte si l'URL contient '/map'
app.get("/map", (req, res) => {
    res.sendFile(__dirname + '/Front/map/world.html');
});

// redirige vers la page du wiki si l'URL contient '/wiki'
app.get("/wiki", (req, res) => {
    res.sendFile(__dirname + '/Front/HTML/wiki.html');
});

// redirige vers la page d'attente si l'URL contient '/game'
app.get('/game', (req, res) => {
    if (req.session.username) {
        res.sendFile(__dirname + '/Front/HTML/game.html');
    } else {
        res.redirect('/login');
    }
});

// redirige vers la page de chargement si l'URL contient '/loading'
app.get('/loading', (req, res) => {
    if (req.session.username) {
        res.sendFile(__dirname + '/Front/HTML/loading.html');
    } else {
        res.redirect('/login');
    }
});

// redirige vers la page d'attente si l'URL contient '/title'
app.get('/title', (req, res) => {
    if (req.session.username) {
        res.sendFile(__dirname + '/Front/HTML/TitleScene.html');
    } else {
        res.redirect('/login');
    }
});

// Directement après la connexion d'un socket au serveur
io.on('connection', (socket) => {
    socket.on("register", (info) => {
        //console.log("wsh les gars");
        let sql = "INSERT INTO users VALUES (default,?,?)";
        con.query(sql, [info[0], info[1]], (err, res) => {
            if (err) throw err;

            console.log("personne ajouté")
        });
    });

    fs.readFile("json/pays.json", function (event, fileName) {
        jf.readFile('json/pays.json', function (err, data) {
            var data = data;
            console.log('sent');
            socket.emit('envoie', data);
        });
    });


    socket.on("getScore", () => {
        socket.emit("sendScore", (scoreHandler.getScores()))
        socket.handshake.session.ready = undefined;
    })

    socket.on("isSession", () => {
        socket.emit("onSession", socket.handshake.session.username)
    });

    socket.on("username", (info) => {
        let sql = "SELECT username FROM users WHERE username = ?";
        con.query(sql, [info[0]], (err, res) => {
            if (err) throw err;
            socket.emit("resultUser", res)
        });
    });

    socket.on("usernameExist", (username) => {
        let sql = "SELECT username FROM users WHERE username = ?";
        con.query(sql, [username], (err, res) => {
            if (err) throw err;
            if (res[0] === undefined) {
                socket.emit("usernameExistRep", false);
            } else {
                socket.emit("usernameExistRep", true);
            }
        });
    });

    socket.on("password", (username) => {
        let sql = "SELECT password FROM users WHERE username = ?";
        con.query(sql, username, (err, res) => {
            if (err) throw err;
            if (res.length != 0) {
                socket.emit("resultPass", res[0].password);
            } else {
                socket.emit("wrongUsername");
            }
        });
    });

    socket.on("crypt", (info) => {
        bcrypt.hash(info, 10, function (err, hash) {
            if (err) throw err;
            socket.emit("resultCrypt", hash);
        });
    });

    socket.on("decrypt", (info) => {
        bcrypt.compare(info[0], info[1], function (err, res) {
            if (err) throw err;
            socket.emit("resultDecrypt", res);
        });
    });
});

app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
    const login = req.body.login
    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw errors;
    } else {
        // Store login
        req.session.username = login;
        req.session.ready = undefined;
        req.session.save()
        res.redirect('/');
        console.log(login + " connected");
    }
});