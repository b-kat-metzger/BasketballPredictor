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

  return (
    <div style={{width:'100%',padding:'10px', justifyContent:'left',textAlign:'left'}}>
      <h1>Players</h1>
      <p>Hover for more info</p>
      <PlayerTable />

    </div>
  )
}
