import React, { useState, useEffect } from 'react';
import PokemonList from "./pokemon-list.jsx";
import { apiFunctions } from "../utils/apiFunctions.jsx";
import QS from "../utils/queryStringParam.js";
import Loader from "../utils/Loader.jsx";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const {
    GetAllPokemon,
    GetPokemon,
    GetPokemonStats
} = apiFunctions;

const PokemonPage = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState(QS(API_URL));

    useEffect(() => {
        async function fetchData() {
            let response = await GetAllPokemon(API_URL);
            const { results } = response;
            const pokemonData = await GetPokemonStats(results);
            if (pokemonData.length > 0) {
                setPokemonData(pokemonData);
                setDataLoaded(true);
            }
        }

        fetchData();
    }, [currentPageUrl])

    return dataLoaded === true ? <PokemonList pokemonData={pokemonData} /> : <Loader flag={dataLoaded} />;
}

export default PokemonPage;