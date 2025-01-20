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

function App() {
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
