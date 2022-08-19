import React from 'react'
import { Link } from 'react-router-dom';

const Hi = () => {
    return (
        <main>
            <h2>Hi!</h2>
            <Link to='/'>Back to Home</Link>
        </main>
    );
}

export default Hi;