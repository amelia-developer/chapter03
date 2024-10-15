import React from 'react'

function DayNumber(props) {    
    return (
        <>
            {props.newNumberArray.map((day, idx) =>                                                
                <tr key={idx}>
                    {day.map((eachDay, index) => {                                
                        return <td key={index}>{eachDay}</td>
                    })}
                </tr>
            )}
        </>
    )
}

export default DayNumber