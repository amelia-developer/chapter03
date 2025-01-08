import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'

const ColletMonthMemo = ({currentMonth, currentYear}) => {
    const memoBGlist = ["#FFB3B3", "#FFD9B3", "#FFFFB3", "#B3FFB3", "#B3D9FF", "#B3B3FF", "#D9B3FF"]
    
    // 상태구독
    const memoList = useSelector(state => state.join.memoList)
    const currentUserID = useSelector(state => state.join.currentID)

    // choiceYear에서 ?. selectDate.year 이거는 memoList.find하면 객체형태잖아. 거기서 객체가 있으면 selectDate.year을 갖고올거임
    // const choiceYear = memoList.find(result => result.selectDate.year === currentYear)?. selectDate.year
    // const choiceMonth = memoList.find(result => result.selectDate.month === currentMonth)?. selectDate.month
    const resultFilterMemo = memoList.filter(value => 
        value.selectDate.year === currentYear &&
        value.selectDate.month === currentMonth &&
        value.loginID === currentUserID // 로그인한 사람의 ID
    )
    return (
        <div className="collect-memo-box">
            <span className="title">{currentYear}년 {currentMonth}월에 기재된 메모 리스트</span>
            <ul>
                {
                    resultFilterMemo.map((value, index) => {
                        // bgRandomIndex가 map밖에서 정의: 랜덤으로 단 한번 지정된 컬러가 li모두에게 입혀짐
                        // bgRandomIndex가 map안에서 정의: value마다(=li마다) 랜덤으로 컬러가 지정됨
                        const bgRandomIndex = memoBGlist[Math.floor(Math.random() * memoBGlist.length)]

                        return  <li style={{backgroundColor : bgRandomIndex}} key={index}>
                                    <span className="text-date-number">{value.selectDate.day}일</span>
                                    <span className="text">{value.memoContent}</span>
                                </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ColletMonthMemo
