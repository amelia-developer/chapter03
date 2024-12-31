import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSetLogin, resetLoginStatus } from '../../redux/joinAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const joinRef = useRef([])
    const navigate = useNavigate()

    const [visibilityText, setVisibilityText] = useState("visibility")
    const [inputType, setInputType] = useState("password")

    const onLoginStart = (e) => {
        e.preventDefault() // form태그의 기본제출방지
        const loginInfo = {
            joinID: joinRef.current[0].value,
            joinPW: joinRef.current[1].value
        }
        dispatch(fetchSetLogin(loginInfo))
        dispatch(resetLoginStatus(false))
        navigate(`/date`)
    }

    const onJoinStart = () => {
        alert(`회원가입 화면으로 이동합니다`)
        navigate(`/join`)
    }

    const onPasswordCheck = () => {
        if(inputType === "text") {
            setVisibilityText("visibility_off")
            setInputType("password")
        } else {
            setVisibilityText("visibility")            
            setInputType("text")
        }
    }
    return (
        <div className="join-box">
            <h2>로그인</h2>
            <form onSubmit={onLoginStart}>
                <label><input type="text" placeholder="아이디를 입력하세요" ref={(el) => joinRef.current[0] = el} defaultValue=""/></label>
                <label>
                    <input type={inputType} placeholder="비밀번호를 입력하세요" ref={(el) => joinRef.current[1] = el} defaultValue="" onClick={onPasswordCheck}/>
                    <span className="material-icons toggleVisible">{visibilityText}</span>
                </label>
                <button type="submit">로그인</button>
                <button type="button" onClick={onJoinStart} className="btn-join">회원가입</button>
            </form>
        </div>
    )
}

export default Login
