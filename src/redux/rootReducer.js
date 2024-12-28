import { combineReducers } from 'redux';

const initialState = {
    joinID: '',
    joinPW: ''
}

const joinReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ID_JOIN":
            return {...state, joinID: action.payload}
        case "SET_PW_JOIN":
            return {...state, joinPW: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers ({
    join: joinReducer
})

export default rootReducer