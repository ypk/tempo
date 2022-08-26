import { createSlice } from '@reduxjs/toolkit'


const pokemonSlice = createSlice({
    name: 'pokemonState',
    initialState: {
        actionType: '',
        searchOrFilterTerm: '',
        pokemonData: []
    },
    reducers: {
        addPokemon: (state, action) => {
            const { payload } = action;
            state.pokemonData = payload;
        },
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
        }
    }
});

export const { addSearchAction, addSearchTerm, addPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;