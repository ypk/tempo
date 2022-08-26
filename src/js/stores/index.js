import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from "../slices";

export default configureStore({
    reducer: {
        pokemonState: pokemonSlice
    },
});