import React, { useState, useEffect } from 'react';
import PokemonList from "./pokemon-list.jsx";
import { apiFunctions } from "../utils/apiFunctions.jsx";
import QS from "../utils/queryStringParam.js";
import Loader from "../utils/Loader.jsx";
import Pagination from './common/Pagination.jsx';

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
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let response = await GetAllPokemon(currentPageUrl);
            const { results, next, previous } = response;
            const pokemonData = await GetPokemonStats(results);
            if (pokemonData.length > 0) {
                setPokemonData(pokemonData);
                setPrevPageUrl(previous);
                setNextPageUrl(next);
                setHasPrevPage(previous !== null)
                setHasNextPage(next !== null)
                setDataLoaded(true);
            }
        }

        fetchData();
    }, [currentPageUrl])
    
    const handlePageChange = (url) => {
        setDataLoaded(false);
        setPokemonData([]);
        setCurrentPageUrl(url);
    };

    const handlePrevBtnClick = () => {
        handlePageChange(prevPageUrl);
    };

    const handleNextBtnClick = () => {
        handlePageChange(nextPageUrl);
    };
    
    return dataLoaded === true ? (
        <>
            <PokemonList pokemonData={pokemonData} />
            <Pagination 
                hasPrevPage={hasPrevPage}
                handlePrevBtnClick={handlePrevBtnClick}
                hasNextPage={hasNextPage}
                handleNextBtnClick={handleNextBtnClick} />
        </>
    ) : <Loader flag={dataLoaded} />;
}

export default PokemonPage;