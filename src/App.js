import './App.css';
import Calendar from './page/Calendar';
import Join from './page/member/Join';
import './scss/chapter03.scss';
import React from 'react';
import { Provider } from "react-redux";
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Provider store={store}>
            <Routes>
              <Route path="/" element={<Join></Join>}/>
              <Route path="/date" element={<Calendar></Calendar>}/>
            </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
