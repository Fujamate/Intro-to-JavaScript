let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Pikachu", height: 0.4, types: "Electro" },
    { name: "Charmander", height: 0.6, types: "Fire" },
    { name: "Bulbasaur", height: 0.7, types: "Grass" },
    { name: "Arbok", height: 3.5, types: "Poisen" },
  ];

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector("ul");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function (event) {
      showDetails();
    });
  }

  function showDetails() {
    console.log(pokemonList);
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
