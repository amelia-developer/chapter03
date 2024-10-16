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

    const getFirstOfDayWeek = () => {
        const firstDay = new Date(today.getFullYear(), today.getMonth()-9)        
        return 7 - firstDay.getDay() // 2024년 1월1일 월요일(getDay는 일요일0, 월요일1, 화요일2...), 일주일 7일에서 getDay의 결과를 빼주면 월의 첫째주가 무슨요일부터 시작해서 첫째주에 몇개의 date숫자가 들어가는지 알수 있음
    }

    const getLastOfDayWeek = () => {
        const lastDay = new Date(today.getFullYear(), today.getMonth()-8, 0)
        return 7 - lastDay.getDay() // 일주일 7일에서 getDay의 결과를 빼주면 월의 마지막주가 무슨요일부터 시작해서 마지막주에 몇개의 date숫자가 들어가는지 알수 있음
    }
    
    // let lastArray = numberDate.pop();
    // console.log(`lastArray = ${lastArray}`); /**TODO:이중배열안에서 [28, 29, 30, 31]을 빼오는법 */
       
    while(numberDate.length) {        
        const daysOfFirstWeek = getFirstOfDayWeek() // 함수의 리턴값을 변수에 담음
        const daysOfLastWeek = getLastOfDayWeek()
        
        if(numberDate[0] === 1) {
            const blankNumber = numberDate.splice(newNumberArray, daysOfFirstWeek)                     
            blankNumber.unshift('')
            newNumberArray.push(blankNumber)
        } /**TODO:마지막 주간의 날짜에 빈칸 넣는거 */
        else if (numberDate.length <= 5) {
            // console.log(`numberDate.length = ${numberDate.length}`);
            // console.log(`numberDate = ${numberDate}`);
            const blankNumber2 = numberDate.splice(newNumberArray, daysOfLastWeek)
            blankNumber2.push('')
            newNumberArray.push(blankNumber2)
        } else {
            newNumberArray.push(numberDate.splice(newNumberArray, 7))
        }        

        
    }

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