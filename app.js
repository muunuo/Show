// Server-bit: Setter opp en express-app
const express = require("express");
// const session = require("express-session");
const Database = require("better-sqlite3");
const cors = require("cors"); //for at henting av serier skal fungere i serie.js

const app = express();

// const corsOptions = {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }

const db = new Database("showDatabase.db"); // knytter databasen til dokumentet

app.use(express.static("public")); // sier at den skal hente ting fra public, inkludert css
app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); // Trengs for å parse JSON-data

// app.use(
//     session({
//         secret: "hemmeligNokkel", // bytter til en sikker nøkkel
//         resave: false,
//         saveUninitialized: false,
//         cookie: { secure: false} //true hvis du bruker HTTPS
//     })
// );

// function krevInnlogging(req, res, next) {
//     if (!req.session.bruker) {
//         return res.redirect("/index.html");
//     }
//     next();
// }

app.get("/", (req, res)=> { // sender deg til index i public om du tar local hoste
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/innlogget", (req, res)=> { // sender deg til innlogget når du er innlogget
    res.sendFile(__dirname + "/innlogget.html");

    // const { brukernavn, passord } = req.body;
    
    // const bruker = db.prepare("SELECT * FROM person WHERE brukernavn = ?").get(brukernavn)
    // if (!bruker) {
    //     return res.status(401).json({ message: "feil ved brukernavn eller passord"});
    // }

    // req.session.bruker = { id: bruker.id, passord: bruker.passord, brukernavn: bruker.brukernavn };
    // res.json({ message: "innlogging vellykket", redirect: "/innlogget" });
});

app.post("/opprettKonto", (req, res)=> { // oppretter en bruker konto og legger den til i databasen
    const { opprettBrukernavn, opprettPassord, navn } = req.body;
    
    try {
        console.log(opprettBrukernavn, opprettPassord, navn)
        // db.exec("CREATE TABLE IF NOT EXISTS bruker (id INTEGER PRIMARY KEY, brukernavn TEXT, passord TEXT, navn TEXT)");
        const insert = db.prepare("INSERT INTO bruker (brukernavn, passord, navn) VALUES (?, ?, ?)");
        insert.run(opprettBrukernavn, opprettPassord, navn);

        res.send("Konto opprettet!");
    } catch (error) {
        console.log(error);
        res.send("Feil ved opprettelse");
    }
});

app.post("/opprettSerie", (req, res)=> { // oppretter en bruker konto og legger den til i databasen
    const { serieNavn, serieBio, seriePlakat } = req.body;
    
    try {
        console.log(serieNavn, serieBio, seriePlakat)
        const insert = db.prepare("INSERT INTO serie (navn, bio, plakat) VALUES (?, ?, ?)");
        insert.run(serieNavn, serieBio, seriePlakat);

        res.send("serie opprettet!");
    } catch (error) {
        console.log(error);
        res.send("serie ved opprettelse");
    }
});

app.get("/serie", (req, res) => {
    const serieListe = db.prepare("SELECT * FROM serie").all();
    res.json(serieListe);
    console.log(serieListe)
});


// setter opp en port på serveren, og nå kjører den
app.listen(3000, () => { // sier hvor serveren skal kjøre
    console.log("server kjører i port http://localhost:3000")
});