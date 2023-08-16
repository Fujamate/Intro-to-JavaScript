let pokemonRepository =(function () {
   let pokemonList = [
      { name: 'Pikachu', height: 0.4, types: 'Electro'},
      { name: 'Charmander', height: 0.6, types: 'Fire'},
      { name: 'Bulbasaur', height: 0.7, types: 'Grass'},
      { name: 'Arbok', height: 3.5, types: 'Poisen'},
   ]

   function getAll () {
      return pokemonList;
   }

   function add (pokemon) {
      pokemonList.push(pokemon)
   }

   return {
      getAll: getAll,
      add: add
   }
   
   
   
})()

pokemonRepository.getAll().forEach( item => { if (item.height > 2) {
      document.write(`<p>${item.name} is over 2 m tall</p> `)
   } else {
      document.write(`<p>${item.name} (height: ${item.height}) </p> `)
   }})
   

 