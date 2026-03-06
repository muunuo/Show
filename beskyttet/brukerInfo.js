/*
-------------------------------
    BRUKERNAVN
-------------------------------
*/
(async function () {
    const params = new URLSearchParams(window.location.search); //hent noe fra søkefeltet
    const id = params.get("id"); //hent id fra søkefeltet
    if (!id) return console.warn("Ingen bruker-id i URL"); //! = mangler

    try {
        const idB = await fetch(`/bruker/${id}`);//vent til du har id
        if (!idB.ok) throw new Error("Feil ved henting av bruker");//hvis ingen id fra bruker tabell
        const bruker = await idB.json();

        const vis = document.querySelector("#visBrukere"); //viser info i #visBruker (i html)
        if (vis) vis.innerText = ` ${bruker.navn} @${bruker.brukernavn}`;//hvis #visBruker finnes, skriver vi brukernavn og navn i den
    } catch (visser) {
        console.error(visser);
    }
})();


/*
-------------------------------
    ANBEFALT av andre
-------------------------------
*/

    (async function () {
    const params = new URLSearchParams(window.location.search); //hent noe fra søkefeltet
    const mottakerID = params.get("id"); //hent id fra søkefeltet
    
    if (!mottakerID) return console.warn("Ingen bruker-id i URL"); //! = mangler

    
    try {
        const hent = await fetch(`/anbefalt/${mottakerID}`); //vent til du har id
        if (!hent.ok) throw new Error("Feil ved henting av bruker"); //hvis ingen id fra bruker tabell
        const anbefaling = await hent.json();

        const vis = document.querySelector("#anbefalt"); //heter div med id anbefalt 
        if (vis) { //om anbefalt vises
            for (const an of anbefaling) { //for hver ting innenfor anvefaling lages følgende: //an = anbefalt av venner
                const serieDiv = document.createElement('div');
                serieDiv.classList.add('serieKonteiner');// oppretter en klasse som heter serieKontainer
                // alt under legges inn i en serie konteiner (background color i css for å se)

                const h3 = document.createElement('h3');
                h3.textContent = `${an.navn}`;
                serieDiv.appendChild(h3);

                const under = document.createElement('p');
                under.textContent = `${an.ar}`;
                serieDiv.appendChild(under);

                const p = document.createElement('p');
                p.textContent = `${an.bio}`;
                serieDiv.appendChild(p);
                p.style.display = 'none';

                if (an.plakat) {
                    const bilde = document.createElement('img'); //lager bildet
                    bilde.src = an.plakat //henter bilde fra serie.plakat
                    bilde.alt = serie.navn;
                    bilde.style.width = '120px';
                    serieDiv.appendChild(bilde);
                }

                const kommentar = document.createElement('p');
                kommentar.textContent = `${an.kommentar}`;
                serieDiv.appendChild(kommentar);

                /*
                -------------------------------
                SLETTE FUNKSJON
                -------------------------------
                */
                
                const slettKnapp = document.createElement('button');
                slettKnapp.textContent = "Avslå Anbefaling";
                slettKnapp.classList.add('KnappForSletting');

                slettKnapp.addEventListener('click', async () => {
                
                    if (confirm(`Er du sikker at du vil avslå anbefalinger for "${an.navn}"?`)) {
                        try {
                            const svar = await fetch (`/anbefalt/${encodeURIComponent(an.idA)}`, {//henter anbefalingen
                                method: 'DELETE' // Sletter anbefalingen
                            });
                            if (svar.ok) {
                                serieDiv.remove();
                                alert("anbefaling fjernet");
                            } else {
                                alert("feil ved sletting");
                            }
                        } catch (error) {
                            console.error(error);
                            alert("feil ved sletting");
                        }

                        }
                });

                vis.appendChild(serieDiv);
                serieDiv.appendChild(slettKnapp);
            }

            
        }
    } catch (visser) {
        console.error(visser);
    }
})();

/*
-------------------------------
HAR SETT SEKSJON
-------------------------------
*/

    (async function () {
    const params = new URLSearchParams(window.location.search); //hent noe fra søkefeltet
    const person = params.get("id"); //hent id fra søkefeltet
    
    if (!person) return console.warn("Ingen bruker-id i URL"); //! = mangler

    
    try {
        const hent = await fetch(`/harSett/${person}`); //vent til du har id
        if (!hent.ok) throw new Error("Feil ved henting av bruker"); //hvis ingen id fra bruker tabell
        const harSett = await hent.json();

        const vis = document.querySelector("#harSett"); //heter div med id anbefalt 
        if (vis) { //om anbefalt vises
            for (const sett of harSett) { //for hver ting innenfor anvefaling lages følgende: //sett = show du har sett
                const serieDiv = document.createElement('div');
                serieDiv.classList.add('serieKonteiner');// oppretter en klasse som heter serieKontainer
                // alt under legges inn i en serie konteiner (background color i css for å se)

                const h3 = document.createElement('h3');
                h3.textContent = `${sett.navn}`;
                serieDiv.appendChild(h3);

                const under = document.createElement('p');
                under.textContent = `${sett.ar}`;
                serieDiv.appendChild(under);

                const p = document.createElement('p');
                p.textContent = `${sett.bio}`;
                serieDiv.appendChild(p);
                p.style.display = 'none';

                if (sett.plakat) {
                    const bilde = document.createElement('img'); //lager bildet
                    bilde.src = sett.plakat //henter bilde fra serie.plakat
                    bilde.alt = serie.navn;
                    bilde.style.width = '120px';
                    serieDiv.appendChild(bilde);
                }

                vis.appendChild(serieDiv);
            }

            
        }
    } catch (visser) {
        console.error(visser);
    }
})();




