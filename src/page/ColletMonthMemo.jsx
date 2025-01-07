import React from 'react'
import { useSelector } from 'react-redux'

const ColletMonthMemo = () => {
    const memoBGlist = ["#FFB3B3", "#FFD9B3", "#FFFFB3", "#B3FFB3", "#B3D9FF", "#B3B3FF", "#D9B3FF"]
    

    const memoList = useSelector(state => state.join.memoList)
console.log(`memoList = ${JSON.stringify(memoList)}`);
    return (
        <div className="collect-memo-box">
            <span className="title">2025년 1월에 기재된 메모 리스트</span>
            <ul>
                {
                    memoList.map((value, index) => {
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
