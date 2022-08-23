import React from 'react'

const Loader = ({ flag }) => {
    return flag === false && (

        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center my-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;