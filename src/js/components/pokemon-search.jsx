import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { addSearchTerm, addSearchAction } from "../slices"
import { DebounceInput } from 'react-debounce-input'

const PokemonSearch = () => {
    const dispatch = useDispatch()

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

    const handleSearchOrFilterActionsChange = (event, action) => {
        setSearchOrFilterTerm(action);
        dispatch(addSearchAction(action));
    };

    const handleSearchOrFilterTermChange = (event) => {
        const { value } = event.target;
        setSearchOrFilterTerm(value);
        dispatch(addSearchTerm(value));
    }

    return (
        <>
            <div className="container my-5">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    <div className="input-group my-5">
                        <DebounceInput
                            className="form-control"
                            placeholder="pikachu"
                            minLength={1}
                            debounceTimeout={250}
                            onChange={event => handleSearchOrFilterTermChange(event)}
                        />
                        {
                            selectedAction === SEARCH ?
                                (<button className="btn btn-danger" type="button" onClick={event => handleSearchOrFilterActionsChange(event, SEARCH)}>{selectedAction}</button>) :
                                (<button className="btn btn-danger" type="button" onClick={event => handleSearchOrFilterActionsChange(event, FILTER)}>{selectedAction}</button>)
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