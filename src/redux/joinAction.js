import axios from "axios"
import {v4 as uuid4} from 'uuid'
import bcrypt from 'bcryptjs'

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

export const loginStatus = (loginStatus, currentID, token) => ({
    type: LOGIN_SUCCESS,
    payload: {loginStatus, currentID, token}
})

export const resetLoginStatus = (payload) => ({ // 파라미터없는 액션생성자: 액션의타입만을 이용해 상태업데이트 = 고정된 값을 설정할때
                                                // payload 자체를 파라미터로 넣는경우: true/false 타입에 따른 상태를 나타내야할 때
    type: LOGIN_RESET_STATUS,
    // payload: false
    payload
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
        axios.post(`https://lava-handy-jackal.glitch.me/join`, {
            key,
            joinID,
            joinPW: hashPW
        })
        .then(response => {
            dispatch(setIDjoin(response.data.joinID))
            dispatch(setPWjoin(response.data.joinPW))
            dispatch(resetLoginStatus(true)) // 회원가입하면 로그인된거잖아? 그럼 /date화면에서 '로그아웃'버튼 보여주기
        })
        .catch(error => {
            console.error(error)
        })
    }
}

// id중복체크 액션
export const fetchMultipleID = (multipleID) => {
    return () => {    
        axios.get(`https://lava-handy-jackal.glitch.me/join`)
            .then(response => {
                const multiUser = response.data.find(newUser => newUser.joinID === multipleID)
                if(multiUser) {
                    console.log(`중복된id 있음`)
                    alert(`사용불가능한 id입니다. \n다른id를 사용해주세요.`)
                } else {
                    console.log(`중복된id 없음`)
                    alert(`사용가능한 id입니다`)
                }
            })
    }
}

// 로그인 액션 -> jwt 기반 로그인액션으로 변경2025-02-03
export const fetchSetLogin = (loginInfo) => {
    return async dispatch => {
        // return new Promise((resolve, reject) => { ... }) 해준이유는 비동기작업의 결과 명시적으로 처리할라고

        // 2025-02-03 jwt방식
            try {
                const {joinID,joinPW} = loginInfo

                const response = await axios.post(`https://lava-handy-jackal.glitch.me/login`, JSON.stringify({joinID, joinPW}), { headers: { 'Content-Type': 'application/json' }})
// console.log(`로긴응답데이터response = ${JSON.stringify(response.data)}`)
                const {token, user} = response.data // 여기서user랑 token은 백엔드가 로그인 요청에대한 응답으로 보낸 데이터임
// console.log(`token = ${JSON.stringify(token)}`);
// console.log(`user = ${JSON.stringify(user)}`);
                if(token && user) {
                    localStorage.setItem('jwtToken', token) // 이게 토큰저장하는거임
                    dispatch(loginStatus(true, user.joinID, token)) // 로그인상태업데이트
console.log(`로그인성공성공성공성공`)
                    return {token, user}
                } else {
                    alert(`로그인실패실패실패실패`)
                    return {token: null, user: null}
                }
            } catch(error) {
                console.error(`로그인에러 ${error.message}`)
                alert(`로그인 중 오류발생오류발생오류발생`)
                return {token: null, user: null}
            }



        // 2025-02-03 bcrypt방식
        // bcrypt.compare가 콜백을 사용해서 결과를 반환하는 비동기함수임
//         return new Promise((resolve, reject) => { // 이렇게하면 promise를 반환하겠다 라는거임
//             const {joinID, joinPW} = loginInfo
            
//             // id조회
//             axios.get(`https://lava-handy-jackal.glitch.me/join`)
//                 .then(response => {
// // console.log(`response.data = ${JSON.stringify(response.data)}`);               
//                     const user = response.data.find(u => u.joinID === joinID)
// // console.log(`user = ${JSON.stringify(user)}`);
//                     if(!user) {
//                         alert(`id가 존재하지 않습니다`) 
//                         resolve(false)
//                     } else {
//                         // pw해시 비교
//                         bcrypt.compare(joinPW, user.joinPW, (err, isMatch) => {
// // console.log(`isMatch = ${JSON.stringify(isMatch)}`);
//                             if(err) {
//                                 console.error(`비밀번호 비교 중 에러 발생`)
//                                 reject(err) // 에러반환
//                             }
                            
//                             if(isMatch) {
//                                 console.log(`로그인 성공`)
//                                 dispatch(loginStatus(true, user.joinID))
//                                 resolve(true) // 로그인성공
//                             } else {
// // console.log(`isMatch = ${JSON.stringify(isMatch)}`);
//                                 console.log(`로그인 실패`)
//                                 dispatch(loginStatus(false, ''))
//                                 resolve(false) // 로그인실패
//                             }
//                         })                    
//                     }
//                 })
//                 .catch(error => {
//                     console.error(error)
//                     return false
//                 })
//         }) 
    }
}


// 클릭한날짜에 대한 메모post액션(입력)
export const fetchClickDateNumber = (selectDate, memoContent, loginID) => {
    /** selectDate에 담겨져있는 객체형태의 파라미터를 가져와서 post하려고 기존에 post되어있떤 selectDate
        들에게 영향을 안주고, 전달받은 파라미터selectDate를 스프레드연산자를 이용해서 신규추가하려고 
        adjustMonthCompare라는 변수에 담았음(한마디로, 데이터의불변성) */
    const adjustMonthCompare = {
        ...selectDate,
    }
    return dispatch => {
        axios.post(`https://lava-handy-jackal.glitch.me/memoList`, {
            selectDate: adjustMonthCompare,
            memoContent,
            loginID
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
        axios.get(`https://lava-handy-jackal.glitch.me/memoList/`)
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
        axios.get(`https://lava-handy-jackal.glitch.me/memoList/${memoData}`)
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
        axios.patch(`https://lava-handy-jackal.glitch.me/memoList/${selectDate.id}`, {
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
        axios.delete(`https://lava-handy-jackal.glitch.me/memoList/${selectDate.id}`, {
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