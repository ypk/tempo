import React from 'react'
import PokemonPage from "../pokemon-page.jsx"

import Header from "./Header";
import Footer from "./Footer";


const Layout = () => {
    return (
        <>
            <Header />
            <PokemonPage />
            <Footer />
        </>
    )
}

export default Layout;