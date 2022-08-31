import React from 'react';

const PokemonList = ({ pokemonData }) => {
    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {pokemonData.map((pokemon, rootIndex) => {
                    return (
                        <a className="col my-4 pokemon-card text-decoration-none text-body" key={rootIndex} href={`https://pokemon.fandom.com/wiki/${pokemon.name}`}>
                            <div className="card bg-body rounded">
                                <div className="image-container">
                                    <img className="card-img-top p-4" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={pokemon.name} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title fs-3 text-dark font-julius">{pokemon.name}</h5>
                                    <div className="mb-3 pokemon-type">
                                        {
                                            pokemon.types.map((type, index) => <span key={index} className="badge text-bg-warning fw-normal me-2 lh-base">{type}</span>)
                                        }
                                    </div>
                                    <div className='row'>
                                        <div className="col-6 col-sm-4 col-md-6">
                                            <h6 className="mb-0">Height</h6>
                                            <p className="mb-0 fs-2 font-julius">{pokemon.height}</p>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-6">
                                            <h6 className="mb-0">Weight</h6>
                                            <p className="mb-0 fs-2 font-julius">{pokemon.weight}</p>
                                        </div>
                                    </div>
                                    <div className="pokemon-abilities">
                                        {
                                            pokemon.abilities.map((ability, index) => <span key={index} className={`abilities badge text-bg-dark fw-normal lh-base me-2 ${index >= 2 ? 'mt-1':''}`}>{ability}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default PokemonList;