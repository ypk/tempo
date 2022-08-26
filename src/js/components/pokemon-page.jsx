import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux'
import PokemonList from "./pokemon-list.jsx";
import { apiFunctions } from "../utils/apiFunctions.jsx";
import QS from "../utils/queryStringParam.js";
import Loader from "../utils/Loader.jsx";
import Pagination from './common/Pagination.jsx';
import ErrorInfo from '../utils/ErrorInfo.jsx';

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const {
    GetAllPokemon,
    GetPokemonStats
} = apiFunctions;

const PokemonPage = () => {
    const SEARCH = 'Search';
    const FILTER = 'Filter';
    const { actionType, searchOrFilterTerm } = useSelector(state => state.pokemonState);
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
            const pokemonDataResponse = await GetPokemonStats(results);
            if (pokemonDataResponse.length > 0) {
                if (searchOrFilterTerm !== "") {
                    if (actionType === SEARCH) {
                        const searchURL = QS(API_URL, searchOrFilterTerm);
                        setCurrentPageUrl(searchURL);
                    } else if (actionType === FILTER) {
                        const filteredPokemonData = pokemonDataResponse.filter(pokemon => pokemon.name === searchOrFilterTerm);
                        if (filteredPokemonData) {
                            setPokemonData(filteredPokemonData);
                        } else {
                            setPokemonData([]);
                        }
                    }
                } else {
                    setPokemonData(pokemonDataResponse);
                }
                setPrevPageUrl(previous);
                setNextPageUrl(next);
                setHasPrevPage(previous !== null)
                setHasNextPage(next !== null)
                setDataLoaded(true);
            }
        }

        fetchData();
    }, [currentPageUrl, pokemonData])

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

    return dataLoaded === true ? pokemonData.length === 0 ? <ErrorInfo /> : (
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


const mapStateToProps = state => state;

export default connect(mapStateToProps)(PokemonPage);