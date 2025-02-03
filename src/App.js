import './App.css';
import Calendar from './page/Calendar';
import Join from './page/member/Join';
import Login from './page/member/Login'
import './scss/chapter03.scss';
import React from 'react';
import { Provider } from "react-redux";
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemaProvider } from './context/ThemaContext'
import  axios from 'axios';
import { useEffect } from 'react';

function App() {
  // Axios 전역 설정 (토큰 포함)
  useEffect(() => {
    const token = localStorage.getItem('token') // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      console.log("로컬스토리지에 토큰 없음")
    }
  }, []) // 처음 렌더링될 때 한 번 실행
  
  return (
    <div className="App">
      <Provider store={store} >
        <ThemaProvider>
          <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>        
            <Routes>
              <Route path="/" element={<Login></Login>}/>
              <Route path="/join" element={<Join></Join>}/>
              <Route path="/date" element={<Calendar></Calendar>}/>
            </Routes>          
          </BrowserRouter>
        </ThemaProvider>
      </Provider>
    </div>
  );
}

export default App;
