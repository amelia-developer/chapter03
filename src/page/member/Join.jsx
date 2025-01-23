import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSetJoin, fetchMultipleID } from '../../redux/joinAction'
import { useNavigate } from 'react-router-dom'

const Join = () => {
    const dispatch = useDispatch()
    const joinRef = useRef([])
    const navigate = useNavigate()
    const [visibilityText, setVisibilityText] = useState("visibility_off")
    const [inputType, setInputType] = useState("password")

    // 상태구독
    // const joinID = useSelector(state => state.join.joinID)
    // const joinPW = useSelector(state => state.join.joinPW)

    const [isloading, setIsloading] = useState(false) // 로딩
    
    // const [localJoinID, setLocalJoinID] = useState(joinID)
    
    // const onJoinID = (e) => {
    //     setLocalJoinID(e.target.value)
    // }

    const onJoinEnd = (e) => {
        e.preventDefault() // form태그의 기본제출방지
        setIsloading(true) // 로딩

        // 유효성검사
        const validId = joinRef.current[0].value.length >= 6 && joinRef.current[0].value.length <= 12
        const validPW = joinRef.current[1].value.length >= 8 && joinRef.current[1].value.length <= 16

        const joinInfo = {
            joinID : joinRef.current[0].value,
            joinPW : joinRef.current[1].value
        }

        if(!validId) {
            alert(`유효하지 않은 id입니다`)
            window.location.reload()
        } else if(!validPW) {
            alert(`유효하지 않은 pw입니다`)
            window.location.reload()
        } else {
            alert(`가입되었습니다`)
            dispatch(fetchSetJoin(joinInfo))
            setTimeout(() => { // 로딩
                setIsloading(true)
            }, 3000)
            navigate(`/date`)
        }
    }

    // useEffect(() => {
    //     // 초기화
    //     if(joinID !== '' || joinPW !== '') {
    //         // setLocalJoinID('')
    //         joinRef.current[0].value = ''
    //         joinRef.current[1].value = ''
    //     }
    // }, [joinID, joinPW])


    // id중복체크
    const onMultipleID = (param) => {
        dispatch(fetchMultipleID(param))
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

    if(isloading) {
        return  <div id="container">
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <h1 className="tit-Loadng">Loading...</h1>
                </div>
    }
    return (
        <div className='join-wrap'>
            <div className="join-box">
                <h2>회원가입</h2>
                <form onSubmit={onJoinEnd}>
                    <div className="inner">
                        <label><input type="text" placeholder="아이디를 입력하세요" ref={(el) => joinRef.current[0] = el} defaultValue="" /></label>
                        <button type="button" className="btn_multipleID" onClick={() => onMultipleID(joinRef.current[0].value)}>ID중복체크</button>
                    </div>
                    <div className="inner">
                        <label>
                            <input type={inputType} placeholder="비밀번호를 입력하세요" ref={(el) => joinRef.current[1] = el} defaultValue="" onClick={onPasswordCheck}/>
                            <span className="material-icons toggleVisible">{visibilityText}</span>
                        </label>
                    </div>
                    <button type="submit">가입완료</button>
                </form>
                
                <ul>
                    <li><span>ID는 6글자 이상, 12글자 이하로 생성</span></li>
                    <li><span>PW는 8글자 이상, 16글자 이하로 생성</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Join