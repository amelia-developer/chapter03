import axios from "axios"
import {v4 as uuid4} from 'uuid'
import bcrypt from 'bcryptjs'
import { memo } from "react"

// 액션타입정의
export const SET_ID_JOIN = "SET_ID_JOIN"
export const SET_PW_JOIN = "SET_PW_JOIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_RESET_STATUS = "LOGIN_RESET_STATUS"
export const INSERT_DATE_NUMBER = "INSERT_DATE_NUMBER"
export const ALL_MEMO_LIST = "ALL_MEMO_LIST"
export const CLICK_EACH_MEMO = "CLICK_EACH_MEMO"
export const NEW_ADD_MEMO = "NEW_ADD_MEMO"

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
        const {joinID, joinPW} = loginInfo

        // id조회
        axios.get(`http://localhost:3001/join`)
            .then(response => {
                const user = response.data.find(u => u.joinID === joinID)

                if(!user) {
                    alert(`id가 존재하지 않습니다`)    
                } else {
                    // pw해시 비교
                    bcrypt.compare(joinPW, user.joinPW, (err, isMatch) => {
                        if(err) {
                            console.error(`비밀번호 비교 중 에러 발생`)
                            return
                        }
                        
                        if(isMatch) {
                            console.log(`로그인 성공`)
                            dispatch(loginStatus(true))
                        } else {
                            console.log(`로그인 실패`)
                            dispatch(loginStatus(false))
                        }
                    })
                }
            })
    }
}

// 클릭한날짜에 대한 메모post액션(입력)
export const fetchClickDateNumber = (selectDate, memoContent) => {
    return dispatch => {
        axios.post(`http://localhost:3001/memoList`, {
            selectDate,
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

// 클릭한날짜에 대한 메모fetch액션(수정)
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