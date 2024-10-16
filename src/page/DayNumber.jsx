import React from 'react'

function DayNumber(props) {    
    return (
        <>
            {props.newNumberArray.map((day, idx) => 
                <tr key={idx}>
                    {day.map((eachDay, index) =>
                        // console.log(`index = ${index}`);
                        index === 0 ? 
                            <td key={index} className='sunday'>{eachDay}</td> : // 한줄일 때는 return 생략                                           
                        index === 6 ?
                            <td key={index} className='saturday'>{eachDay}</td> : <td key={index} className=''>{eachDay}</td>
                    )}
                </tr>
            )}
        </>
    )
}

export default DayNumber