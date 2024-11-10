import React, { useEffect, useState } from 'react'
import DayWeek from './DayWeek'
import DayNumber from './DayNumber';

const MonthDateField = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1)
  const [currentOfDays, setCurrentOfDays] = useState(new Date(currentYear, currentMonth, 0).getDate())
  
  useEffect(() => {
    setCurrentOfDays(new Date(currentYear, currentMonth, 0).getDate())
  }, [currentYear, currentMonth])

  // 매월 '1일'이 무슨요일인지
  const getFirstDayMonth = () => {
    const firstDay = new Date(currentYear, currentMonth-1).getDay() // 2024.11월은 금요일(5)부터 시작 (-1 안쓰면 0으로 찍혀서 log로 'new Date(currentYear, currentMonth)'찍어보면 다음달찍힘)
    return firstDay
  }
  const dayOfFirstDay = getFirstDayMonth()


  let month = [1,2,3,4,5,6,7,8,9,10,11,12]
  let resultMonth = []
  for (let i = 0; i < month.length; i++) {
    resultMonth.push(month[i]);
  }
  
  const weeks = [
    {
        day: '일',
    },
    {
        day: '월',
    },
    {
        day: '화',
    },
    {
        day: '수',
    },
    {
        day: '목',
    },
    {
        day: '금',
    },
    {
        day: '토',
    }
  ]
  
  // 매월 '마지막일자'가 무슨요일인지
  const getLastDayMonth = () => {
    const lastDay = new Date(currentYear, currentMonth, 0).getDay()
    return lastDay
  }
  const dayOfLastDay = getLastDayMonth()

  // 이전달의 마지막날짜
  const getPrevLastDate = () => {
    const prevLastDate = new Date(currentYear, currentMonth-1, 0).getDate()
    return prevLastDate
  }
  const prevLastDate = getPrevLastDate()  

  const onPrevMonth = () => {
    if(currentMonth-1 < 1){
      setCurrentMonth(resultMonth[11])
      setCurrentYear(currentYear => currentYear - 1)
      if(currentMonth === 1) {
        alert(`${currentYear}년의 마지막 ${currentMonth}월입니다. ${currentYear-1}년 으로 넘어갑니다`)
      }
    } else {
      setCurrentMonth(currentMonth-1)
    }
  }

  const onNextMonth = () => {
    if(currentMonth+1 > 12){
      setCurrentMonth(resultMonth[0]) // 1월로
      setCurrentYear(currentYear => currentYear + 1)
      if(currentMonth === 12) {
        alert(`${currentYear}년의 마지막 ${currentMonth}월입니다. ${currentYear+1}년 으로 넘어갑니다`)
      }
    } else {      
      setCurrentMonth(currentMonth+1)
    }
  }
  
  return (
    <>
      <div className='month-box'>
          <span className='number-year'>{currentYear}</span>
          <span className='number-month'>{currentMonth}</span>
          <span className='text-unit'>월</span>
          <div className='arrow-box'>
              <button className='btn-prev' onClick={onPrevMonth}>&lt;</button>
              <button className='btn-next' onClick={onNextMonth}>&gt;</button>
          </div>
      </div>
      <div className='date-box'>
            <table>
                <thead>
                    <tr>
                        <DayWeek weeks={weeks}></DayWeek>
                    </tr>
                </thead>
                <tbody>
                    <DayNumber currentOfDays={currentOfDays} dayOfFirstDay={dayOfFirstDay} dayOfLastDay={dayOfLastDay} prevLastDate={prevLastDate}></DayNumber>
                </tbody>
            </table> 
        </div>
    </>
  )
}

export default MonthDateField
