import { ADD_SEARCH_OR_FILTER_TERM, ACTION_TYPE_VALUE } from "../actions";

const SEARCH = 'Search';

const defaultState = {
    searchOrFilterTerm: '',
    actionType: SEARCH
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_SEARCH_OR_FILTER_TERM:
            console.log('I\'m here in reducer')
            return {
                ...state,
                searchOrFilterTerm: action.payload
            }
        case ACTION_TYPE_VALUE:
            return {
                ...state,
                actionType: action.payload
            } 
        default:
            return state;
    }
}

export default reducer;