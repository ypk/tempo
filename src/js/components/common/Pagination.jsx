import React from 'react'

const Pagination = ({ hasPrevPage, handlePrevBtnClick, hasNextPage, handleNextBtnClick }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="w-full d-flex mb-5">
                        <ul className="pagination pagination-lg mx-auto">
                            <li className={`${!hasPrevPage ? 'page-item disabled' : 'page-item'}`}>
                                <button onClick={handlePrevBtnClick} className="page-link">Previous</button>
                            </li>
                            <li className={`${!hasNextPage ? 'page-item disabled' : 'page-item'}`}>
                                <button onClick={handleNextBtnClick} className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Pagination;