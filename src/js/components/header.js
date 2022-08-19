import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/hi">Hi</Link></li>
                <li><Link to="/hello">Hello</Link></li>
            </ul>
        </nav>
    )
}

export default Header;