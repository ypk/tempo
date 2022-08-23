import React, { useState, useEffect } from 'react';
import PokemonList from "./pokemon-list.jsx";
import { apiFn } from "./pokemon-utils.jsx";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const {
    GetAllPokemon,
    GetPokemon,
    GetPokemonStats
} = apiFn;

const PokemonPage = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("")

    useEffect(() => {
        async function fetchData () {
            // get all pokemon data
            let response = await GetAllPokemon(API_URL);
            // set next page
            const {results} = response;
            const totalData = await GetPokemonStats(results);
            // set pokemondata
            setPokemonData(totalData);
        }

        fetchData();
    })

    return (
        <PokemonList pokemonData={pokemonData} />
    )
}

export default PokemonPage;