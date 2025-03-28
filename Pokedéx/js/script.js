const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');
const pokemonCry = document.querySelector('.pokemon_cry');
const pokemonType0 = document.querySelector('.pokemon_type0');
const pokemonType1 = document.querySelector('.pokemon_type1');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const shiny = document.querySelector('.shiny');

let pokemonTypeColor;
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
        pokemonCry.src = data['cries']['latest'];

        //Verifica se é shiny
        if (isShiny){
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        else {
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }

        //Mostra o tipo e verifica se ele é duplo ou não
        pokemonType0.innerHTML = data['types'][0]['type']['name'].toUpperCase();
        if(data['types'][1] != null){
            pokemonType1.innerHTML = data['types'][1]['type']['name'].toUpperCase();
            pokemonType1.style.display = "flex";
        } else {
            pokemonType1.style.display = "none";
        }

        pokemonTypeColor = data['types'][0]['type']['name'];

        switch (pokemonTypeColor){
            case "grass":
                pokemonTypeColor = '#008000';
                break;
            
            case "fire":
                pokemonTypeColor = '#FF8C00';
                break;

            case "water":
                pokemonTypeColor = '#0000CD';
                break;
            
            default:
                pokemonTypeColor = '#C0C0C0';
        }

        document.getElementById("type0").style.backgroundColor = pokemonTypeColor;
        document.getElementById("type1").style.backgroundColor = "#C0C0C0";
 

        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Não Encontrado';
        pokemonNumber.innerHTML = '';
    }


}

//Área de pesquisa
form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

//Botão que volta o Id
btnPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    }

    renderPokemon(searchPokemon);

});

//Botão que avança o Id
btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);

});

//Botão que muda o pokemon para Shiny
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