let pokemonList = [
    { name: 'Pikachu', height: 0.4, types: 'Electro'},
    { name: 'Charmander', height: 0.6, types: 'Fire'},
    { name: 'Bulbasaur', height: 0.7, types: 'Grass'},
    { name: 'Arbok', height: 3.5, types: 'Poisen'},
]

pokemonList.forEach (item =>  {
   if (item.height > 2) {
    document.write(`<p>${item.name} is over 2 m tall</p> `)
 } else {
    document.write(`<p>${item.name} (height: ${item.height}) </p> `)
 }})
 
 /* for (let i = 0; i < pokemonList.length; i++) {

    -------------- Part 1 is commented for visual reasons  --------------------

    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) </p> `)


    IF the height is above 2 then write the special text. else just print the object
   if (pokemonList[i].height > 2) {
    document.write(`<p>${pokemonList[i].name} is over 2 m tall</p> `)
 } else {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) </p> `)
 }
 } */

 