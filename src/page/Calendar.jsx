import React, { useEffect, useContext } from 'react'
import MonthDateField from './MonthDateField'
import { ThemaContext } from '../context/ThemaContext'

const Calendar = () => {
  const {isDark} = useContext(ThemaContext)

  // 로그인 후 캘린더화면에서 브라우저 뒤로가기금지[s]
  const preventGoBack = () => {
    window.history.go(1)
    console.log("prevent go back!")
  }

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname)
    window.addEventListener("popstate", preventGoBack)
    return () => window.removeEventListener("popstate", preventGoBack)
  }, [])
  // 로그인 후 캘린더화면에서 브라우저 뒤로가기금지[e]
  return (
    <div className={isDark ? 'container dark': 'container white'}>
      <MonthDateField></MonthDateField>
    </div>
  )
}

export default Calendar
