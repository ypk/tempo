import React from 'react'
import Search from '../Search.jsx';

const Header = () => {
    return (
        <header className="d-flex" style={{ "backgroundImage": `url(/img/background.jpg)` }}>
            <div className="container">
                <div className="row">
                    <div className="col-6 my-5 mx-auto">
                        <Search/>
                    </div>
                </div>
            </div>
        </header>
        
    );
}

export default Header;