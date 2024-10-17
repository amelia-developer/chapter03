import React from 'react'
import DayWeek from './DayWeek'
import DayNumber from './DayNumber';
// import Test from './Test'; // reduce함수 학습용 테스트 컴포넌트

function CalendarDate() {
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

    let today = new Date();    
    
    let numberDate = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    let newNumberArray = [];

    const lastDay = numberDate[numberDate.length - 1]
    
    const getFirstOfDayWeek = () => {
        const firstDay = new Date(today.getFullYear(), today.getMonth()-9)        
        return 7 - firstDay.getDay() // 2024년 1월1일 월요일(getDay는 일요일0, 월요일1, 화요일2...), 일주일 7일에서 getDay의 결과를 빼주면 월의 첫째주가 무슨요일부터 시작해서 첫째주에 몇개의 date숫자가 들어가는지 알수 있음
    }

    const getLastOfDayWeek = () => {
        const lastDay = new Date(today.getFullYear(), today.getMonth()-8, 0)
        return 7 - lastDay.getDay() // 일주일 7일에서 getDay의 결과를 빼주면 월의 마지막주가 무슨요일부터 시작해서 마지막주에 몇개의 date숫자가 들어가는지 알수 있음
    }
    
    // console.log(`numberDate.splice(7) = ${numberDate.splice(7)}`); // 앞에서 7개 뺀 나머지
    
    const daysOfFirstWeek = getFirstOfDayWeek() // 함수의 리턴값을 변수에 담음
    const daysOfLastWeek = getLastOfDayWeek()
    
    // const eachList = numberDate.splice(0, daysOfFirstWeek) // 0은 startNumber, daysOfFirstWeek는 deleteCount (splce함수에 마우스오버하면 함수형태나옴)        
    // console.log(`eachList = ${eachList}`);
    // console.log(`numberDate = ${numberDate}`);
    
    while(numberDate.length > 0) {           
        if(numberDate[0] === 1) { // 월의 첫째주
            const eachList = numberDate.splice(0, daysOfFirstWeek)             
            eachList.unshift('')
            newNumberArray.push(eachList)
        } else {
            const eachList = numberDate.splice(0,7)
            // console.log(`eachList = ${eachList}`);
            newNumberArray.push(eachList)

            console.log(`eachList.length-1 = ${eachList[eachList.length-1]}`);
            // console.log(`eachList[eachList.length - 1] = ${eachList[eachList.length - 1]}`);
            
            if(eachList[eachList.length - 1] === lastDay) { // 월의 마지막주(31일인지, 30일인지 마지막날짜)
                // console.log(`numberDate = ${numberDate}`);
                // console.log(` 마지막 `);
                for (let index = 0; index < 7 - daysOfLastWeek; index++) {
                    eachList.push('')
                }
                // console.log(`eachList = ${JSON.stringify(eachList)}`); // 월의 마지막날짜 뒤에 빈공간까지 포함되어서 찍힘
            }
        }
    }    

    // console.log(`newNumberArray = ${JSON.stringify(newNumberArray)}`);    
    // console.log(`while문 탄 후 newNumberArray = ${JSON.stringify(newNumberArray)}`);
    // console.log(`이중배열안에서 있는 속배열중에 마지막배열을 뽑는 첫번째방식 = ${newNumberArray[newNumberArray.length-1]}`)
    
    return (
        <div className='date-box'>
            <table>
                <thead>
                    <tr>
                        <DayWeek weeks={weeks}></DayWeek>
                    </tr>
                </thead>
                <tbody>
                    <DayNumber newNumberArray={newNumberArray}></DayNumber>
                    {/* <Test></Test> */}
                </tbody>
            </table> 
        </div>
    )
}

export default CalendarDate