import React from 'react'
import PokemonPage from "../pokemon-page.jsx"
import { Provider } from 'react-redux';
import store from "../../stores";

import { Header, Footer } from "./index.js";

const Layout = () => {
    return (
        <Provider store={store}>
            <Header />
            <PokemonPage />
            <Footer />
        </Provider>
    )
}

export default Layout;