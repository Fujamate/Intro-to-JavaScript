let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // populate the html with dynamic content from the pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector("ul");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
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
        item.types = details.types;
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
  function showModal(pokemon) {
    let modalContainer = document.getElementById("modal-container");
    let modalName = document.getElementById("modal-name");
    let modalHeight = document.getElementById("modal-height");
    let modalImage = document.getElementById("modal-image");

    modalName.textContent = `Name: ${pokemon.name}`;
    modalHeight.textContent = `Height: ${pokemon.height}`;
    modalImage.src = pokemon.imageUrl;

    modalContainer.classList.add("is-visible");
  }

  // Close the modal when the close button is clicked
  document.querySelector(".close").addEventListener("click", function () {
    hideModal();
  });

  // Close the modal when clicking outside the modal container
  window.addEventListener("click", function (event) {
    let modalContainer = document.getElementById("modal-container");
    if (event.target === modalContainer) {
      hideModal();
    }
  });

  // Function to hide the modal
  function hideModal() {
    let modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("is-visible");
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
