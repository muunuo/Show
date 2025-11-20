//Dokumentet dekker alle js spøringer koblet til bruker.
//dette inkluderer ting som brukernavn, profilbilde, bio osv.

async function henteBruker() {
    const res = await fetch('/bruker')
    const dataBruker = await res.json();

    console.log(dataBruker)

    for (let bruker of dataBruker) {
        console.log(bruker.brukernavn);

        // Ved å dele opp creat elementene så kan jeg gi de forskjellig utsener.
        const bNavn = document.createElement('p');
        bNavn.innerText = bruker.brukernavn;

        const profilbilde = document.createElement('img');
        profilbilde.src = bruker.profilbilde;
        profilbilde.style.maxWidth ='150px';

        const bio = document.createElement('p');
        bio.innerText = bruker.bio;

        document.querySelector('#visBruker').append(bNavn, profilbilde, bio);
    }
};

//Alle brukere vises nå.
//Nå må jeg knytte det opp til inloggings skjema, så kun den du logger inn som vises
// Kanskje gjøre at hvis du logger inn som en som ikke eksisterer, kommer du ikke inn??


henteBruker();