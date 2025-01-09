import React from 'react'

const WeekWeather = ({isWeather, isCity}) => {
// console.log(`isWeather = ${JSON.stringify(isWeather)}`);
// console.log(`isCity = ${JSON.stringify(isCity.name)}`);
    if(isWeather.length === 0){
        return <div>no weather data available</div>
    }

    const todayDate = new Date().getDate()
    const dateResult = []

    for (let i = 0; i < 6 ; i++) {
        const date = todayDate + i
        dateResult.push(date)
    }

    const getWeatherIcon = (date) => {
        const weatherData = isWeather.find(value => {
            const weatherDate = new Date(value.dt_txt).getDate()
// console.log(`weatherDate = ${JSON.stringify(weatherDate)}`);
            return date === weatherDate
        })

        return weatherData ? weatherData.weather[0].icon : '\n' // wather[{ }]배열안에 객체형태로 들어가있어서 [0]을 하면 들어가있는 첫번째객체를 말하는거임
    }
    return (
        <div className="week-weather-box">
            <span className="title">현재날짜를 기준으로 6일동안의 {isCity.name} 날씨</span>
            <table>
                <caption>날씨정보 테이블</caption>
                <thead>
                    <tr>
                        {
                            dateResult.map((element, key) => {
                                if(key === 0) {
                                    return <th key={key}>{element}일(today)</th>
                                } else {
                                    return <th key={key}>{element}일</th>
                                }
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            dateResult.map((date, key)=> {
                               return <td key={key}><img src={`http://openweathermap.org/img/wn/${getWeatherIcon(date)}.png`} alt=""/></td>
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default WeekWeather
