// app.post("/opprettShow", (req, res)=> { // oppretter en bruker konto og legger den til i databasen
//     const { serieNavn, serieBio, seriePlakat } = req.body;
    
//     try {
//         console.log(serieNavn, serieBio, seriePlakat)
//         const insert = db.prepare("INSERT INTO bruker (navn, bio, plakat) VALUES (?, ?, ?)");
//         insert.run(serieNavn, serieBio, seriePlakat);

//         res.send("Serie opprettet!");
//     } catch (error) {
//         console.log(error);
//         res.send("Feil ved opprettelse");
//     }
// });