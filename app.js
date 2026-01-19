/*
-------------------------------
    OPPSETT
-------------------------------
*/
// Server-delen: Setter opp en express-app
const express = require('express');
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express(); //express henter ting?
const PORT = 3000;

/*
-------------------------------
    MIDDLEWARE
-------------------------------
*/
app.use(express.static('public')); // lar oss hente fra public mappen
app.use(express.json()); // parse (løse) json fra request body

// app.use(express.static('beskyttet')); //sier de kan hente fra beskyttet (må endres om beskyttet noen gang blir beskyttet)
app.use(express.urlencoded({ extended: true })); //lar oss hente ting fra søkebaren

const path = require('path'); //for å håntere filstier

/* 
-------------------------------
    DATABASE
-------------------------------
*/

const Database = require('better-sqlite3');
const db = new Database('showDatabase.db'); // knytter databasen til dokumentet

db.exec(`
CREATE TABLE IF NOT EXISTS bruker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    navn TEXT,
    brukernavn TEXT,
    passord TEXT,
    profilbilde BLOB,
    bio TEXT
);

CREATE TABLE IF NOT EXISTS serie (
    idS INTEGER PRIMARY KEY AUTOINCREMENT,
    navn TEXT,
    bio TEXT,
    ar INTEGER,
    plakat TEXT,
    stjerner INTEGER
);

CREATE TABLE IF NOT EXISTS anbefaling (
    idA INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    serieID INTEGER,
    motakerID INTEGER,
    senderID INTEGER,
    kommentar TEXT,
    FOREIGN KEY (serieID) REFERENCES serie(idS),
    FOREIGN KEY (motakerID) REFERENCES bruker(id),
    FOREIGN KEY (senderID) REFERENCES bruker(id)
);

CREATE TABLE IF NOT EXISTS serieStatus (
    serieStatusID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    idS INTEGER REFERENCES serie(idS),
    idB INTEGER REFERENCES bruker(id),
    status TEXT
);
`);

function kreverInnlogging(req, res, next) {
    if (!req.session.bruker) {
        return res.redirect("/");
    }
    next();
}

