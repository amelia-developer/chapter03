import React from 'react'

const DateWeek = (props) => {  
  return (
    <>
      {
        props.weeks.map((date, index) =>
          date.day === '일' ? 
            <th key={index} className='sunday'>{date.day}</th> : 
          date.day === '토' ? 
            <th key={index} className='saturday'>{date.day}</th> : <th key={index} className=''>{date.day}</th>
        )
      }
    </>
  )
}

export default DateWeek
