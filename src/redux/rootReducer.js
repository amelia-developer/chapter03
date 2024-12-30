import { combineReducers } from 'redux';

const initialState = {
    joinID: '',
    joinPW: '',
    loginStatus: false
}

const joinReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ID_JOIN":
            return {...state, joinID: action.payload}
        case "SET_PW_JOIN":
            return {...state, joinPW: action.payload}
        case "LOGIN_SUCCESS": // 로그인 성공여부(로그인 됐냐, 안됐냐)
            return {...state, loginStatus: action.payload}
        case "LOGIN_RESET_STATUS": // 로그인 reset여부(초기화 됐냐, 안됐냐)
            return {...state, loginStatus: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers ({
    join: joinReducer
})

export default rootReducer