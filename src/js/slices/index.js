import { createSlice } from '@reduxjs/toolkit'


const pokemonSlice = createSlice({
    name: 'pokemonState',
    initialState: {
        actionType: '',
        searchOrFilterTerm: '',
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
        }
    }
});

export const { addSearchAction, addSearchTerm } = pokemonSlice.actions;

export default pokemonSlice.reducer;