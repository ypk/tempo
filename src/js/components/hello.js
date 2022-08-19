import React from 'react'
import { Link } from 'react-router-dom';

const Hello = () => {
    return (
        <main>
            <h2>Hello!</h2>
            <Link to='/'>Back to Home</Link>
        </main>
    );
}

export default Hello;