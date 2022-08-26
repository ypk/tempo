import React from 'react';

const PokemonList = ({ pokemonData }) => {
    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {pokemonData.map((data, rootIndex) => {
                    return (
                        <div className="col my-4" key={rootIndex}>
                            <div className="card shadow-sm bg-body rounded">
                                <div className="image-container">
                                    <img className="card-img-top p-4" src={`https://img.pokemondb.net/artwork/large/${data.name}.jpg`} alt={data.name} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title fs-3 font-julius">{data.name}</h5>
                                    <div className="mb-3 pokemon-type">
                                        {
                                            data.types.map((type, index) => <span key={index} className="badge text-bg-warning fw-normal me-2 lh-base">{type}</span>)
                                        }
                                    </div>
                                    <div className='row'>
                                        <div className="col-6 col-sm-4 col-md-6">
                                            <h6 className="mb-0">Height</h6>
                                            <p className="mb-0 fs-2 font-julius">{data.height}</p>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-6">
                                            <h6 className="mb-0">Weight</h6>
                                            <p className="mb-0 fs-2 font-julius">{data.weight}</p>
                                        </div>
                                    </div>
                                    <div className="pokemon-abilities">
                                        {
                                            data.abilities.map((ability, index) => <span key={index} className="badge text-bg-dark fw-normal lh-base me-2">{ability}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PokemonList;