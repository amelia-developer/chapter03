import React from 'react'

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

    return (
        <>
            {
                week7Arr.map((numberDate, index) => 
                    // console.log(`index = ${index}`); // 0, 1, 2, 3, 4 -> 몇번째주인지(0은 첫번째주 = tr)
                    
                    <tr key={index}>
                        {
                            numberDate.map((element, idx) => {
                                if(index === 0 && element > 7) { // 첫번째주(=0)이면서 첫번째주의 수가 7보다(=일주일은 7일)보다 큰수가 있으면                                    
                                    return <td key={idx} className='prev'>{element}</td>
                                }
                                if(index >= 4 && element < 7) { // 마지막주(=4이상=6주짜리Month)이면서 마지막주의 수가 7보다(=일주일은 7일)보다 작은수가 있으면                                    
                                    return <td key={idx} className='next'>{element}</td>
                                }
                                if(idx === 0 ){
                                    return <td key={idx} className='sunday'>{element}</td>
                                } else if(idx === 6) {
                                    return <td key={idx} className='saturday'>{element}</td>
                                } else {
                                    return <td key={idx}>{element}</td>
                                }
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