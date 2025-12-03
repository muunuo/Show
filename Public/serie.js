async function henteAlleSerier() {
    const res = await fetch('/alleSerier'); //venter til den får infoen fra /serie
    const serieData = await res.json(); //venter til den får svar fra json

    for (const serie of serieData) { //for hver ting innenfor data, opprettes en serie variable.

        const serieDiv = document.createElement('div');//lager et sted for å ha serie
        serieDiv.classList.add('serieKonteiner');

        // Delte create element så jeg kan endre utsene lettere.
        const h3 = document.createElement('h3');
        h3.textContent = `${serie.navn} (${serie.ar})`;
        serieDiv.appendChild(h3);

        const p = document.createElement('p');
        p.textContent = `${serie.bio}`;
        serieDiv.appendChild(p);

        if (serie.plakat) {// bilde av hver sierie
            const link = document.createElement('a');// lager en link
            link.herf = `serie.html?id${serie.id}`; // knytter inn serie tabell
            const bilde = document.createElement('img');//lager bildet
            bilde.src = serie.plakat // bruker kan legge inn en link som jeg gjør om til bilde. 
            // bilde.src = "/plakat/" + serie.plakat; //her måtte jeg allerede ha bilde
            bilde.alt = serie.navn;
            bilde.style.cursor = 'pointer';// viser bruker de kan trykke på bildet (fremtidig tjeneste)
            bilde.style.width = '150px';

            link.appendChild(bilde);
            serieDiv.appendChild(link);
        }

        document.querySelector('#serie').appendChild(serieDiv); //sier hvor alt over skal ende opp
    }
}



henteAlleSerier();
