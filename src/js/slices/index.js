import { createSlice } from '@reduxjs/toolkit'


const pokemonSlice = createSlice({
    name: 'pokemonState',
    initialState: {
        actionType: '',
        searchOrFilterTerm: '',
        pokemonData: [],
        isFormReset: false
    },
    reducers: {
        addSearchAction: (state, action) => {
            const { payload } = action;
            if (state.isFormReset) {
                state.actionType = payload;
            } else {
                if (payload !== "") {
                    state.actionType = payload;
                }
            }
        },
        toggleFormReset: (state) => {
            state.isFormReset = !state.isFormReset;
        },
        addSearchTerm: (state, action) => {
            const { payload } = action;
            if (state.isFormReset) {
                state.searchOrFilterTerm = payload;
            } else {
                if (payload !== "") {
                    state.searchOrFilterTerm = payload;
                }
            }
        },
        addPokemonData: (state, action) => {
            const { payload } = action;
            if (state.isFormReset) {
                state.pokemonData = payload;
            } else {
                if (payload.length !== 0) {
                    state.pokemonData = payload;
                }
            }
        }
    }
});

export const { addSearchAction, addSearchTerm, addPokemonData, toggleFormReset } = pokemonSlice.actions;

export default pokemonSlice.reducer;