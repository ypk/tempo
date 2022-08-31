import React from 'react'

const ResetApp = ({onClick}) => {
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="d-flex justify-content-center">
                    <button className="btn btn-outline" onClick={onClick}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetApp;