// Server-bit: Setter opp en express-app
const express = require("express");
const app = express();
const Database = require("better-sqlite3"); 

const db = new Database("showDatabase.db"); 

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/opprettKonto", (req, res)=> {
    const {opprettBrukernavn, opprettPassord, navn} = req.body;

    try { // fungerer ikke enda. Mangler å sette det inn i databasen.
        const insert = db.prepare("INSERT INTO bruker (brukernavn, passord, navn) VALUES (?, ?, ?)");
        insert.run(opprettBrukernavn, opprettPassord, navn);
        
        res.send("Konto opprettet!");
    } catch (error) {
        console.log(error);
        res.send("Feil ved opprettelse");
    }
});

app.get("/innlogget", (req, res)=> {
    res.sendFile(__dirname + "/innlogget.html")
});

// app.post("/opprettKonto", (req, res)=> {
//     const { navn, brukernavn, passord} = req.body

//     db.query("SELECT brukernavn FROM bruker WHERE brukernavn = ?", [brukernavn], async (error), ress => {
//         if (error) {
//             console.log(error)
//         }
//     });
// });





// setter opp en port på serveren, og nå kjører den
app.listen(3000, () => {
    console.log("server kjører i port http://localhost:3000")
});

// let loggInn = true
// let innKnapp = document.getElementById("loggInnKnapp")
// loggInnKnapp.addEventListener(click, "innKnapp")

// function inn() {
//     if (loggInn == true) {
//         app.get("/", (req, res)=> {
//         res.sendFile(__dirname + "/innlogget.html")
//     });
//     };
// };