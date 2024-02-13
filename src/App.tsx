import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowData from './Components/ShowData.tsx';
import ExpenseTracker from './Components/ExpenseTracker.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowData></ShowData>} Component={ShowData}></Route>
          <Route path='/add' element={<ExpenseTracker onTrue={undefined} OnClose={undefined}/>}></Route>            
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
