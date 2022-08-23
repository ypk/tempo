import React, { useState } from 'react'

const Search = () => {
    return (
        <div className="input-group my-5">
            <input type="text" className="form-control" placeholder="Search Pokemon" aria-label="Search Pokemon" aria-describedby="search-pokemon" />
            <button className="btn btn-danger" type="button" id="search-pokemon">Find</button>
        </div>
    )
}

export default Search;