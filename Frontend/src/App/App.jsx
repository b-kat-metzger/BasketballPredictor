import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Dashboard from '../Dashboard/Dashboard.jsx'
import Header from '../Header/Header.jsx'
import Info from '../Info/Info.jsx'
import Settings from '../Settings/Settings.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Stats from '../Stats/Stats.jsx'
function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <main className='app-contents'>
          <Sidebar />
            <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/stats' element={<Stats />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/info' element={<Info />} />
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
