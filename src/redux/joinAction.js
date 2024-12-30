import axios from "axios"
import {v4 as uuid4} from 'uuid'
import bcrypt from 'bcryptjs'

// 액션타입정의
export const SET_ID_JOIN = "SET_ID_JOIN"
export const SET_PW_JOIN = "SET_PW_JOIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_RESET_STATUS = "LOGIN_RESET_STATUS"

// 액션생성자
export const setIDjoin = (joinID) => ({
    type: SET_ID_JOIN,
    payload: joinID
})

export const setPWjoin = (joinPW) => ({
    type: SET_PW_JOIN,
    payload: joinPW
})

export const loginStatus = (loginStatus) => ({ // 파라미터없는 액션생성자: 액션의타입만을 이용해 상태업데이트 = 고정된 값을 설정할때
    type: LOGIN_SUCCESS,
    payload: loginStatus
})

export const resetLoginStatus = () => ({
    type: LOGIN_RESET_STATUS,
    payload: false
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
