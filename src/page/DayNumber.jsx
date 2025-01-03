import React, { useEffect, useState } from 'react'
import { fetchClickDateNumber, insertDateNumber, fetchMemoList, fetchModifyMemo } from '../redux/joinAction'
import { useDispatch, useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'

function DayNumber(props) {
    let dayFirstDay = props.dayOfFirstDay // '2024.11월은(=현재월) 금요일(5)부터' 시작 -> getDay()로 뽑아낸 값이 5임
    let dayOfLastDay = props.dayOfLastDay // '2024.11월은(=현재월)이 끝나는 30일은 토요일 -> getDay()로 뽑아낸 값이 6임

    let prevLastDate = props.prevLastDate // 이전달의 마지막날짜

    let dayLastNum = props.currentOfDays

    let dayArr = []
    // 월의 1일이 시작되는 요일앞에 공백추가 -> 이전달 날짜 보여주기
    for (let i = prevLastDate - (dayFirstDay-1); i <= prevLastDate; i++) {
        // console.log(`prevLastDate = ${prevLastDate}`); // 31
        // console.log(`dayFirstDay = ${dayFirstDay}`); // 5
        // console.log(`dayFirstDay-1 = ${dayFirstDay-1}`); // 4
        // console.log(`i = ${i}`);
        
        dayArr.push(i);        
    }
    
    for (let i = 1; i <= dayLastNum; i++) {
        dayArr.push(i)
    }

    // 월의 마지막날짜가 끝나는 요일뒤에 공백추가 -> 다음달 날짜 보여주기
    for (let i = 1; i < 7 - dayOfLastDay ; i++) { // 일요일0부터 토요일6까지니까 조건은 i가 6보다 작을때
        // dayArr.push("")
        dayArr.push(i)
    }    

    let week7Arr = []
    for (let i = 0; i < dayArr.length; i+=7) {
        let temp
        temp = dayArr.slice(i, i+7)
        week7Arr.push(temp)        
    }

    /**
     * 메모창열고 닫히는거에 따른 상태값 true/false정의
     * 1. 맨처음엔 closeStatus : true = 메모창 안보임
     * 2. 날짜클릭 closeStatus : false = 메모창 보임
     * 3. 취소버튼 클릭 closeStatus: true = 메모창 안보임
     */
    const dispatch = useDispatch()
    const [currentMemo, setCurrentMemo] = useState('')
    const [closeStatus, setCloseStatus] = useState(true)
    // 상태구독
    const selectDate = useSelector(state => state.join.selectDate)
    const memoList = useSelector(state => state.join.memoList)
    
    // 날짜에 대한 조회
    const onHandleDateNumber = (date) => {
// console.log(`ttt`);
        setCloseStatus(false)
        dispatch(insertDateNumber(date))
        dispatch(fetchMemoList(date))

        const choiceMemo = memoList.find(value => value.selectDate === date)
        if(choiceMemo) {
            setCurrentMemo(choiceMemo.memoContent)
        } else {
            setCurrentMemo('')
        }
    }

    // 날짜에 대한 메모저장
    const onDateMemoSave = (date) => {   
       dispatch(fetchClickDateNumber(date, currentMemo))
    }

    // 날짜에 대한 메모수정
    const onDateMemoModify = (date) => {
        dispatch(fetchModifyMemo(date))
    }

    // 날짜에 대한 메모닫기
    const onDateMemoClose = (event) => {
        event.stopPropagation() // 상위부모 'onHandleDateNumber' 이벤트핸들러로 버블링 되지 않도록 하기위해(이게 없으면, 닫기를 할때 onHandlerDateNumber에있는 ttt가 찍힘)
        setCloseStatus(true)
        dispatch(insertDateNumber(null)) // 상태 업데이트 후 비동기적으로 dispatch 실행
// console.log(`닫기버튼 클릭시 closeStatus = ${closeStatus}`);      
    }

    useEffect(() => {
        // 초기 상태 설정
        dispatch(fetchMemoList())
        dispatch(insertDateNumber(null))
    }, [dispatch]) // closeStatus를 의존성배열에서 제거하여 불필요한 재렌더링 방지

    return (
        <>
            {
                week7Arr.map((numberDate, index) => 
                    // console.log(`index = ${index}`); // 0, 1, 2, 3, 4 -> 몇번째주인지(0은 첫번째주 = tr)
                    
                    <tr key={index}>
                        {
                            
                            numberDate.map((element, idx) => {
                                if(index === 0 && element > 7) { // 첫번째주(=0)이면서 첫번째주의 수가 7보다(=일주일은 7일)보다 큰수가 있으면
                                    return <td key={idx} className='prev' onClick={() => onHandleDateNumber(element)}>{element}
                                            {
                                                /**TODO:_해야함::리팩토링(컴포넌트도) */
                                                selectDate === element && closeStatus === false ? 
                                                <div className="box">
                                                    <p className="text-memo"><textarea onChange={(e) => setCurrentMemo(e.target.value)} value={currentMemo}></textarea></p>
                                                    <div className="btn-box">
                                                        <button type="button" onClick={() => onDateMemoSave(element)}>저장</button>
                                                        <button type="button" onClick={(event) => onDateMemoClose(event)}>취소</button>
                                                        <button type="button" onClick={() => onDateMemoModify(element)}>수정</button>
                                                    </div>
                                                </div>
                                                : null
                                            }
                                            </td>
                                    
                                }
                                // if(index >= 4 && element < 7) { // 마지막주(=4이상=6주짜리Month)이면서 마지막주의 수가 7보다(=일주일은 7일)보다 작은수가 있으면                                    
                                //     return <td key={idx} className='next' onClick={() => onDateMemo(element)}>{element}
                                //             {
                                //                 selectDate === element ? 
                                //                 <p className="text-memo">
                                //                     <textarea onChange={(e) => setCurrentMemo(e.target.value)} value={currentMemo}></textarea>
                                //                     <div className="btn-box">
                                //                         <button type="button" onClick={onDateMemo(element)}>저장</button>
                                //                         <button type="button">취소</button>
                                //                         <button type="button">수정</button>
                                //                     </div>
                                //                 </p>
                                //                 : null
                                //             }
                                //             </td>
                                // }
                                // if(idx === 0 ){
                                //     return <td key={idx} className='sunday' onClick={() => onDateMemo(element)}>{element}
                                //             {
                                //                 selectDate === element ? 
                                //                 <p className="text-memo">
                                //                     <textarea onChange={(e) => setCurrentMemo(e.target.value)} value={currentMemo}></textarea>
                                //                     <div className="btn-box">
                                //                         <button type="button" onClick={onDateMemo(element)}>저장</button>
                                //                         <button type="button">취소</button>
                                //                         <button type="button">수정</button>
                                //                     </div>
                                //                 </p>
                                //                 : null
                                //             }
                                //             </td>
                                // } else if(idx === 6) {
                                //     return <td key={idx} className='saturday' onClick={() => onDateMemo(element)}>{element}
                                //             {
                                //                 selectDate === element ? 
                                //                 <p className="text-memo">
                                //                     <textarea onChange={(e) => setCurrentMemo(e.target.value)} value={currentMemo}></textarea>
                                //                     <div className="btn-box">
                                //                         <button type="button" onClick={onDateMemo(element)}>저장</button>
                                //                         <button type="button">취소</button>
                                //                         <button type="button">수정</button>
                                //                     </div>
                                //                 </p>
                                //                 : null
                                //             }
                                //             </td>
                                // } else {
                                //     return <td key={idx} onClick={() => onDateMemo(element)}>{element}
                                //             {
                                //                 selectDate === element ? 
                                //                 <p className="text-memo">
                                //                     <textarea onChange={(e) => setCurrentMemo(e.target.value)} value={currentMemo}></textarea>
                                //                     <div className="btn-box">
                                //                         <button type="button" onClick={onDateMemo(element)}>저장</button>
                                //                         <button type="button">취소</button>
                                //                         <button type="button">수정</button>
                                //                     </div>
                                //                 </p>
                                //                 : null
                                //             }
                                //             </td>
                                // }
                                // 다음달에 대한 회색글자처리
                            })
                        }
                    </tr>
                )
            }
        </>
    )
}

export default DayNumber