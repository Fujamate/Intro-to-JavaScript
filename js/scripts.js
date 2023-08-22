let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // populate the html with dynamic content from the pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-target", "#pokemonModal"); // Set data-target attribute
    button.setAttribute("data-toggle", "modal"); // Set data-toggle attribute

    listpokemon.classList.add("list-group-item");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // fetching the item.url to get the name and detailsurl and adding them to the pokemon list
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          pokemonRepository.add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function getAll() {
    return pokemonList;
  }
  // pushes the list of all pokemons into the empty array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // fetching all details that we want to render from the api +  loading text (ux)
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  // loading all the details + modal (ux)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //--------------- Modal Section ---------------

  // shows the modal and populate it with dynamic content

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");

    let imageElementFront = $('<img class="modal-img" style="width:50%">');

    imageElementFront.attr("src", item.imageUrlFront);

    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);

    let heightElement = $("<p>" + "height: " + item.height + "</p>");

    let weightElement = $("<p>" + "weight: " + item.weight + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
  }
  // ------------------- Loading Section (ux) -------------

  function showLoadingMessage() {
    document.getElementById("loading-message").style.display = "block";
  }

  function hideLoadingMessage() {
    document.getElementById("loading-message").style.display = "none";
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
