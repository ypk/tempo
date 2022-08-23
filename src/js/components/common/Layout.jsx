import React from 'react'
import PokemonPage from "../pokemon-page.jsx"

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


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