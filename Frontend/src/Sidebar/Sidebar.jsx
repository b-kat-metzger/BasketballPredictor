import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataExplorationIcon from '@mui/icons-material/DataExploration';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';

function Sidebar() {
  const cards = [['Dashboard',<DashboardIcon sx={{fontSize:'40px'}}/>],
                 ['Stats',<TimelineIcon sx={{fontSize:'40px'}}/>],
                 ['Predict',<DataExplorationIcon sx={{fontSize:'40px'}}/>],
                 ['Info', <InfoIcon sx={{fontSize:'40px'}}/>]]
  
  return (
    <aside className='sidebar'>
        {
          cards.map(card=>
            <Card key={card[0].toLowerCase()} title={card[0]} icon={card[1] } />
          )
        }
        
    </aside>
  )
}

export default Sidebar

const Card = ({icon,title})=>{
  const path = `/${title.toLowerCase()}`
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate(path);
  }

    return <div className="card row" onClick={e=>{
      e.preventDefault();
      handleClick();
    }}>
      <div className="col-2">
        {icon}
      </div>
      <div className="col-6">
        <h3>{title}</h3>
      </div>
    </div>
}