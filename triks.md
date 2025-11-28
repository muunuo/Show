Når jeg henter ut flere objekter fra en tabell samtidig, kan du ta en \n på slutten for å få hver på en ny linje. 
```js client
for (const item of anbefaling) {
                kommentarer += `${item.kommentar}\n`; 
            }
```