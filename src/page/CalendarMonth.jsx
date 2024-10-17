import React, { useState } from 'react'

const CalendarMonth = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()-8)
  let month = [1,2,3,4,5,6,7,8,9,10,11,12]
  let resultMonth = []
  for (let i = 0; i < month.length; i++) {
    resultMonth.push(month[i]);
  }

  const onPrevMonth = () => {
    if(currentMonth-1 < 1){
      setCurrentMonth(resultMonth[11])
    } else {
      setCurrentMonth(currentMonth-1)
    }
  }

  const onNextMonth = () => {
    if(currentMonth+1 >= 13){
      setCurrentMonth(resultMonth[0])
    } else {
      setCurrentMonth(currentMonth+1)
    }
  }
  return (
    <div className='month-box'>
        <span className='number-month'>{currentMonth}</span>
        <span className='text-unit'>월</span>
        <div className='arrow-box'>
            <button className='btn-prev' onClick={onPrevMonth}>&lt;</button>
            <button className='btn-next' onClick={onNextMonth}>&gt;</button>
        </div>
    </div>
  )
}

export default CalendarMonth
