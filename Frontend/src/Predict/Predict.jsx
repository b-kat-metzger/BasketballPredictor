import './Predict.css'
import Alert from '@mui/material/Alert'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useState,useEffect } from 'react'
import { fetchTeams } from './fetchTeams'
import { makePrediction } from './makePrediction'


export default function Predict() {
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [teamsList, setTeamsList] = useState([]);
    const [prediction,setPrediction] = useState("Select your teams above!");
    const handleHomeTeamChange = (e)=>{
        setHomeTeam(e.target.value)
    }
    const handleAwayTeamChange = (e)=>{
        setAwayTeam(e.target.value)
    }
    const handleSubmitPrediction = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        async function getPrediction(){
            const json = await makePrediction(homeTeam,awayTeam);
            console.log(json[0].win,json[0].W_PCT,json[0].TEAM_NAME)
            let result = `${json[0].TEAM_NAME}: ${(json[0].W_PCT*100).toFixed(2)}%`
            setPrediction(result)
        }
        
        if(homeTeam==awayTeam){
            console.error("Error! Home Team and Away Team must be different!")
            setAlertMessage("Teams must be different!")
            setShowAlert(true)
        }
        else if(homeTeam!="" && awayTeam!=""){
            getPrediction();
            setShowAlert(false)
        }
        else{
            console.error("Error! Home Team or Away Team is blank!")
            setAlertMessage("Must select a team!")
            setShowAlert(true)
        }
    }
    useEffect(()=>{
        let ignore = false;
            async function getTeams(){
                const json = await fetchTeams();
                if(!ignore){
                    setTeamsList(json)
                }
            }
            getTeams();
        return ()=>{
            ignore = true;
        };
    },[]) //triggers on mount
  return (
    <div className='predict-container'>
        <div className="row align-items center">
            <div className="col-12 col-md-8">
                <img className='predict-helper' src="../public/predict-hero.png" alt="" />
            </div>
            <div className="col-md-3 teams-selected">
                <div className="row display-home">
                    <h2 style={{textAlign:'center',color:'#3C6E71'}}>{homeTeam}</h2>
                </div>
                <div className="row display-away">
                    <h2 style={{textAlign:'center',color:'#3C6E71'}}>{awayTeam}</h2>
                </div>
            </div>
        </div>
        <div className="row-lg-8 team-inputs">
            {/* <div className="home-team-input"> */}
                <FormControl sx={{m:1,minWidth:220,borderColor:'black'}}>
                    <InputLabel id="home-team-input-label">Home Team</InputLabel>
                    <Select
                    labelId="home-team-input-label"
                    id='home-team-input-selector'
                    value={homeTeam}
                    label="Home Team *"
                    onChange={handleHomeTeamChange}
                    required={true}
                    >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {teamsList.map(team=>{
                        return(<MenuItem key={team.TEAM_ABBREVIATION} id={team.TEAM_ID} value={team.TEAM_ABBREVIATION}>{team.TEAM_NAME}</MenuItem>);
                    })}
                    </Select>
                    <FormHelperText>Select Home Team</FormHelperText>
                </FormControl>
            {/* </div> */}
            {/* <div className="away-team-input"> */}
                <FormControl sx={{m:1,minWidth:220}}>
                    <InputLabel id="away-team-input-label">Away Team</InputLabel>
                    <Select
                    labelId="away-team-input-label"
                    id='away-team-input-selector'
                    value={awayTeam}
                    label="Away Team *"
                    onChange={handleAwayTeamChange}
                    required={true}
                    >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {teamsList.map(team=>{
                        return(<MenuItem key={team.TEAM_ABBREVIATION} id={team.TEAM_ID} value={team.TEAM_ABBREVIATION}>{team.TEAM_NAME}</MenuItem>);
                    })}
                    </Select>
                    <FormHelperText>Select Away Team</FormHelperText>
                </FormControl>
                <button id="calculate-button" type='submit' onClick={handleSubmitPrediction}>Calculate!</button>
            {/* </div> */}
        </div>
        <Alert severity='error' variant='outlined' sx={{margin:'10px',width:'30%',display:`${showAlert?'relative':'none'}`}}>{alertMessage}</Alert>
        <div className="row-md-6">
            <div id="result-container">
                    <h2>{prediction}</h2>
            </div>
            
        </div>
    </div>
  )
}