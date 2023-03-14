const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value);
    input.value = '';

});