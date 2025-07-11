import './Dashboard.css'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

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
             <NavButton path="/predict" text="Use the model!" />
             <NavButton path="/stats" text="Look at player stats!"/>
             <NavButton path="/info" text="See information about the project"/>
      </div>
    </div>

  )
}


function NavButton({path,text}){
  const navigate = useNavigate()
  const handleClick =()=>{
    navigate(path)
  }
  return(
    <Button className='col-sm-4'onClick={(e)=>{
      e.preventDefault();
      handleClick({path})}} sx={{color:'#284B63'}
      }>
      {text}
    </Button>
  )
}