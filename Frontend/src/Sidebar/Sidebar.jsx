import './Sidebar.css'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';

function Sidebar() {
  const cards = [['Dashboard',<DashboardIcon sx={{fontSize:'40px'}}/>],
                 ['Stats',<TimelineIcon sx={{fontSize:'40px'}}/>],
                 ['Settings',<SettingsIcon sx={{fontSize:'40px'}}/>]]
  return (
    <aside className='sidebar'>
        {
          cards.map(card=>
            <Card title={card[0]} icon={card[1]} />
          )
        }
        
    </aside>
  )
}

export default Sidebar

const Card = ({icon,title})=>{

    return <div className="card row">
      <div className="col-2">
        {icon}
      </div>
      <div className="col-8">
        <h3>{title}</h3>
      </div>
    </div>
}