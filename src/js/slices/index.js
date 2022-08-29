import { createSlice } from '@reduxjs/toolkit'


const pokemonSlice = createSlice({
    name: 'pokemonState',
    initialState: {
        actionType: 'Search',
        searchOrFilterTerm: '',
        pokemonData: []
    },
    reducers: {
        addSearchAction: (state, action) => {
            const { payload } = action;
            if (payload !== "") {
                state.actionType = payload;
            }
        },
        addSearchTerm: (state, action) => {
            const { payload } = action;
            if (payload !== "") {
                state.searchOrFilterTerm = payload;
            }
        },
        addPokemonData: (state, action) => {
            const { payload } = action;
            if (payload.length !== 0) {
                state.pokemonData = payload;
            }
        }
    }
});

export const { addSearchAction, addSearchTerm, addPokemonData } = pokemonSlice.actions;

export default pokemonSlice.reducer;