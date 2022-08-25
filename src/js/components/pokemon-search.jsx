import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { ADD_SEARCH_OR_FILTER_TERM, addSearchOrFilterTerm } from "../actions";
import Input from "../components/common/DebouncedInput.jsx"

const PokemonSearch = () => {
    const dispatch = useDispatch();

    const SEARCH = 'Search';
    const FILTER = 'Filter';

    const [selectedAction, setSelectedAction] = useState(SEARCH);
    const [dropdownToggleState, setDropdownToggleState] = useState('');
    const [searchOrFilterTerm, setSearchOrFilterTerm] = useState("");

    const handleDropdownToggle = () => {
        if (dropdownToggleState === "") {
            setDropdownToggleState('show');
        } else {
            setDropdownToggleState('');
        }
    };

    const handleActionBtnClick = (e, action) => {
        e.preventDefault();
        setSelectedAction(action);
        setDropdownToggleState('');
    };

    const handleSearchBtnClick = () => {
        //TODO: call 'Search; in PokemonPage
    };

    const handleFilterBtnClick = () => {
        //TODO: call 'Filter' in PokemonPage
    };

    const handleSearchOrFilterTermChange = (value) => {
        console.log(value);
    }

    return (
        <>
            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    <div className="input-group my-5">
                        <Input className="form-control" placeholder="pikachu" onChange={handleSearchOrFilterTermChange} />
                        {
                            selectedAction === SEARCH ?
                                (<button className="btn btn-danger" type="button" onClick={handleSearchBtnClick}>{selectedAction}</button>) :
                                (<button className="btn btn-danger" type="button" onClick={handleFilterBtnClick}>{selectedAction}</button>)
                        }
                        <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" onClick={handleDropdownToggle}>
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className={`dropdown-menu dropdown-menu-end dropdown-visible ${dropdownToggleState}`}>
                            <li><button className="dropdown-item" onClick={e => handleActionBtnClick(e, SEARCH)}>{SEARCH}</button></li>
                            <li><button className="dropdown-item" onClick={e => handleActionBtnClick(e, FILTER)}>{FILTER}</button></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PokemonSearch);