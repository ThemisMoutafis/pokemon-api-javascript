import Pokedex from "pokedex-promise-v2";
import fs from 'fs/promises';
const P = new Pokedex();
let PokemonList = [];
const interval = {};

P.getPokemonsList(interval).then(function (response) {
  const namesArray = response.results.map((pokemon) => pokemon.name);
  PokemonList = namesArray;
  const pokemonListJSON = JSON.stringify(PokemonList, null, 2);
     // Save JSON to a file
     fs.writeFile('pokemonList.json', pokemonListJSON, 'utf8', function(err) {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('JSON file saved successfully.');
        }
    })
});

