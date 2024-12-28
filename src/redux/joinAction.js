import axios from "axios"
import {v4 as uuid4} from 'uuid'

// 액션타입정의
export const SET_ID_JOIN = "SET_ID_JOIN"
export const SET_PW_JOIN = "SET_PW_JOIN"

// 액션생성자
export const setIDjoin = (joinID) => ({
    type: SET_ID_JOIN,
    payload: joinID
})

export const setPWjoin = (joinPW) => ({
    type: SET_PW_JOIN,
    payload: joinPW
})

// 비동기액션
export const fetchSetJoin = (joinInfo) => {
    return dispatch => {
        const {joinID, joinPW} = joinInfo
        const key = uuid4()

        axios.post(`http://localhost:3001/join`, {
            key,
            joinID,
            joinPW
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