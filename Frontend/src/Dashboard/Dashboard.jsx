import './Dashboard.css'
import React from 'react'
import Button from '@mui/material/Button'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <section className="hero">
        <div className="row align-items center">
          <div className="col-12 col-md-6">
            <h1 className='sixtyfour-hero-header'>See live predictions for NBA games</h1>
            <p className='hero-text'>Use a highly optimized XGBoost classifier model to calculate win percentages for NBA matchups!</p>
            <p className="hero-text">Navigate to the different site pages using the sidebar or with the buttons below!</p>
          </div>
          <div className="col-12 col-md-6">
            <img id="hero_img" src="./4player-graphic.png" alt="Kawhi Leonard, Shai Gilgeous-Alexander, Anthony Edwards, Tyrese Maxey" />
          </div>
        </div>
      </section>
      <div className="row pt-3">
              <Button className='col-sm-4'href='/predict' sx={{color:'#284B63'}}>Use the model!</Button>
              <Button className='col-sm-4'href='/stats' sx={{color:'#284B63'}}>Look at player stats!</Button>
              <Button className='col-sm-4'href='/info' sx={{color:'#284B63'}}>See information about the project</Button>
      </div>
    </div>

  )
}
