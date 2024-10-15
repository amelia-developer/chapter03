import React from 'react'

const CalendarMonth = () => {
  return (
    <div className='month-box'>
        <span className='number-month'>1</span>
        <span className='text-unit'>월</span>
        <div className='arrow-box'>
            <button className='btn-prev'>&lt;</button>
            <button className='btn-next'>&gt;</button>
        </div>
    </div>
  )
}

export default CalendarMonth
