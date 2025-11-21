//Dokumentet dekker alle js spøringer koblet til bruker.
//dette inkluderer ting som brukernavn, profilbilde, bio osv.

(async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return console.warn("Ingen bruker-id i URL");

    try {
        const res = await fetch(`/bruker/${id}`);
        if (!res.ok) throw new Error("Feil ved henting av bruker");
        const bruker = await res.json();
        // vis brukerinfo i #visBrukere
        const el = document.querySelector("#visBrukere");
        if (el) el.innerText = ` ${bruker.brukernavn} (${bruker.navn})`;
    } catch (err) {
        console.error(err);
    }
})();



// async function henteBruker() {

//     const params = new URLSearchParams(window.location.search);
//     const id = params.get('id');

//         if (!id) return console.warn("ingen bruker id i URL");

//         try {
//             const res = await fetch(`/bruker/${id}`);
//             if (!res.ok) throw new Error("feil ved henting av bruker");
//             const bruker = await res.json();

//             const el = document.querySelector¨("#visBrukere");
//             if (el) el.innerText = `logget inn som ${bruker.brukernavn} (${bruker.navn})`;
//         } catch (err) {
//             console.error(err);
//         }
// }


    // try {
    //     const response = await fetch(`/bruker/${id}`);
    //     if (!response.ok) throw new Error('bruker ikke funnet')
    // }

    // const res = await fetch('/bruker');
    // const dataBrukere = await res.json();

    // console.log(dataBrukere)

    // for (let bruker of dataBrukere) {
    //     console.log(bruker.brukernavn);

    //     // Ved å dele opp creat elementene så kan jeg gi de forskjellig utsener.
    //     const bNavn = document.createElement('p');
    //     bNavn.innerText = bruker.brukernavn;

    //     const profilbilde = document.createElement('img');
    //     profilbilde.src = bruker.profilbilde;
    //     profilbilde.style.maxWidth ='150px';

    //     const bio = document.createElement('p');
    //     bio.innerText = bruker.bio;

    //     document.querySelector('#visBrukere').append(bNavn, profilbilde, bio);
    // }

//Alle brukere vises nå.
//Nå må jeg knytte det opp til inloggings skjema, så kun den du logger inn som vises
// Kanskje gjøre at hvis du logger inn som en som ikke eksisterer, kommer du ikke inn??


// henteBruker();



// async function hentAlleBrukere() {
//     const response = await fetch('/bruker');
//     const brukerInfo = await response.json();

//     for (const bruker of dataBrukere) {
//         const brujerDiv = document.createElement('div');
//         brukerDiv.classList.add('bruker');

//         // Opprett tittel
//         const h2 = document.createElement('h2');
//         h2.textContent = `${bruker.brukernavn} (${bruker.navn})`;
//         brukerDiv.appendChild(h2);

//         // Opprett utvikler-paragraf
//         const bio = document.createElement('p');
//         const strong = document.createElement('strong');
//         strong.textContent = 'bio: ';
//         bio.appendChild(strong);
//         bio.appendChild(document.createTextNode(spel.utvikler));
//         brukerDiv.appendChild(pUtvikler);

//         // Opprett beskrivelse-paragraf
//         const pBeskrivelse = document.createElement('p');
//         pBeskrivelse.textContent = spel.beskrivelse;
//         brukerDiv.appendChild(pBeskrivelse);

//         // Opprett bilde (hvis det finnes), og en lenke rundt dette
//         if (spel.bilde) {
//             const link = document.createElement('a');
//             link.href = `spel-detalj.html?id=${spel.id}`;
            
//             const img = document.createElement('img');
//             img.src = "/bileter/" + spel.bilde;
//             img.alt = spel.tittel;
//             img.style.cursor = 'pointer';
            
//             link.appendChild(img);
//             spelDiv.appendChild(link);
//         }

//         document.querySelector('#spelsamling').appendChild(spelDiv);
//     }
// }

// visSpel();