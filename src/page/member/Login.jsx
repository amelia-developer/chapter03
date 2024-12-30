import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSetLogin, resetLoginStatus } from '../../redux/joinAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const joinRef = useRef([])
    const navigate = useNavigate()

    const loginStatus = useSelector(state => state.join.loginStatus)
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

    const onLogout = () => {
        dispatch(resetLoginStatus(false))
    }

    return (
        <div className="join-box">
            <h2>로그인</h2>
            <form onSubmit={onLoginStart}>
                <label><input type="text" placeholder="아이디를 입력하세요" ref={(el) => joinRef.current[0] = el} defaultValue=""/></label>
                <label><input type="password" placeholder="비밀번호를 입력하세요" ref={(el) => joinRef.current[1] = el} defaultValue=""/></label>
                <button type="submit">로그인</button>
                {
                    loginStatus ? <button type="button" onClick={onLogout} className="btn-logout">로그아웃</button> : null
                }
                <button type="button" onClick={onJoinStart} className="btn-join">회원가입</button>
            </form>
        </div>
    )
}

export default Login
