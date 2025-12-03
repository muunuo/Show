# Serie nettside

Følgende nettside er kodet i håp om å ha et enkelt sted å smale serier jeg ser på, vil se på og har sett. Det skal i tilleg 

## Prosjekt

````
Takk til følgende folk for ekstra hjelp:
Jo Bjørnar
Felix
Tim
Alex
Andre i klassen som sitter rundt meg
````

mangler:
* vidio
* bilde av SQL fil
* størelse på bildene


bruker kan nå legge inn sine egene bilder som brukes for seriene. 

## Database

#### Første databasen

For mitt første forsøk brukte jeg en sosiale media database som et utgangspunkt.

![En database som betår av 14 tabeller. Den er tegnet på papir og highlither har blitt brukt til å makere de forskjellige tabellene](/bilder_ikkePublic/storDatabase.jpg)

Som du kan se første dette til en stor, overkomplisert database. Jeg brukte en del tid på å kutte forskjellige deler frem til jeg fikk noe som så litt mindre overvelmene ut. 
![En database som betår av 6 tabeller koblet sammen, og en 7 som er tom. Den er tegnet på papir. Noen av tabellene inkluderer bruker, show, anbefale, venner, konto og anbefaleShow som var brukt til å unngå en mange til mange kobling.](/bilder_ikkePublic/mediumDatabase.jpg)

Databasen til nettsiden jeg ente opp å bruke er en svært forenklet versjon av den over, som jeg lagte ved hjelp av min lærer, Jo Bjørnar. <br>
![En database som betår av 4 tabeller koblet sammen, en av de er makert "valgfri". Den makert valgfri heter konto. De tre andre er bruker, anbefaling og serie.](/bilder_ikkePublic/litenDatabase.jpg)

Som du kan se på bildet har databasen 4 tabeller, en makert valgfri, som vil tillate bruker å gjøre følgende ting:

1. Legge inn serier
2. Si hva serier de: 
    - ønsker å se
    - har sett
    - holder på å se
3. Få og gi serie anbefalinger til "venner".
4. Lar brukere legge inn bilder. Både profilbilde og plakater til serier.
5. Bruker kan legge igjen kommentarter på serier som "venner" kan lese.
6. Bruker kan ha et navn og et brukernavn.
7. Bruker kan gi stjerner til serier for å vise hva de liker/ ikke liker.

Her er databasen sutte opp i SQLite. Konto har blitt fjernet for nå. 

![Bilde av en SQL database som består av 3 tabeller. Bruker, anbefaling og serie. anbefaling har idA, serieID, motakerID, senderID og kommentar. Bruker har id, navn, brukernavn, passord, profilbilde. Serie har idS, navn, bio, ar(år), plakat og stjerne.](/bilder_ikkePublic/SQLdatabase)

### Fremtidig
_Hvis_ tiden tillater ønsker jeg også å legge til følgende ting:

1. Beskyttet innlogging og passord.
2. Show hentes fra en database (bruker må ikke manuelt ligge inn show)
3. Bruker kan søke opp show fra databasen
4. Show har sjangere og nøkkelord.
5. Ransjere hvor viktig det er at vennen din ser anbefalingene
6. Venneliste, bio, osv.
7. Unike brukernavn (navn kan være like)
8. (Usansyneligt) Show kan anbefales til brukere av nettsiden basert på hva brukeren tidligere har sett på.

# Så langt har jeg fullført følgende

1. sutte opp en enkel database
2. Tegnet opp hvordan nettsiden skal se ut.
3. Sette opp og begynne på et .md dokument.
4. Sette opp et eget reposetry og levere dette til lærer. 
5. Sutte opp server
6. Sutte opp så html ligger på server
7. sutte opp (ubeskyttet) oppretting av konto
8. Sutte opp slik at du kan gå fra pålogging siden til hovedsiden. 