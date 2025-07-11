const makePrediction = async(home_team,away_team)=>{
    return fetch(`https://backend-rho1.onrender.com/api/predict?home=${home_team}&away=${away_team}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/JSON'
        }
    })
    .then(response=>{
        if(!response.ok){
            console.error(response)
        }
        else{
            return response.json()
        }
    })
    .catch(error=>
        console.log(`Error while making prediction with HOME:${home_team}, AWAY:${away_team}. Error:${error}`)
    );
}

export {makePrediction}