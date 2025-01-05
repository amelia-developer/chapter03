import React, { useEffect, useState } from 'react'
import { insertDateNumber, fetchAllMemoList, fetchMemoList, fetchModifyMemo } from '../redux/joinAction'
import { useDispatch, useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import Memo from './Memo'

function DayNumber(props) {
    let dayFirstDay = props.dayOfFirstDay // '2024.11월은(=현재월) 금요일(5)부터' 시작 -> getDay()로 뽑아낸 값이 5임
    let dayOfLastDay = props.dayOfLastDay // '2024.11월은(=현재월)이 끝나는 30일은 토요일 -> getDay()로 뽑아낸 값이 6임

    let prevLastDate = props.prevLastDate // 이전달의 마지막날짜

    let dayLastNum = props.currentOfDays

    // 각 달력의 일자에 대해서 메모를 저장하고자 년도와 월을 객체와 시키려고 props로 전달받음
    let currentYear = props.currentYear
    let currentMonth = props.currentMonth

    let dayArr = []
    // 월의 1일이 시작되는 요일앞에 공백추가 -> 이전달 날짜 보여주기
    for (let i = prevLastDate - (dayFirstDay-1); i <= prevLastDate; i++) {
        // console.log(`prevLastDate = ${prevLastDate}`); // 31
        // console.log(`dayFirstDay = ${dayFirstDay}`); // 5
        // console.log(`dayFirstDay-1 = ${dayFirstDay-1}`); // 4
        // console.log(`i = ${i}`);
        
        // dayArr.push(i); // 이건 그냥 숫자를(=일자date)푸시할때
        dayArr.push({year: currentYear, month:currentMonth - 1, day: i})
    }
    
    for (let i = 1; i <= dayLastNum; i++) {
        // dayArr.push(i) // 이건 그냥 숫자를(=일자date)푸시할때
        dayArr.push({year: currentYear, month:currentMonth, day: i})
    }

    // 월의 마지막날짜가 끝나는 요일뒤에 공백추가 -> 다음달 날짜 보여주기
    for (let i = 1; i < 7 - dayOfLastDay ; i++) { // 일요일0부터 토요일6까지니까 조건은 i가 6보다 작을때
        // dayArr.push("")
        // dayArr.push(i) // 이건 그냥 숫자를(=일자date)푸시할때
        dayArr.push({year: currentYear, month: currentMonth + 1, day: i})
    }    

    let week7Arr = []
    for (let i = 0; i < dayArr.length; i+=7) {
        let temp
        temp = dayArr.slice(i, i+7)
        week7Arr.push(temp)        
    }

// console.log(`dayArr = ${JSON.stringify(dayArr)}`);
    /**
     * 메모창열고 닫히는거에 따른 상태값 true/false정의
     * 1. 맨처음엔 closeStatus : true = 메모창 안보임
     * 2. 날짜클릭 closeStatus : false = 메모창 보임
     * 3. 취소버튼 클릭 closeStatus: true = 메모창 안보임
     */
    const dispatch = useDispatch()
    const [currentMemo, setCurrentMemo] = useState('')
    const [closeStatus, setCloseStatus] = useState(true)
    const [memoID, setMemoID] = useState(null)

    // 상태구독
    const selectDate = useSelector(state => state.join.selectDate)
    const memoList = useSelector(state => state.join.memoList)

    // 날짜에 대한 조회
    const onHandleDateNumber = (dateObj) => {
// console.log(`ttt`);
        setCloseStatus(false)
        dispatch(insertDateNumber(dateObj))
        dispatch(fetchAllMemoList(dateObj))

        /// const dataMatch = memoList.find(value => value.selectDate === date)

        const dataMatch = Object.values(memoList).find((value) => {
console.log(`value = ${JSON.stringify(value)}`)
        if (!value.selectDate) {
            console.error("selectDate가 유효하지 않거나 누락됨:", value)
            return false
        }
        return (
            value.selectDate.year === dateObj.year &&
            value.selectDate.month === dateObj.month &&
            value.selectDate.day === dateObj.day
            )
        })

        if(dataMatch) {
            setMemoID(dataMatch.id)
            setCurrentMemo(dataMatch.memoContent)
            dispatch(fetchMemoList(dataMatch.id))
        } else {
            setMemoID(null)
            setCurrentMemo('')
        }
    }

    useEffect(() => {
        // 초기 상태 설정
        dispatch(fetchAllMemoList())
        dispatch(insertDateNumber(null))
    }, [dispatch]) // closeStatus를 의존성배열에서 제거하여 불필요한 재렌더링 방지

    useEffect(() => {
        if(memoID && currentMemo) {
            dispatch(fetchModifyMemo({id: memoID, memoContent: currentMemo}))
        }
    }, [memoID, currentMemo])
    return (
        <>
            {
                week7Arr.map((numberDate, index) => 
                    // console.log(`index = ${index}`); // 0, 1, 2, 3, 4 -> 몇번째주인지(0은 첫번째주 = tr)          
                    <tr key={index}>
                         {
                             numberDate.map((element, idx) => {
                                // 메모의 날짜가 이번달메모인지, 지난달메모인지 구분
                                // const isPrevMonth = index === 0 && element > 7 // 첫번째주 이면서 날짜가 7보다 큰 경우(지난달)
                                // const isNextMonth = index >= 4 && element < 7 // 마지막주 이면서 날짜가 7보다 작은 경우(다음달)
                                // const isThisMonth = !isPrevMonth && !isNextMonth // 이번달
                                const { year, month, day } = element
                                const isPrevMonth = month < currentMonth
                                const isNextMonth = month > currentMonth
                                // if(isPrevMonth) { // 첫번째주(=0)이면서 첫번째주의 수가 7보다(=일주일은 7일)보다 큰수가 있으면
                                    return <td key={idx} className={isPrevMonth ? "prev" : isNextMonth ? "next" : ""} onClick={() => onHandleDateNumber(element)}>{day}
                                            {
                                                selectDate ?. year === year && selectDate ?. month === month && selectDate ?. day === day && closeStatus === false?
                                                <Memo   currentMemo={currentMemo}
                                                        memoList={memoList}
                                                        setMemoID={setMemoID}
                                                        setCurrentMemo={setCurrentMemo}
                                                        closeStatus={closeStatus}
                                                        setCloseStatus={setCloseStatus}
                                                        element={element}>
                                                </Memo>
                                                : null
                                            }
                                            </td>
                                    
                                // }
                    //             if(isNextMonth) { // 마지막주(=4이상=6주짜리Month)이면서 마지막주의 수가 7보다(=일주일은 7일)보다 작은수가 있으면                                    
                    //                 return <td key={idx} className='next' onClick={() => onHandleDateNumber(element)}>{element}
                    //                         {
                    //                             selectDate === element && closeStatus === false ? 
                    //                             <Memo currentMemo={currentMemo} memoList={memoList} setMemoID={setMemoID} setCurrentMemo={setCurrentMemo} closeStatus={closeStatus} setCloseStatus={setCloseStatus} element={element}></Memo>
                    //                             : null
                    //                         }
                    //                         </td>
                    //             }
                    //             if(idx === 0 ){
                    //                 return <td key={idx} className='sunday' onClick={() => onHandleDateNumber(element)}>{element}
                    //                         {
                    //                             selectDate === element && closeStatus === false ? 
                    //                             <Memo currentMemo={currentMemo} memoList={memoList} setMemoID={setMemoID} setCurrentMemo={setCurrentMemo} closeStatus={closeStatus} setCloseStatus={setCloseStatus} element={element}></Memo>
                    //                             : null
                    //                         }
                    //                         </td>
                    //             } else if(idx === 6) {
                    //                 return <td key={idx} className='saturday' onClick={() => onHandleDateNumber(element)}>{element}
                    //                         {
                    //                             selectDate === element && closeStatus === false ? 
                    //                             <Memo currentMemo={currentMemo} memoList={memoList} setMemoID={setMemoID} setCurrentMemo={setCurrentMemo} closeStatus={closeStatus} setCloseStatus={setCloseStatus} element={element}></Memo>
                    //                             : null
                    //                         }
                    //                         </td>
                    //             } else {
                    //                 return <td key={idx} onClick={() => onHandleDateNumber(element)}>{element}
                    //                         {
                    //                             selectDate === element && closeStatus === false ? 
                    //                             <Memo currentMemo={currentMemo} memoList={memoList} setMemoID={setMemoID} setCurrentMemo={setCurrentMemo} closeStatus={closeStatus} setCloseStatus={setCloseStatus} element={element}></Memo>
                    //                             : null
                    //                         }
                    //                         </td>
                    //             }
                    //             // 다음달에 대한 회색글자처리
                             })
                         }
                     </tr>
                )
            }
        </>
    )
}

export default DayNumber