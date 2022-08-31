import { GetAbilities, GetTypes } from "./index.js";

const GetPokemon = ({ url: apiUrl }) => {
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    });
}

const GetAllPokemon = async (apiUrl) => {
    const response = await fetch(apiUrl).catch(error => error);
    const data = await response.json();
    return data;
}

const GetPokemonStats = async (response) => {
    const pokemonStats = await Promise.all(response.map(async pokemon => {
        let pokemonRecord = await GetPokemon(pokemon)
        const { name, height, weight, abilities, types } = pokemonRecord;
        return { name, height, weight, abilities: GetAbilities(abilities), types: GetTypes(types) };
    }))
    return pokemonStats;
}

export {
    GetAllPokemon,
    GetPokemon,
    GetPokemonStats
};