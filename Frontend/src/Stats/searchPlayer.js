
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
  .catch(error=>{
    console.error('Fetch error', {error});
  })
}

async function searchPlayerByName(player_name){
    const joinedName = player_name.split(" ").join("_");
    return fetch(`https://backend-rho1.onrender.com/players/${joinedName}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/JSON'
    },
    body:JSON.stringify()
  })
  .then(response=>{
    if(!response.ok){
      console.log(response)
      if(response.status===404){
        console.error(`Could not locate player with name: ${player_name}`)
      }
      else{
        console.error("Error:", response.status);
      }
    }
    else{
      return response.json();
    }
  })
  .catch(error=>console.error('Fetch error:',{error}))
}

export {searchPlayerById, searchPlayerByName}