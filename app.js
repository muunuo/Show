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

// app.get("/innlogget", (req, res)=> {
//     const { brukernavn, passord } = req.body

//     try {
//         const select = db.prepare("SELECT FROM bruker (brukernavn, passord) VALUES (?,?,?)");
//         select.run(brukernavn, passord);
//         res.sendFile(__dirname + "/innlogget.html");
//     } catch (error) {
//         console.log(error);
//     }
    
// });

// setter opp en port på serveren, og nå kjører den
app.listen(3000, () => {
    console.log("server kjører i port http://localhost:3000")
});