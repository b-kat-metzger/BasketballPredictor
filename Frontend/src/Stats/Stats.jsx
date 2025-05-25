import './Stats.css'
import { useState } from 'react'

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

async function searchPlayerById(player_id){
  return fetch(`http://localhost:5000/players/${player_id}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify()
  })
  .then(response=>{
    if(!response.ok){
      console.log(response)
      if(response.status===404){
        console.error(`Could not locate player with id: ${player_id}`)
      }
      else{
        console.error("Error: ", response.status);
      }
    }
    else{
      return response.json()
    }
  })
  // .then(data=>data.json())
  .catch(error=>{
    console.error('Fetch error', {error});
  })
}

export default function Stats() {
  const [searchPlayer,setSearchPlayer] = useState("")
  const [displayPlayer,setDisplayPlayer] = useState("");

  const handleSubmit = async e=>{
    e.preventDefault();
    const result_player = await searchPlayerById(searchPlayer);
    setDisplayPlayer(result_player ? result_player.full_name: `Could not locate player!`);
  }
  const handleChange = (e)=>{
    setSearchPlayer(e.target.value.split(","));
  }

  return (
    <div>
      <h2>Stats</h2>
      <form>
        <input type="text" onChange={handleChange}/>
        <button type="submit" onClick={handleSubmit}>Search player by ID</button>
      </form>
      <h1>{displayPlayer}</h1>
    </div>
  )
}
