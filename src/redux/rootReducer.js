import { combineReducers } from 'redux';

const initialState = {
    joinID: '',
    joinPW: '',
    loginStatus: false,
    selectDate: null, // 내가클릭한날짜
    memoList: [] // 입력되어 있는 메모들
}

const joinReducer = (state = initialState, action) => {
    // console.log("Action Type:", action.type);
    // console.log("Payload:", action.payload); // payload 값 확인
    switch (action.type) {
        case "SET_ID_JOIN":
            return {...state, joinID: action.payload}
        case "SET_PW_JOIN":
            return {...state, joinPW: action.payload}
        case "LOGIN_SUCCESS": // 로그인 성공여부(로그인 됐냐, 안됐냐)
            return {...state, loginStatus: action.payload}
        case "LOGIN_RESET_STATUS": // 로그인 reset여부(초기화 됐냐, 안됐냐)
            return {...state, loginStatus: action.payload}
        case "INSERT_DATE_NUMBER":
            return {...state, selectDate: action.payload} 
        case "INSERT_MEMO_LIST":
// console.log(`action.payload = ${JSON.stringify(action.payload)}`);
            return {...state, memoList: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers ({
    join: joinReducer
})

export default rootReducer