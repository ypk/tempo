import React from 'react'
import PokemonSearch from '../pokemon-search.jsx';

const Header = () => {
    return (
        <header className="d-flex header-image" style={{ "backgroundImage": `url(/images/background.jpg)` }}>
            <div className="container">
                <div className="row">
                    <PokemonSearch />
                </div>
            </div>
        </header>
    );
}

export default Header;
