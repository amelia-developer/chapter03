import { combineReducers } from 'redux';

const initialState = {
    joinID: '',
    joinPW: '',
    loginStatus: false,
    selectDate: null, // 내가 클릭한 날짜
    memoList: [], // 입력되어 있는 메모들
    clickMemo: null, // 내가 클릭한 메모
    deleteMemo: null, // 내가 삭제하려는 메모
    currentID: '' // 로그인한 사람의 id
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
            return {
                ...state,
                // 하나의 액션생성자에 다수개의 state를 보내야할때[s]
                loginStatus: action.payload.loginStatus,
                currentID: action.payload.currentID
                // 하나의 액션생성자에 다수개의 state를 보내야할때[e]
            }
        case "LOGIN_RESET_STATUS": // 로그인 reset여부(초기화 됐냐, 안됐냐)
            return {...state, loginStatus: action.payload}
        case "INSERT_DATE_NUMBER":
            return {...state, selectDate: action.payload} 
        case "ALL_MEMO_LIST": // 메모들 전체 불러오기
// console.log(`action.payload = ${JSON.stringify(action.payload)}`);
            return {...state, memoList: action.payload}
        case "CLICK_EACH_MEMO": // 내가 클릭한 메모 보기 & 수정(=patch)하기
            const updateMemoList = state.memoList.map(memo =>
                memo.id === action.payload.id ? action.payload : memo
            )
            return {
                ...state,
                memoList: updateMemoList,
                clickMemo: action.payload
            }
        case "NEW_ADD_MEMO": // 새로운 메모 추가
            return {...state, memoList: [...state.memoList, action.payload]}
        case "DELETE_EACH_MEMO": // 내가 클릭한 메모 삭제하기
            const updateMemoList2 = state.memoList.map(memo => 
                memo.id === action.payload.id ? action.payload : memo
            )
            return {
                ...state, 
                memoList: updateMemoList2,
                deleteMemo: action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers ({
    join: joinReducer
})

export default rootReducer