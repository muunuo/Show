//Viser brukernavn på toppen av siden

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


(async function () {
    const params = new URLSearchParams(window.location.search); //hent noe fra søkefeltet
    const mottakerID = params.get("id"); //hent id fra søkefeltet

    const res = await fetch('/anbefalt/:id'); //venter til den får infoen fra /serie
    // const serieData = await res.json(); //venter til den får svar fra json
    if (!mottakerID) return console.warn("Ingen bruker-id i URL"); //! = mangler



    try {
        const hent = await fetch(`/anbefalt/${mottakerID}`);//vent til du har id
        if (!hent.ok) throw new Error("Feil ved henting av bruker");//hvis ingen id fra bruker tabell
        const anbefaling = await hent.json();
        //  document.querySelector('#anbefalt').appendChild(serieDiv); //sier hvor alt over skal ende opp

        const vis = document.querySelector("#anbefalt")
        if (vis) {
            let kommentarer = "";
            //
            for (const item of anbefaling) {
                kommentarer += `${item.kommentar}\n`; //det som skal i "" er alle.kommentarer på \ny linje
            }
            vis.innerText = kommentarer; 
        }
        // document.querySelector('#anbefalt').appendChild(serieDiv); //sier hvor alt over skal ende opp
    



        // const vis = document.querySelector("#anbefalt"); //viser info i #visBruker (i html)
        // if (vis) vis.innerText = ` ${anbefaling[0].kommentar}`;//hvis #visBruker finnes, skriver vi brukernavn og navn i den
    } catch (visser) {
        console.error(visser);
    }
})(); 
