import React, { useEffect } from 'react'
import MonthDateField from './MonthDateField'

const Calendar = () => {
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
    <>
      <MonthDateField></MonthDateField>
    </>
  )
}

export default Calendar
