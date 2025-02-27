import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetLoginStatus } from '../redux/joinAction'
import DayWeek from './DayWeek'
import DayNumber from './DayNumber';
import { useNavigate, useLocation } from 'react-router-dom';
import ColletMonthMemo from './ColletMonthMemo';
import Weather from './Weather';
import WeekWeather from './WeekWeather';
import Thema from './Thema';

const MonthDateField = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1)
  const [currentOfDays, setCurrentOfDays] = useState(new Date(currentYear, currentMonth, 0).getDate())
  const [isWeather, setIsWeather] = useState('')
  const [isCity, setIsCity] = useState('')
  
  const currentDate = new Date().getDate()

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
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 상태구독
  const loginStatus = useSelector(state => state.join.loginStatus)

  const onLogoutEnd = () => {
    dispatch(resetLoginStatus(false))
    navigate(`/`)
  }
// console.log(`date화면에서 loginStatus = ${loginStatus}`);

  const onWeather = (param) => {
    setIsWeather(param)
  }

  const onCity = (param) => {
    setIsCity(param)
  }

  // 로그인을 안한상태에서 url을 화면의 주소에 직접 입력했을때, date로 넘어가지 않도록 하기 위함
  const location = useLocation()
  useEffect(() => {
      if(!loginStatus) {
// console.log(`로그인화면에서 loginStatus = ${JSON.stringify(loginStatus)}`);
          navigate(`/`)
          alert(`로그인이 필요합니다\n로그인화면으로 돌아갑니다`);
      } else {
          navigate(`/date`)
// console.log(`date화면에서 loginstatus = ${JSON.stringify(loginStatus)}`);
      }
  }, [loginStatus, navigate, location.pathname])

  
return (
    <>
      {
          loginStatus ? 
          <>
          <Thema></Thema>
          <button type="button" onClick={onLogoutEnd} className="btn-logout">로그아웃</button>
          <div className="month-box">
              <span className="number-year">{currentYear}</span>
              <span className="number-month">{currentMonth}</span>
              <span className="text-unit">월</span>
              <div className="arrow-box">
                  <button className="btn-prev" onClick={onPrevMonth}>&lt;</button>
                  <button className="btn-next" onClick={onNextMonth}>&gt;</button>
              </div>
          </div>
          <div className="inner-box">
            <div className="date-box">
                <table>
                    <thead>
                        <tr>
                            <DayWeek weeks={weeks}></DayWeek>
                        </tr>
                    </thead>
                    <tbody>
                        <DayNumber currentOfDays={currentOfDays} dayOfFirstDay={dayOfFirstDay} dayOfLastDay={dayOfLastDay} prevLastDate={prevLastDate} currentMonth={currentMonth} currentYear={currentYear} currentDate={currentDate}></DayNumber>
                    </tbody>
                </table> 
            </div>
            <ColletMonthMemo currentMonth={currentMonth} currentYear={currentYear}></ColletMonthMemo>
          </div>
          <ul className="text-comment">
              <li><span>해당 날짜에 메모를 기입하고 싶으면 날짜를 클릭하세요</span></li>
          </ul>
          <Weather onWeatherHandler={onWeather} onCityHandler={onCity}></Weather>
          <WeekWeather isWeather={isWeather} isCity={isCity}></WeekWeather>
          </>
          : null      
      }
    </>
  )
}

export default MonthDateField
