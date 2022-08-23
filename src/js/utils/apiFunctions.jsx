const GetPokemon = ({ url: apiUrl }) => {
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => resolve(data))
    });
}

const GetAllPokemon = async (apiUrl) => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

const GetPokemonStats = async (response) => {
    const pokemonStats = await Promise.all(response.map(async pokemon => {
        let pokemonRecord = await GetPokemon(pokemon)
        const { name, height, weight, abilities, types } = pokemonRecord;
        const abilitiesList = abilities.map(ability => ability.ability.name)
        const typesList = types.map(type => type.type.name)
        return { name, height, weight, abilities: abilitiesList, types: typesList };
    }))
    return pokemonStats;
}

export const apiFunctions = {
    GetAllPokemon,
    GetPokemon,
    GetPokemonStats
};