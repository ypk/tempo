import React, { useState, useEffect } from 'react';
import {
    connect,
    useSelector,
    useDispatch
} from 'react-redux'
import { addPokemonData, addSearchAction, addSearchTerm, toggleFormReset } from "../slices"
import PokemonList from "./pokemon-list.jsx";
import {
    GetPokemon,
    GetAllPokemon,
    GetPokemonStats,
    GetAbilities,
    GetTypes
} from "../utils/index.js";
import QS from "../utils/queryStringParam.js";
import {
    Loader,
    Pagination,
    ErrorInfo,
    ResetApp
} from "./common/index.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const PokemonPage = () => {
    const dispatch = useDispatch();
    const SEARCH = 'Search';
    const FILTER = 'Filter';
    const [pokemonData, setPokemonData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState(QS(API_URL));
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [actionDataHolder, setActionDataHolder] = useState([]);
    const { actionType, searchOrFilterTerm, isFormReset, pokemonData: pokemonStateData } = useSelector(state => state.pokemonState);

    async function fetchData(url) {
        if (url && url !== undefined) {
            let response = await GetPokemon({ url });
            const { abilities, height, name, types, weight } = response;
            return [{ abilities: GetAbilities(abilities), height, name, types: GetTypes(types), weight }];
        } else {
            let response = await GetAllPokemon(currentPageUrl);
            const { results, next, previous } = response;
            const pokemonDataResponse = await GetPokemonStats(results);
            return { pokemonDataResponse, next, previous };
        }
    }

    useEffect(() => {
        setPokemonData(pokemonStateData)
    }, [pokemonStateData]);

    const resetUI = (data, message) => {
        dispatch(addPokemonData(data));
        message && setActionError(message);
        setIsSearching(false);
    };

    useEffect(() => {
        if (searchOrFilterTerm !== "" && actionType !== "") {
            setActionDataHolder(pokemonData);
            setIsSearching(true);
            setActionError(null);
            if (actionType === FILTER) {
                const filteredPokemonData = pokemonData.filter(pokemon => pokemon.name === searchOrFilterTerm);
                if (filteredPokemonData.length === 0) {
                    resetUI(pokemonData, "The pokemon you've tried to look up does not exist in this page. Please try again on the next page or use Search instead");
                    return;
                }
                dispatch(addPokemonData(filteredPokemonData));
            } else if (actionType === SEARCH) {
                const searchUrl = QS(API_URL, searchOrFilterTerm);
                try {
                    fetchData(searchUrl)
                        .then((searchResultsData) => {
                            if (Object.keys(searchResultsData).length === 0) {
                                resetUI(pokemonData, "The pokemon you've tried to look up does not exist. Please try again with a different pokemon");
                                return;
                            }
                            dispatch(addPokemonData(searchResultsData));
                            setHasPrevPage(null);
                            setHasNextPage(null);
                            setDataLoaded(true);
                        })
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }, [actionType, searchOrFilterTerm]);

    const handlePokemonData = ({ pokemonDataResponse, next, previous }) => {
        if (pokemonDataResponse.length > 0) {
            setActionError(null);
            dispatch(addPokemonData(pokemonDataResponse));
            setPrevPageUrl(previous);
            setNextPageUrl(next);
            setHasPrevPage(previous !== null)
            setHasNextPage(next !== null)
            setDataLoaded(true);
        }
    };

    useEffect(() => {
        fetchData()
            .then(({ pokemonDataResponse, next, previous }) => handlePokemonData({ pokemonDataResponse, next, previous }));
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

    const handleCloseError = () => {
        setActionError(null)
    };

    const handleResetApp = () => {
        setDataLoaded(false);
        dispatch(toggleFormReset());
        dispatch(addPokemonData([]));
        dispatch(addSearchAction(""));
        dispatch(addSearchTerm(""));
        fetchData().then(({ pokemonDataResponse, next, previous }) => handlePokemonData({ pokemonDataResponse, next, previous }));
        dispatch(toggleFormReset());
    }

    return dataLoaded === true ? pokemonData.length === 0 ? <ErrorInfo /> : (
        <>
            {actionError !== null && <ErrorInfo errorMessage={actionError} closeErrorCallback={handleCloseError} />}
            <PokemonList pokemonData={pokemonData} />
            {!isSearching ? (<Pagination
                hasPrevPage={hasPrevPage}
                handlePrevBtnClick={handlePrevBtnClick}
                hasNextPage={hasNextPage}
                handleNextBtnClick={handleNextBtnClick} />) : (<ResetApp onClick={handleResetApp} />)}
        </>
    ) : <Loader flag={dataLoaded} />;
}


const mapStateToProps = state => state;

export default connect(mapStateToProps)(PokemonPage);