(async function () {
    const params = new URLSearchParams(window.location.search); //hent noe fra søkefeltet
    const person = params.get("id"); //hent id fra søkefeltet
    
    if (!person) return console.warn("Ingen bruker-id i URL"); //! = mangler

    
    try {
        const hent = await fetch(`/serPa/${person}`); //vent til du har id
        if (!hent.ok) throw new Error("Feil ved henting av bruker"); //hvis ingen id fra bruker tabell
        const serPa = await hent.json();

        const vis = document.querySelector("#serPa"); //heter div med id anbefalt 
        if (vis) { //om anbefalt vises
            for (const ser of serPa) { //for hver ting innenfor anvefaling lages følgende: //sett = show du har sett
                const serieDiv = document.createElement('div');
                serieDiv.classList.add('serieKonteiner');// oppretter en klasse som heter serieKontainer
                // alt under legges inn i en serie konteiner (background color i css for å se)

                const h3 = document.createElement('h3');
                h3.textContent = `${ser.navn}`;
                serieDiv.appendChild(h3);

                const under = document.createElement('p');
                under.textContent = `${ser.ar}`;
                serieDiv.appendChild(under);

                const p = document.createElement('p');
                p.textContent = `${ser.bio}`;
                serieDiv.appendChild(p);
                p.style.display = 'none';

                if (ser.plakat) {
                    const bilde = document.createElement('img'); //lager bildet
                    bilde.src = ser.plakat //henter bilde fra serie.plakat
                    bilde.alt = serie.navn;
                    bilde.style.width = '120px';
                    serieDiv.appendChild(bilde);
                }

                vis.appendChild(serieDiv);
            }

            
        }
    } catch (visser) {
        console.error(visser);
    }
})();


(async function () {
    const params = new URLSearchParams(window.location.search); //hent noe fra søkefeltet
    const person = params.get("id"); //hent id fra søkefeltet
    
    if (!person) return console.warn("Ingen bruker-id i URL"); //! = mangler

    
    try {
        const hent = await fetch(`/vilSe/${person}`); //vent til du har id
        if (!hent.ok) throw new Error("Feil ved henting av bruker"); //hvis ingen id fra bruker tabell
        const vilSe = await hent.json();

        const vis = document.querySelector("#vilSe"); //heter div med id anbefalt 
        if (vis) { //om anbefalt vises
            for (const vil of vilSe) { //for hver ting innenfor anvefaling lages følgende: //sett = show du har sett
                const serieDiv = document.createElement('div');
                serieDiv.classList.add('serieKonteiner');// oppretter en klasse som heter serieKontainer
                // alt under legges inn i en serie konteiner (background color i css for å se)

                const h3 = document.createElement('h3');
                h3.textContent = `${vil.navn}`;
                serieDiv.appendChild(h3);

                const under = document.createElement('p');
                under.textContent = `${vil.ar}`;
                serieDiv.appendChild(under);

                const p = document.createElement('p');
                p.textContent = `${vil.bio}`;
                serieDiv.appendChild(p);
                p.style.display = 'none';

                if (vil.plakat) {
                    const bilde = document.createElement('img'); //lager bildet
                    bilde.src = vil.plakat //henter bilde fra serie.plakat
                    bilde.alt = serie.navn;
                    bilde.style.width = '120px';
                    serieDiv.appendChild(bilde);
                }

                vis.appendChild(serieDiv);
            }

            
        }
    } catch (visser) {
        console.error(visser);
    }
})();

document.getElementById('anbefalForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const sender = params.get('id'); // hent aktiv bruker-id

    const Aserie = document.getElementById('Aserie').value;
    const motaker = document.getElementById('motaker').value;
    const kommentar = document.getElementById('kommentar').value;

    const res = await fetch('/anbefalAndre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Aserie, sender, motaker, kommentar })
    });

    const json = await res.json();
    if (res.ok) {
        alert('Anbefaling sendt');
        e.target.reset();
    } else {
        alert('Feil: ' + (json.error || 'ukjent'));
    }
});

// document.getElementById('anbefalForm')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const Aserie = document.getElementById('Aserie').value;
//     const sender = new URLSearchParams(window.location.search).get('id'); // hent aktiv bruker-id
//     const motaker = document.getElementById('motaker').value;
//     const kommentar = document.getElementById('kommentar').value;

//     const res = await fetch('/anbefalAndre', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ Aserie, sender, motaker, kommentar })
//     });

//     const json = await res.json();
//     if (res.ok) {
//         alert('Anbefaling sendt');
//         e.target.reset();
//     } else {
//     alert('Feil: ' + (json.error || 'ukjent'));
//     }
// });








// // prøver å lage en anbefal til andre seksjon. Setter opp en dropdown med de forskjellige valgene
// (async function () {
//     const params = new URLSearchParams(window.location.search);
//     const senderID = params.get("id");

//     if (!senderID) return console.warn("Ingen brukerid i URL");

//     try {
//         // const hent = await fetch(`/anbefalt/${mottakerID}`); //vent til du har id
//         // if (!hent.ok) throw new Error("Feil ved henting av bruker"); //hvis ingen id fra bruker tabell
//         // const anbefaling = await hent.json();
//         // const vis = document.querySelector("#anbefalt");

//         const velgSerie = document.createElement('select');
//         velgSerie.classList.add('velgSerieKontainer');
//         if (vis) {
//             for (const an of anbefaling) {

//                 const valg = document.createElement('option');
//                 valg.textContent = `${an.navn}`;
//                 velgSerie.appendChild(option);

//             }
//                 }
//     }

// })();