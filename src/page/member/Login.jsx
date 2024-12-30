import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSetLogin, resetLoginStatus } from '../../redux/joinAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const joinRef = useRef([])
    const navigate = useNavigate()

    // 상태구독
    const loginStatus = useSelector(state => state.join.loginStatus)
    const loginID = useSelector(state => state.join.joinID)
    const loginPW = useSelector(state => state.join.joinPW)
    const [visibilityText, setVisibilityText] = useState("visibility_off")

    const onLoginStart = (e) => {
        e.preventDefault() // form태그의 기본제출방지
        const loginInfo = {
            joinID: joinRef.current[0].value,
            joinPW: joinRef.current[1].value
        }
        dispatch(fetchSetLogin(loginInfo))
        dispatch(resetLoginStatus(false))
    }

    const onJoinStart = () => {
        alert(`회원가입 화면으로 이동합니다`)
        navigate(`/join`)
    }

    const onLogoutEnd = () => {
        dispatch(resetLoginStatus(false))
    }

    const onPasswordCheck = () => {
        setVisibilityText("visibility")
        if(visibilityText === "visibility") {
            setVisibilityText("visibility_off")
        } else {
            setVisibilityText("visibility")
        }
    }
    return (
        <div className="join-box">
            <h2>로그인</h2>
            <form onSubmit={onLoginStart}>
                <label><input type="text" placeholder="아이디를 입력하세요" ref={(el) => joinRef.current[0] = el} defaultValue=""/></label>
                <label>
                    <input type="password" placeholder="비밀번호를 입력하세요" ref={(el) => joinRef.current[1] = el} defaultValue="" onClick={onPasswordCheck}/>
                    <span className="material-icons toggleVisible">{visibilityText}</span>
                </label>
                <button type="submit">로그인</button>
                {
                    loginStatus ? <button type="button" onClick={onLogoutEnd} className="btn-logout">로그아웃</button> : null
                }
                <button type="button" onClick={onJoinStart} className="btn-join">회원가입</button>
            </form>
        </div>
    )
}

export default Login
