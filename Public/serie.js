async function henteSerie() {
    const res = await fetch('/serie')
    const data = await res.json();

    console.log(data)

    for (let serie of data) {
        console.log(serie.navn);

        // Ved å dele opp creat elementene så kan jeg gi de forskjellig utsener.
        const serieNavn = document.createElement('h3');
        serieNavn.innerText = serie.navn;

        const seriePlakat = document.createElement('img');
        seriePlakat.src = serie.plakat;
        seriePlakat.style.maxWidth='150px';

        const serieBio = document.createElement('p');
        serieBio.innerText = serie.bio;

        serieBio.style.display  = 'none' //styling element må stå med det de styler hvis det er en create element

        document.querySelector('#serie').append(serieNavn, seriePlakat, serieBio);
    }
}

henteSerie();

// Plan
// 1. Bio ikke syneligt
//2. når bruker hovrer over en plakat blir bio syneligt
// 3. hvis bruker trykker på plakat får de opp full bio under (egen side til slutt)
// 4. Show ved siden av hverandre
// fetch ?(bruker søk) bruker kan søke opp show
