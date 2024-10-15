import './App.css';
import './scss/chapter03.scss';
import React from 'react';
import CalendarMonth from './page/CalendarMonth';
import CalendarDate from './page/CalendarDate';

function App() {
  return (
    <div className="App">
      <CalendarMonth></CalendarMonth>
      <CalendarDate></CalendarDate>
    </div>
  );
}

export default App;
