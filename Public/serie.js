async function henteAlleSerier() {
    const res = await fetch('/alleSerier'); //venter til den får infoen fra /serie
    const serieData = await res.json(); //venter til den får svar fra json

    // console.log(data);

    for (const serie of serieData) { //for hver ting innenfor data, opprettes en serie variable.
        // console.log(serie.navn);

        const serieDiv = document.createElement('div');
        serieDiv.classList.add('serieKonteiner');

        // Ved å dele opp creat elementene så kan jeg gi de forskjellig utsener.
        const h3 = document.createElement('h3');
        h3.textContent = `${serie.navn}`;
        serieDiv.appendChild(h3);

        const p = document.createElement('p');
        p.textContent = `${serie.bio}`;
        serieDiv.appendChild(p);

        if (serie.plakat) {
            const link = document.createElement('a');
            link.herf = `serie.html?id${serie.id}`;
            const bilde = document.createElement('img');
            bilde.src = serie.plakat // bruker kan legge inn en link som jeg gjør om til bilde. 
            // bilde.src = "/plakat/" + serie.plakat; //her måtte jeg allerede ha bilde
            bilde.alt = serie.navn;
            bilde.style.cursor = 'pointer';
            bilde.style.width = '150px';

            link.appendChild(bilde);
            serieDiv.appendChild(link);
        }

        document.querySelector('#serie').appendChild(serieDiv);

        // const seriePlakat = document.createElement('img');
        // seriePlakat.src = serie.plakat;
        // seriePlakat.style.maxWidth='150px';

        // const serieBio = document.createElement('p');
        // serieBio.innerText = serie.bio;

        // serieBio.style.display  = 'none' //styling element må stå med det de styler hvis det er en create element

        // document.querySelector('#serie').append(serieNavn, seriePlakat, serieBio);
    }
}

henteAlleSerier();

// Plan
// 1. Bio ikke syneligt
//2. når bruker hovrer over en plakat blir bio syneligt
// 3. hvis bruker trykker på plakat får de opp full bio under (egen side til slutt)
// 4. Show ved siden av hverandre
// fetch ?(bruker søk) bruker kan søke opp show