app.use('/beskyttet', kreverInnlogging, express.static(path.join(__dirname, 'beskyttet')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


/*
-------------------------------
    BRUKERE
-------------------------------
*/

// app.get("/api/minside",kreverInnlogging, (req, res) => {
//     const brukerId = req.session.bruker.id;
//     const bruker = db.prepare("SELECT id, brukernavn, navn, passord FROM bruker WHERE id = ?").get(brukerId);
//     res.json({ bruker });
// });

app.post('/opprettKonto', async (req, res) => { // Oppretter ny brukerkonto
    const { brukernavn, navn, passord } = req.body;
    
    const eksisterendeBruker = db.prepare("SELECT * FROM bruker WHERE brukernavn = ?").get(brukernavn)
    if (eksisterendeBruker) {
        return res.status(400).json({ message: "Bruker med dette brukernavnet eksisterer allerede"});
    }

    try { //ser om den kan gjøre følgende
        const saltRounds = 10;
        const hashPassord = await bcrypt.hash(passord, saltRounds);

        const stmt = db.prepare('INSERT INTO bruker (brukernavn, navn, passord) VALUES (?, ?, ?)'); //sier hvor det skal settes inn
        const info = stmt.run(brukernavn, navn, hashPassord);//sier det skal settes inn
        
        res.status(201).json({ message: "Konto opprettet!", id: info.lastInsertRowid});

    } catch (error) { //hvis den ikke klarte å gjøre det så gjør den følgende
        console.log(error);//Error: viser frem feilmeldinger
        res.status(500).json({message: "Feil ved opprettelse"});
    }
});

app.post('/innlogget', async (req, res)=> { // Lar deg logge inn
    const {brukernavn, passord} = req.body; //henter brukernavn og passord fra body
    
    const bruker = db.prepare('SELECT * FROM bruker WHERE brukernavn = ?').get(brukernavn);//henter alle brukernavn og passord
    if (!bruker) { //hvis noe mangler får du failmelding
        return res.status(401).json({ message: "feil brukernavn eller passord"});
    }

    const gyldigPassord = await bcrypt.compare(passord, bruker.passord);
    if (!gyldigPassord) {
        return res.status(401).json({ message: "feil brukernavn eller passord"});
    }
    // req.session.bruker = { id: bruker.id, brukernavn: bruker.brukernavn };
    res.json("Innlogget vellykket"); //hvis det fungerer får du få videre
});

// app.post("/api/logout", (req, res) => {
//     req.session.destroy();
//     res.json({message: "Du er nå logget ut"});
// }) 

// app.get('/bruker/:id', (req, res) => { //Vise frem brukernavn når innlogget
//     const id = req.params.id;
//     const brukerInfo = db.prepare('SELECT id, brukernavn, navn FROM bruker WHERE id = ?').get(id); //Henter ut info fra bruker med x id.
//     if (!brukerInfo) return res.status(404).json({ message: "bruker ikke funnet" }); //hvis noe mangler: Feilmelding
//     res.json(brukerInfo);
// });

// /*
// -------------------------------
//     SERIE
// -------------------------------
// */
// app.post('/opprettSerie', (req, res)=> { // oppretter en serie
//     const { serieNavn, serieBio, seriePlakat } = req.body;

//     try {
//         console.log(serieNavn, serieBio, seriePlakat)
//         const insert = db.prepare('INSERT INTO serie (navn, bio, plakat) VALUES (?, ?, ?)');
//         insert.run(serieNavn, serieBio, seriePlakat);
//     } catch (error) {
//         console.log(error);
//         res.send("serie ved opprettelse"); //sender meldingen om catch eller try blir trigget
//     }
// });

// app.get('/alleSerier', (req, res) => { //viser alle serier i serie.html
//     const serieListe = db.prepare('SELECT * FROM serie').all();

//     res.json(serieListe);
    
// });

// /*
// -------------------------------
//     sett/ser
// -------------------------------
// */
// app.get('/harSett/:id', (req, res) => { 
//     const person = req.params.id;
//     const sjekkStatus = db.prepare(`
//         SELECT serieStatus.*, serie.*
//         FROM serieStatus
//         INNER JOIN serie ON serieStatus.idS = serie.idS 
//         WHERE status = 'sett'
//         AND serieStatus.idB = ?
//         `).all(person)

//     res.json(sjekkStatus)

// });//Må søke opp: http://localhost:3000/harSett/18?status=sett

// app.get('/serPa/:id', (req, res) => { 
//     const person = req.params.id;
//     const sjekkStatus = db.prepare(`
//         SELECT serieStatus.*, serie.*
//         FROM serieStatus
//         INNER JOIN serie ON serieStatus.idS = serie.idS 
//         WHERE status = 'ser'
//         AND serieStatus.idB = ?
//         `).all(person)

//     res.json(sjekkStatus)

// });

// app.get('/vilSe/:id', (req, res) => { 
//     const person = req.params.id;
//     const sjekkStatus = db.prepare(`
//         SELECT serieStatus.*, serie.*
//         FROM serieStatus
//         INNER JOIN serie ON serieStatus.idS = serie.idS 
//         WHERE status = 'vil'
//         AND serieStatus.idB = ?
//         `).all(person)

//     res.json(sjekkStatus)

// });

// /*
// -------------------------------
//     ANBEFALINGER
// -------------------------------
// */

// app.get('/anbefalt/:id', (req, res) => { //viser alle anbefalte serier med info
//     const motakerID = req.params.id;
//     const mottatAnbefaling = db.prepare(`
//         SELECT anbefaling.*, serie.*
//         FROM anbefaling
//         INNER JOIN serie ON anbefaling.serieID = serie.idS
//         WHERE anbefaling.motakerID = ?
//     `).all(motakerID);
    
//     if (!mottatAnbefaling || mottatAnbefaling.length === 0) {
//         return res.status(404).json({ message: "bruker ikke funnet" });
//     }
//     res.json(mottatAnbefaling);
// });

// app.post('/anbefalAndre', (req, res) => { //viser alle serier i serie.html
//     const { Aserie, motaker, sender, kommentar } = req.body;

//     try {//ser om den kan gjøre følgende
//         const insert = db.prepare('INSERT INTO anbefaling (serieID, motakerID, senderID, kommentar) VALUES (?, ?, ?, ?)'); //sier hvor det skal settes inn
//         insert.run(Aserie, motaker, sender, kommentar);//sier det skal settes inn
//         // res.send("Konto opprettet!");
//         res.json({ ok: true, message: "Anbefaling sendt"});
//     } catch (error) { //hvis den ikke klarte å gjøre det så gjør den følgende
//         console.log(error);//Error: viser frem feilmeldinger
//         // res.send("Feil ved opprettelse");
//         res.status(500).json({error:"Feil ved opprettelse" })
//     }
// });

// // app.get('/anbefaltSok', (req, res) => { //viser alle serier i serie.html
// //     const {sok} = req.body; //henter brukernavn og passord fra body
    
// //     const sendSok = db.prepare('SELECT * FROM serie.navn WHERE sok = ?').get(sok);//henter alle brukernavn og passord
// //     if (!sendSok) { //hvis noe mangler får du failmelding
// //         return res.status(401).json({ message: "feil ved søk"});
// //     }
// //     console.log(sendSok)
// // });

// // SLETTE KNAPP
// app.delete('/anbefalt/:id', (req, res) => {
// const id = req.params.id;
// const resultat = db.prepare('DELETE FROM anbefaling WHERE idA = ?').run(id);
// //må gjøre så kun resultatene med både serie, og bruker id (mottaker) slettes
// if (resultat.changes === 0) {
//     return res.status(404).json({ error: "Anbefaling ble ikke funnet"});
// }
// res.json({ message: "anbefaling fjernet"});
// });

/*
-------------------------------
    ANNET
-------------------------------
*/

// setter opp en port på serveren, og nå kjører den
app.listen(PORT, () => {
    console.log(`Server oppe: http://localhost:${PORT}`);
});