import axios from "axios"
import {v4 as uuid4} from 'uuid'
import bcrypt from 'bcryptjs'
import { memo } from "react"
import { useNavigate } from "react-router-dom"

// 액션타입정의
export const SET_ID_JOIN = "SET_ID_JOIN"
export const SET_PW_JOIN = "SET_PW_JOIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_RESET_STATUS = "LOGIN_RESET_STATUS"
export const INSERT_DATE_NUMBER = "INSERT_DATE_NUMBER"
export const ALL_MEMO_LIST = "ALL_MEMO_LIST"
export const CLICK_EACH_MEMO = "CLICK_EACH_MEMO"
export const NEW_ADD_MEMO = "NEW_ADD_MEMO"
export const DELETE_EACH_MEMO = "DELETE_EACH_MEMO"

// 액션생성자
export const setIDjoin = (joinID) => ({
    type: SET_ID_JOIN,
    payload: joinID
})

export const setPWjoin = (joinPW) => ({
    type: SET_PW_JOIN,
    payload: joinPW
})

export const loginStatus = (loginStatus) => ({
    type: LOGIN_SUCCESS,
    payload: loginStatus
})

export const resetLoginStatus = () => ({ // 파라미터없는 액션생성자: 액션의타입만을 이용해 상태업데이트 = 고정된 값을 설정할때
    type: LOGIN_RESET_STATUS,
    payload: false
})

export const insertDateNumber = (selectDate) => ({
    type: INSERT_DATE_NUMBER,
    payload: selectDate
})

export const allMemoList = (memoList) => ({
    type: ALL_MEMO_LIST,
    payload: memoList
})

export const clickEachMemo = (clickMemo) => ({
    type: CLICK_EACH_MEMO,
    payload: clickMemo
})

export const newAddMemo = (memoList) => ({
    type: NEW_ADD_MEMO,
    payload: memoList
})

export const deleteMemo = (deleteMemo) => ({
    type: DELETE_EACH_MEMO,
    payload: deleteMemo
})

// 회원가입 액션
export const fetchSetJoin = (joinInfo) => {
    return async dispatch => {
        const {joinID, joinPW} = joinInfo
        const hashPW = await bcrypt.hash(joinPW, 10)
        const key = uuid4()

        // 회원가입 정보 저장
        axios.post(`http://localhost:3001/join`, {
            key,
            joinID,
            joinPW: hashPW
        })
        .then(response => {
            dispatch(setIDjoin(response.data.joinID))
            dispatch(setPWjoin(response.data.joinPW))
        })
        .catch(error => {
            console.error(error)
        })
    }
}

// 로그인 액션
export const fetchSetLogin = (loginInfo) => {
    return dispatch => {
        // return new Promise((resolve, reject) => { ... }) 해준이유는 비동기작업의 결과 명시적으로 처리할라고
        // bcrypt.compare가 콜백을 사용해서 결과를 반환하는 비동기함수임
        return new Promise((resolve, reject) => { // 이렇게하면 promise를 반환하겠다 라는거임
            const {joinID, joinPW} = loginInfo
            
            // id조회
            axios.get(`http://localhost:3001/join`)
                .then(response => {
// console.log(`response.data = ${JSON.stringify(response.data)}`);               
                    const user = response.data.find(u => u.joinID === joinID)
// console.log(`user = ${JSON.stringify(user)}`);
                    if(!user) {
                        alert(`id가 존재하지 않습니다`) 
                        resolve(false)   
                    } else {
                        // pw해시 비교
                        bcrypt.compare(joinPW, user.joinPW, (err, isMatch) => {
// console.log(`isMatch = ${JSON.stringify(isMatch)}`);
                            if(err) {
                                console.error(`비밀번호 비교 중 에러 발생`)
                                reject(err) // 에러반환
                            }
                            
                            if(isMatch) {
                                console.log(`로그인 성공`)
                                dispatch(loginStatus(true))
                                resolve(true) // 로그인성공
                            } else {
// console.log(`isMatch = ${JSON.stringify(isMatch)}`);
                                console.log(`로그인 실패`)
                                dispatch(loginStatus(false))
                                resolve(false) // 로그인실패
                            }
                        })                    
                    }
                })
                .catch(error => {
                    console.error(error)
                    return false
                })
        })
            
    }
}

// 클릭한날짜에 대한 메모post액션(입력)
export const fetchClickDateNumber = (selectDate, memoContent) => {
    // month가 1월에서 minus하면 0월로 들어가는거 방지
    const adjustMonthCompare = {
        ...selectDate,
    }

    return dispatch => {
        axios.post(`http://localhost:3001/memoList`, {
            selectDate: adjustMonthCompare,
            memoContent,
        })
        .then(response => {
            dispatch(newAddMemo(response.data))
        })
        .catch(error => {
            console.error(error)
        })

    }
}

// 클릭한날짜에 대한 메모get액션(전체 불러오기)
export const fetchAllMemoList = () => {
    return dispatch => {
        axios.get(`http://localhost:3001/memoList/`)
            .then(response => {
                dispatch(allMemoList(response.data))
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// 클릭한날짜에 대한 메모get액션(각각 불러오기)
export const fetchMemoList = (memoData) => {
    return dispatch => {
        axios.get(`http://localhost:3001/memoList/${memoData}`)
            .then(response => {
                dispatch(clickEachMemo(response.data))
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// 클릭한날짜에 대한 메모patch액션(수정)
export const fetchModifyMemo = (selectDate) => {
    return dispatch => {
        const memoContent = selectDate.memoContent
        axios.patch(`http://localhost:3001/memoList/${selectDate.id}`, {
            memoContent: memoContent
        })
        .then(response => {
            dispatch(clickEachMemo(response.data))
        })
        .catch(error => {
            console.error(error)
        })
    }
}

// 클릭한날짜에 대한 메모delete액션(삭제)
export const fetchDeleteMemo = (selectDate) => {
console.log(`selectDate = ${JSON.stringify(selectDate)}`);
    return dispatch => {
        const memoContent = selectDate.memoContent
        axios.delete(`http://localhost:3001/memoList/${selectDate.id}`, {
            memoContent: memoContent
        })
        .then(response => {
            dispatch(deleteMemo(response.data))
        })
        .catch(error => {
            console.error(error)
        })
    }
}