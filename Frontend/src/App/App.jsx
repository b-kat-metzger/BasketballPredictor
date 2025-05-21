import { useState } from 'react'
import './App.css'
import Header from '../Header/Header.jsx'
import Sidebar from '../Sidebar/sidebar.jsx'
function App() {

  return (
    <div className='app'>
      <Header />
      <div className='app-contents'>
        <Sidebar />
      
      </div>
    </div>
  )
}

export default App
