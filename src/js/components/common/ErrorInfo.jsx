import React from 'react'

const ErrorInfo = ({ errorMessage, closeErrorCallback }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 my-5 mx-auto">
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div className="d-flex">
                            <div className="d-flex align-items-center alert-icon">
                                <svg className="ms-3 me-4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 488.451 488.451" fill="currentColor" style={{ height: "50px", width: "50px", enableBackground: "new 0 0 488.451 488.451" }} xmlSpace="preserve">
                                    <g>
                                        <path d="M484.125,412.013l-212.2-367.6c-12.3-21.3-43.1-21.3-55.4,0l-212.2,367.6c-12.3,21.3,3.1,48,27.7,48h424.4
		C481.025,460.013,496.425,433.313,484.125,412.013z M244.525,157.613c13.6,0,24.6,11.3,24.2,24.9l-4,139.6
		c-0.3,11-9.3,19.7-20.3,19.7s-20-8.8-20.3-19.7l-3.9-139.6C219.925,168.913,230.825,157.613,244.525,157.613z M244.225,410.113
		c-13.9,0-25.2-11.3-25.2-25.2c0-13.9,11.3-25.2,25.2-25.2s25.2,11.3,25.2,25.2S258.125,410.113,244.225,410.113z"/>
                                    </g>
                                </svg>
                            </div>
                            <div className="d-flex">
                                <div className="py-2 d-flex flex-column mx-2">
                                    <h2 className="mb-2 fs-4 text-bold">Error</h2>
                                    {
                                        errorMessage ? (
                                            <>
                                                <div className="mt-2">
                                                    {errorMessage}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="m-0">An error occurred while trying to fetch Pokemon content.</p>
                                                <p className="m-0">Please refresh the browser and try again</p>
                                            </>
                                        )
                                    }
                                </div>
                                {
                                    closeErrorCallback && <div className="d-flex align-items-center close-btn-container justify-content-end align-self-start">
                                        <button onClick={closeErrorCallback} className="btn btn-alert-close h-100 fs-2">&times;</button>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorInfo