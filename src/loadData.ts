import axios from 'axios'
import { PokemonController } from './controller/PokemonController'
import { Pokemon } from './entity/Pokemon';
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

const pokemonController = new PokemonController()


const formatPokemon = (pokemonEntry, gender=undefined) => {
    const pokemon = new Pokemon();
    pokemon.name = pokemonEntry.data.name,
    pokemon.picture = pokemonEntry.data.sprites.front_shiny,
    pokemon.gender = pokemonEntry.gender??'Not specified gender',
    pokemon.moves = pokemonEntry.data.moves
    pokemon.nickname = pokemonEntry.data.name

    pokemonController.save(pokemon)
} 

const fetchPokemons = async (start = 0,end = 898) => {
  
       const interval = {
           limit: end,
           offset: start
       }
       const list = await P.getPokemonsList(interval)
       for(let item of list.results){
            let resultPokemon = await axios.get(item.url)
            try {
                const gender = await axios.get(`https://pokeapi.co/api/v2/gender/${item.url.split('https://pokeapi.co/api/v2/pokemon/')[1]}`)
                formatPokemon(resultPokemon,gender)
            } catch (error) {
                console.error("The resource was not found!!")
                formatPokemon(resultPokemon)
            } 
       }
}

