Api
Vidio
ruter
Sammenhenger i Database

ting å vise koden til: Registrere serie, sende og få anbefalinger opprette brukere/ logge inn

flytte brukerguide til nettsiden ikke her inne

# Co-Watch 📺

***Co-Watch*** is a website for friends who want to be able to talk about the same shows, but can't watch them together. Recommend shows to friends, get recommended shows by friends, and if you don't have friends, then you can register what shows you have, want to and curently are watching! 

- [Development Status](#development-status)
- [Design Process 🎨](#design-process-🎨)
- [ Features ](#features)
- [Hope to have](#hope-to-have)

## Development Status 
The project is in active development, a good amount of basic featurs have been implemented, but are missing most of the polish.

The project is in active development. Basic features are mostly complete, but we're still working toward alpha testing (target: February).

**Current Progress:**
- Core functionality: 40% ✅
- Security features: 10% 🔒
- UI/UX polish: 30% 🎨

## Design Process 🎨 

### Database
The database started off as a copy of a sosial media database, in other words, it was way to overcomplicated. I ended up redoing it a few times to make it better, and my teacher gave me the base to the finished database. 
<img src="Public/bilder/litenDatabase.jpg" alt="A databse of 3 tables and a 4th labeld extra. The database consists of user, show, recomondations and the extra is account." width= "250rem">
I then made it into a propper database using SQLiteStudio.

Later i had to add a showStatus table in order for users to say if they where watchen, wanted to watch, or had watched different shows.

### 🧑‍💻 User (bruker)

Stores information about users.

| Column    | Type    | Description     |
|-----------|---------|-----------------|
| id        | INTEGER | Primary key, autoincrement|
| username  | TEXT    | cannot be null  |
| name      | TEXT    | must be unique  |
| password  | TEXT    | cannot be null  |
| bio       | TEXT    |-                |
| picture   | BLOB    | -               |

### 🧑‍💻 Show (serie)

Stores information about shows.

| Column    | Type    | Description     |
|-----------|---------|-----------------|
| idS       | INTEGER | Primary key, autoincrement|
| name      | TEXT    | -               |
| year      | INTEGER | -               |
| bio       | TEXT    |-                |
| poster    | BLOB    | -               |  
| stars     | INTEGER | -               |

### 🧑‍💻 Recommendations (anbefaling)

Stores information about what shows have been recommended to what users.

| Column    | Type    | Description     |
|-----------|---------|-----------------|
| idA      | INTEGER | Primary key,autoincrement|
| showID   | INTEGER    | FOREIGN KEY   |
| senderID   | INTEGER    | FOREIGN KEY   |
| reciverID   | INTEGER    | FOREIGN KEY   |
| comment  | TEXT       |-              |

showID connects to show idS
senderID connects to user id
reciverID connects to user id

### 🧑‍💻 showStatus (serieStatus)

Shows the "status" of a show. Either "to watch", "have watched", "watching".

| Column    | Type    | Description     |
|-----------|---------|-----------------|
| showStatusID | INTEGER | Primary key,autoincrement|
| idS       | INTEGER | FOREIGN KEY     |
| idB       | INTEGER | FOREIGN KEY     |
| status    | -       | -               |

idS connects to show idS
idB connects to user id

### Design 
The design of the website was actully quite easy this time. I tried setting it up a bit like a social media platform from the 2000's where the friendlist was on the right side, the bar on the top and the rest taking the space that is left.

<img src="Public/bilder/FigmaDesign.png" alt="A simplefied drawing of a website. There is a hamburger menu in the top left corner, the word show is under as a title. 3 lines with 5 red rectangles in each are evenly spaced underneath. Next to them on the right is a purple circle with arrows in them. Next to there agin is a white box with the word" width= "250rem">

<img src="Public/bilder/SocialMediaOld.jpg" alt="A old social platform. Layout is information about the user taking up most the screen. On the top there is a smal bare with options, on the right side there is a friends list." width= "250rem">

## Usage
1. Make an account, but make sure not to use any real password, do to the website lacking hashing.
2. Log into your acount
3. Register whatever show you would like!
4. Send recommendations to your friends
5. Make your friends send some recommendations to (or send some to yourself)
6. Se what recomondations you have gotten, and get rid of the ones you don't like!

## Features

For users to give and recive recommendations I had to get both a senderID, reciverID and a showID. On top of this i had to connect the showID in recommendations to the idS in show, that way i could actully display the show info.

To do all this i used the following kode:
```javascript
app.get('/anbefalt/:id', (req, res) => { //viser alle anbefalte serier med info
    const motakerID = req.params.id;
    const mottatAnbefaling = db.prepare(`
        SELECT anbefaling.*, serie.*
        FROM anbefaling
        INNER JOIN serie ON anbefaling.serieID = serie.idS
        WHERE anbefaling.motakerID = ?
    `).all(motakerID);
    
    if (!mottatAnbefaling || mottatAnbefaling.length === 0) {
        return res.status(404).json({ message: "bruker ikke funnet" });
    }
    res.json(mottatAnbefaling);
});
```

By getting the id og the user from the serch bar i could use this as the reciverID. I then had to merge idS and showID, which i did by using a db.prepare and INNER JOIN-ing them, this ment that only the ones that had a recommendations conected to the show id would be shown, i then made it so only that users recommendations would show by using .all(motakerID) which made it so only the ones who had a reciverID the same as the id in the url bar would be shown.
I then sent the information using json.

To actully display the information i had to use more kode in a different document connected to the logged in page. 

The following is a lot of code to do not to mutch. The importen bit is that this is a async function, meaning that it dosn't run at the same time as everything else, this fuction has to wait for the information from /anbefalt/id before it can run, as seen with the await fetch used futer down.

Do to using the id from the URL it also has to get this with a URLSearchParams to find the id in the URL.
JSON is used to resive and send as mantiond earlier. And mot of the rest of the code is just setting up the boxes and information that will be displayed for each recommendation.

```javascript
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
```

### Implemented ✅
- [x] Making an account
- [x] Can't access website without account
- [x] Register shows (including pictures)
- [x] See all registered shows
- [x] Send recommendations
- [x] Receive recommendations
- [x] Delete recommendations you don't want

### To Be Implemented 🚧
- [ ] Hashing passwords
- [ ] Protected website
- [ ] Username visible at the top
- [ ] Send recommendations not using ID
- [ ] Get more info on a show by clicking it
- [ ] To watch list
- [ ] Have watched list
- [ ] Currently watching list
- [ ] Delete from watch lists
- [ ] Adding friends/friends list
- [ ] Profile picture and bio

### Future Ideas 💡
These are things that I can't impliment for the time being do to either my current skillsett or just lack of time.
* A show API so users don't have to manuely register shows.
* Adding groups, so you can recomend a show to more then one person at a time.

## Technology

- **Backend:** Node.js, Express.js
- **Database:** SQLite 
- **Frontend:** HTML, CSS, JavaScript


## Project Structure

```
Reposetory Show/

app.js      # Main server file
public/     # Container holding static files (CSS, images, JS)
beskyttet/  # Container holding files that will be protected in the feauter
readMe.md   # This file containing info on the website and development
package.json # Dependencies
```

## Contributors
Thank you to the other students in my class who contributed to my website with their knowledge. Thank you especially to my teacher who helped make sense of my code and improve my idea.

## Auther 

Benny

muunuo on Github

-----
***Last updated***
- December 5th 2025


