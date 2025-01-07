import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSetLogin } from '../../redux/joinAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const joinRef = useRef([])
    const navigate = useNavigate()

    const [visibilityText, setVisibilityText] = useState("visibility_off")
    const [inputType, setInputType] = useState("password")

    const onLoginStart = (e) => {
        e.preventDefault() // form태그의 기본제출방지
        const loginInfo = {
            joinID: joinRef.current[0].value,
            joinPW: joinRef.current[1].value
        }
        dispatch(fetchSetLogin(loginInfo))
            .then((isloginSuccessful) => { // isloginSuccessful이 변수에는 fetchSetLogin을 디스패치한(=promise결과를) 내용을 담는다
                if(isloginSuccessful) {
                    navigate(`/date`)
console.log(`로그인성공했을때 isloginSuccessful = ${JSON.stringify(isloginSuccessful)}`);
                } else {
                    alert(`id 또는 pw를 확인해주세요`)
// console.log(`loginInfo = ${JSON.stringify(loginInfo)}`);
console.log(`로그인실패했을때 isloginSuccessful = ${JSON.stringify(isloginSuccessful)}`);
                }
            })
        
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
                <label className="lbl_join"><input type="text" placeholder="아이디를 입력하세요" ref={(el) => joinRef.current[0] = el} defaultValue=""/></label>
                <label className="lbl_join">
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
