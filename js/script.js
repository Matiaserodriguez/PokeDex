// toggle menu in small view
const toggleMenu = () => {
  document.querySelector("#menu").classList.toggle("open");
};

document.querySelector("#toggleMenu").addEventListener("click", toggleMenu);

// set current year in footer
const currentDate = new Date();
document.querySelector("#year").textContent = currentDate.getFullYear();

let offset = 0;
let limit = 10;

let pokeApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const container = document.querySelector(".container");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const search = document.querySelector(".search");

search.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    try {
      reset();
      createPokemon(
        `https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}`
      );
      search.value = "";
    } catch (error) {
      console.log(error);
    }
  }
});

next.addEventListener("click", () => {
  offset += 10;
  reset();
  pokeApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  callToPokeApi();
});

prev.addEventListener("click", () => {
  if (offset != 0) {
    offset -= 10;
    reset();
    pokeApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    callToPokeApi();
  } else {
    reset();
    pokeApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    callToPokeApi();
  }
});

const reset = () => {
  document.querySelector(".container").innerHTML = "";
};

const callToPokeApi = async () => {
  try {
    const response = await fetch(`${pokeApi}`);
    const wholeResponse = await response.json();
    let theList = wholeResponse.results;
    theList.forEach((element) => {
      createPokemon(`https://pokeapi.co/api/v2/pokemon/${element.name}`);
    });
  } catch (error) {
    console.log(error);
  }
};

const createPokemon = async (url) => {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();

    const div = document.createElement("div");
    div.setAttribute("class", "card");

    const h3 = document.createElement("h3");
    h3.textContent = pokemon.name;

    const img = document.createElement("img");
    img.setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    img.setAttribute("alt", pokemon.name);

    const abilities = document.createElement("div");
    abilities.setAttribute("class", "abilities");
    abilities.textContent = "ABILITIES";

    pokemon.abilities.forEach((element) => {
      const parag = document.createElement("p");
      const ability = element.ability.name;

      parag.textContent = `Name: ${ability}`;
      abilities.appendChild(parag);
    });

    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(abilities);

    container.appendChild(div);
  } catch (error) {
    alert("Sorry, we couldn't find your Pokemon.");
  }
};

callToPokeApi();
