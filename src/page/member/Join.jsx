import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSetJoin } from '../../redux/joinAction'
import { useNavigate } from 'react-router-dom'

const Join = () => {
    const dispatch = useDispatch()
    const joinRef = useRef([])
    const navigate = useNavigate()

    // 상태구독
    const joinID = useSelector(state => state.join.joinID)
    const joinPW = useSelector(state => state.join.joinPW)

    // const [localJoinID, setLocalJoinID] = useState(joinID)
    
    // const onJoinID = (e) => {
    //     setLocalJoinID(e.target.value)
    // }

    const onJoinFinish = (e) => {
        e.preventDefault() // form태그의 기본제출방지

        // 유효성검사
        const validId = joinRef.current[0].value.length >= 6 && joinRef.current[0].value.length <= 12
        const validPW = joinRef.current[1].value.length >= 8 && joinRef.current[1].value.length <= 16

        const joinInfo = {
            joinID : joinRef.current[0].value,
            joinPW : joinRef.current[1].value
        }

        if(!validId) {
            alert(`유효하지 않은 id입니다`)
        } else if(!validPW) {
            alert(`유효하지 않은 pw입니다`)
        } else {
            alert(`가입되었습니다`)
            dispatch(fetchSetJoin(joinInfo))
            navigate(`/date`)
        }
    }

    useEffect(() => {
        // 초기화
        if(joinID !== '' || joinPW !== '') {
            // setLocalJoinID('')
            joinRef.current[0].value = ''
            joinRef.current[1].value = ''
        }
    }, [joinID, joinPW])
    return (
        <div className="join-box">
            <h2>회원가입</h2>
            <form onSubmit={onJoinFinish}>
                <label><input type="text" placeholder="아이디를 입력하세요" ref={(el) => joinRef.current[0] = el} defaultValue={joinID}/></label>
                <label><input type="password" placeholder="비밀번호를 입력하세요" ref={(el) => joinRef.current[1] = el} defaultValue={joinPW}/></label>
                <button type="submit">가입완료</button>
            </form>
            
            <ul>
                <li><span>ID는 6글자 이상, 12글자 이하로 생성</span></li>
                <li><span>PW는 8글자 이상, 16글자 이하로 생성</span></li>
            </ul>
        </div>
    )
}

export default Join