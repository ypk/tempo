const ADD_SEARCH_OR_FILTER_TERM = 'ADD_SEARCH_OR_FILTER_TERM';
const ACTION_TYPE_VALUE = 'ACTION_TYPE_VALUE';

const addSearchOrFilterTerm = (term) => {
    return { 
        type: ADD_SEARCH_OR_FILTER_TERM,
        payload: term
    }
};

const actionTypeValue = (value) => {
    return {
        type: ACTION_TYPE_VALUE,
        payload: value
    }
};

export default {
    ADD_SEARCH_OR_FILTER_TERM,
    ACTION_TYPE_VALUE,
    addSearchOrFilterTerm,
    actionTypeValue
}
