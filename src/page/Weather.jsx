import React, { useEffect, useState } from 'react'

const Weather = ({onWeatherHandler, onCityHandler}) => {
    const cityValue = 'seoul'
    const key = '9b02d0c7fe3dc4b5148b163564036a1b'
    const [weatherValue, setWeatherValue] = useState('')
    const [daysWeatherValue, setDaysWeatherValue] = useState('')

    const sendWeatherParent = () => {
        onWeatherHandler(daysWeatherValue)
    }

    const getWeather = async() => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric&lang=KR`)
        const result = await response.json()

        setWeatherValue(result)

// console.log(`result = ${JSON.stringify(result)}`);
// .then(res => res.json())
// .then(data => {
//     console.log(`data = ${JSON.stringify(data)}`)
// })
    }

    const getDaysWeater = async() => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=metric&lang=KR`)
        const result = await response.json()

        /**
         *   1970년 1월 1일 경과한 시간은 UTC라고 하는데 이 UTC로 한국의 현재시간을 얻으려면 9시간을 더해야한다
             다시말해서, UTC와 한국시간이 9시간 차이가나기때문인데
             00시부터 9시 이전에 날씨를 불러오면 UTC는 9시간이 느리기 때문에
             오늘 기준이아닌 어제 기준으로 다음날이 계산돼서 하루씩 앞당겨지게 된다
             그래서 1970년 1월 1일 부터 경과한 밀리초에서 9시간짜리 밀리초 더해줬다
         */
            const oneDay = 1000 * 60 * 60 * 24 // 하루를 밀리초로
            const offset = 1000 * 60 * 60 * 9 // UTC+9
            const today = new Date().getTime() + offset // 현재시간에 offset적용
            // const DesiredTime = ' 18:00:00' // 내가 원하는 시간 포맷

            // 결과를 저장할 배열
            const result7 = []

            // 7개의 날짜를 생성
            for (let i = 0; i < 6; i++) {
                const date = new Date(today + oneDay * i) // 날짜계산
                            .toISOString().slice(0, 10)
                            result7.push(date)
            }
           
            // const oneDaysLater = new Date(today).toISOString().slice(0, 10) + DesiredTime
            // const twoDaysLater = new Date(today + oneDay * 1).toISOString().slice(0, 10) + DesiredTime
            // const threeDaysLater = new Date(today + oneDay * 2).toISOString().slice(0, 10) + DesiredTime
        
            const data = result.list.filter(item => {
                return result7.includes(item.dt_txt.slice(0, 10))
                // return item.dt_txt === oneDaysLater || item.dt_txt === twoDaysLater || item.dt_txt === threeDaysLater
            });

            // // 2024-01-01 부터 7일동안의 '년-월-일'을 배열로 가져오기
        // const today = new Date().toISOString().slice(0, 10)
        // const sevenDaysArr = (startDate) => {
        //     const dates = []
        //     let currentDate = new Date(startDate) // 시작날짜를 객체로 변환

        //     for (let i = 0; i < 7; i++) {
        //         dates.push(currentDate.toISOString().slice(0, 10))
        //         currentDate.setDate(currentDate.getDate()+1) // setDate는 '월의 일자'를 알려줌
        //     }
        //     return dates
        // }

        setDaysWeatherValue(data)
    }

    const sendWeatherCity = () => {
        onCityHandler(weatherValue)
    }

    useEffect(() => {
        getWeather()
        getDaysWeater()
    }, [])

    useEffect(() => {
        sendWeatherParent()
        sendWeatherCity()
    }, [daysWeatherValue, weatherValue])

    return (
        <>
        {
            weatherValue && /** 'weatherValue &&' 이게 없으면, weatherValue데이터가 없어서 typeError발생, weatherValue이 변수의초기값으로 htmlDom을 그리고있잖아 */
            <div className="weather-box">
                <p className="title">현재 당신이 계신 대한민국 도시는 {weatherValue.name} 입니다</p>
                <span className="imgbox">{weatherValue.name}의 날씨는 <img src={`https://openweathermap.org/img/wn/${weatherValue.weather[0].icon}.png`} alt=""/></span>
                <div className="temperature">
                    <span>최고: {weatherValue.main.temp_max}도</span>
                    <span>최저: {weatherValue.main.temp_min}도</span>
                </div>
            </div>
        }
        </>
    )
}

export default Weather