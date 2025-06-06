import './Stats.css'
import { useState } from 'react'
import {searchPlayerById, searchPlayerByName} from './searchPlayer.js'
import PlayerTable from './PlayerTable.jsx'

// async function computeStats(nums){
//   const request = {'features':nums}
//   return fetch('http://localhost:5000/predict',{
//     method:'POST',
//     headers:{
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify(request)
//   }).then(data=>data.json())
// }

// async function testPing(){
//   return fetch('http://localhost:5000/ping',{
//     method:'GET',
//     headers:{
//       'Content-Type':'applicaiton/json'
//     },
//     body:JSON.stringify()
//   }).then(data=>data.json())
// }

export default function Stats() {
  const [searchPlayer,setSearchPlayer] = useState("")
  const [displayPlayer,setDisplayPlayer] = useState("");

  const handleSubmit = async e=>{
    e.preventDefault();
    const result_player = await searchPlayerByName(searchPlayer);
    setDisplayPlayer(result_player ? result_player.id: `Could not locate player!`);
  }
  const handleChange = (e)=>{
    setSearchPlayer(e.target.value);
  }

  return (
    <div style={{width:'100%', padding:'5px'}}>
      <h2>Stats</h2>
      <form>
        <input type="text" onChange={handleChange}/>
        <button type="submit" onClick={handleSubmit}>Search player by ID</button>
      </form>
      <h1>{displayPlayer}</h1>
      <p>Hover for more info</p>
      <PlayerTable />

    </div>
  )
}
