const pokeConteiner = document.querySelector("#pokeConteiner")
const pokeCount = 252
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async() => {
    for (let i = 1; i <pokeCount; i++) {
        await getPokemons(i)
        
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data);
}

const createPokemonCard = (poke) =>{
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')
    

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color
    

    const pokemoninnerHTML =  `   
    <div class="imgbox">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="description">
        <span class="numb">#${id}</span>
        <h3 class="name">${name}</h1>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `

    card.innerHTML = pokemoninnerHTML

    pokeConteiner.appendChild(card)

}

fetchPokemons();

const inputSearch = document.querySelector("input[type='search']");

inputSearch.addEventListener("input", () => {
  const searchValue = inputSearch.value.trim().toLowerCase();
  const pokemonCards = Array.from(pokeConteiner.querySelectorAll(".pokemon"));
  
  pokemonCards.forEach(card => {
    const nameElement = card.querySelector(".name");
    const name = nameElement.textContent.toLowerCase();

    if (name.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
