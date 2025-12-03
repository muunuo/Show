/*  
NESTE MÅL

Hente ut anbefalinger fra databasen.

PLAN:
harkode inn anbefalinger
Vise alle anbefalinger
Vise kun en person sine anbefalinger med hardkode
Bruke lignende kode som den for å hente brukernavn til å hente anbefalingene.
*/

/*
-------------------------------
    OPPSETT
-------------------------------
*/
// Server-delen: Setter opp en express-app
const express = require('express');
const Database = require('better-sqlite3');

const app = express(); //express henter ting?

const db = new Database('showDatabase.db'); // knytter databasen til dokumentet

app.use(express.static('public')); // sier at den skal hente ting fra public, inkludert css
app.use(express.static('beskyttet')); //sier de kan hente fra beskyttet (må endres om beskyttet noen gang blir beskyttet)
app.use(express.urlencoded({ extended: true })); //lar oss hente ting fra søkebaren

app.get('/', (req, res)=> { // sender deg til index i public om du ikke søker en bestemt sti
    res.sendFile(__dirname + '/public/index.html')
});


db.exec(
'CREATE TABLE IF NOT EXISTS anbefaling (idA INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, serieID INTEGER, motakerID INTEGER, senderID INTEGER, kommentar INTEGER, CONSTRAINT anbefaling FOREIGN KEY (serieID) REFERENCES serie (idS), CONSTRAINT anbefaling FOREIGN KEY (motakerID) REFERENCES bruker (id), CONSTRAINT anbefaling FOREIGN KEY (senderID) REFERENCES bruker (id))' )
db.exec( 'CREATE TABLE IF NOT EXISTS bruker (id INTEGER PRIMARY KEY AUTOINCREMENT, navn TEXT, brukernavn TEXT, passord TEXT, profilbilde BLOB, bio TEXT)' )
db.exec( 'CREATE TABLE IF NOT EXISTS serie (idS INTEGER PRIMARY KEY AUTOINCREMENT, navn TEXT, bio TEXT, ar INTEGER, plakat TEXT, stjerner INTEGER)' )
db.exec( 'CREATE TABLE IF NOT EXISTS serieStatus (serieStatusID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, idS INTEGER REFERENCES serie (idS), idB INTEGER REFERENCES bruker (id), status)' )

/*
-------------------------------
    BRUKERE
-------------------------------
*/

app.post('/innlogget', (req, res)=> { // Lar deg logge inn

    const {brukernavn, passord} = req.body; //henter brukernavn og passord fra body
    
    const bruker = db.prepare('SELECT * FROM bruker WHERE brukernavn = ? AND passord = ?').get(brukernavn, passord);//henter alle brukernavn og passord
    if (!bruker) { //hvis noe mangler får du failmelding
        return res.status(401).json({ message: "feil ved brukernavn eller passord"});
    }
    res.redirect(`/innlogget.html?id=${bruker.id}`); //hvis det fungerer får du få videre
});

app.get('/bruker/:id', (req, res) => { //Vise frem brukernavn når innlogget
    const id = req.params.id;
    const brukerInfo = db.prepare('SELECT id, brukernavn, navn FROM bruker WHERE id = ?').get(id); //Henter ut info fra bruker med x id.
    if (!brukerInfo) return res.status(404).json({ message: "bruker ikke funnet" }); //hvis noe mangler: Feilmelding
    res.json(brukerInfo);
});

app.post('/opprettKonto', (req, res)=> { // Oppretter ny brukerkonto
    const { opprettBrukernavn, opprettPassord, navn } = req.body;
    
    try {//ser om den kan gjøre følgende
        const insert = db.prepare('INSERT INTO bruker (brukernavn, passord, navn) VALUES (?, ?, ?)'); //sier hvor det skal settes inn
        insert.run(opprettBrukernavn, opprettPassord, navn);//sier det skal settes inn
        res.send("Konto opprettet!");

    } catch (error) { //hvis den ikke klarte å gjøre det så gjør den følgende
        console.log(error);//Error: viser frem feilmeldinger
        res.send("Feil ved opprettelse");
    }
});

/*
-------------------------------
    SERIE
-------------------------------
*/
app.post('/opprettSerie', (req, res)=> { // oppretter en serie
    const { serieNavn, serieBio, seriePlakat } = req.body;

    try {
        console.log(serieNavn, serieBio, seriePlakat)
        const insert = db.prepare('INSERT INTO serie (navn, bio, plakat) VALUES (?, ?, ?)');
        insert.run(serieNavn, serieBio, seriePlakat);
    } catch (error) {
        console.log(error);
        res.send("serie ved opprettelse"); //sender meldingen om catch eller try blir trigget
    }
});

app.get('/alleSerier', (req, res) => { //viser alle serier i serie.html
    const serieListe = db.prepare('SELECT * FROM serie').all();

    res.json(serieListe);
    
});

app.get('/anbefalt/:id', (req, res) => { //viser alle anbefalte serier med info
    const motakerID = req.params.id;
    const mottatAnbefaling = db.prepare(`
        SELECT anbefaling.*, serie.*
        FROM anbefaling
        INNER JOIN serie ON anbefaling.serieID = serie.idS
        WHERE anbefaling.motakerID = ?
    `).all(motakerID);
    
    if (!mottatAnbefaling || mottatAnbefaling.length === 0) {
        return res.status(404).json({ message: "bruker ikke funnet" });
    }
    res.json(mottatAnbefaling);
});

// app.get('/anbefaltSok', (req, res) => { //viser alle serier i serie.html
//     const {sok} = req.body; //henter brukernavn og passord fra body
    
//     const sendSok = db.prepare('SELECT * FROM serie.navn WHERE sok = ?').get(sok);//henter alle brukernavn og passord
//     if (!sendSok) { //hvis noe mangler får du failmelding
//         return res.status(401).json({ message: "feil ved søk"});
//     }
//     console.log(sendSok)
// });

app.delete('/anbefalt/:id', (req, res) => {
const id = req.params.id;
const resultat = db.prepare('DELETE FROM anbefaling WHERE idA = ?').run(id);
//må gjøre så kun resultatene med både serie, og bruker id (mottaker) slettes
if (resultat.changes === 0) {
    return res.status(404).json({ error: "Anbefaling ble ikke funnet"});
}
res.json({ message: "anbefaling fjernet"});
});

/*
-------------------------------
    ANNET
-------------------------------
*/

// setter opp en port på serveren, og nå kjører den
app.listen(3000, () => { // sier hvor serveren skal kjøre
    console.log('server kjører i port http://localhost:3000')
});