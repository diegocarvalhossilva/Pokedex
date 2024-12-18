const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const shiny = document.querySelector('.shiny');

let searchPokemon = 1;
let isShiny = true;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        if (isShiny){
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        else {
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }

        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Não Encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

btnPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

shiny.addEventListener('click', () =>{
    if(isShiny){
        isShiny = false;
    }
    else {
        isShiny = true;
    }
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);