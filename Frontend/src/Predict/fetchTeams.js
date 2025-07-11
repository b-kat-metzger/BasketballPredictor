const fetchTeams= async ()=>{
    return fetch('https://backend-rho1.onrender.com/api/teams',{
        method:'GET',
        headers:{
            'Content-Type':'application/JSON'
            }
    })
    .then(response=>{
        if(!response.ok){
            console.error(response);
        }
        else{
            return response.json()
        }
    })
    .catch(error=>{
        console.error(`Error while fetching teams ${error}`);
    });
}

export {fetchTeams}