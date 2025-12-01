//Viser brukernavn på toppen av siden

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
        if (vis) vis.innerText = ` ${bruker.brukernavn} (${bruker.navn})`;//hvis #visBruker finnes, skriver vi brukernavn og navn i den
    } catch (visser) {
        console.error(visser);
    }
})(); 


/*
-------------------------------
    ANBEFALT
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
                h3.textContent = `${an.navn} (${an.ar})`;
                serieDiv.appendChild(h3);

                const p = document.createElement('p');
                p.textContent = `${an.bio}`;
                serieDiv.appendChild(p);

                const kommentar = document.createElement('p');
                kommentar.textContent = `Kommentar: ${an.kommentar}`;
                serieDiv.appendChild(kommentar);

                if (an.plakat) {
                    const bilde = document.createElement('img'); //lager bildet
                    bilde.src = an.plakat //henter bilde fra serie.plakat
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