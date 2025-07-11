const fetchPlayers = async (pageNumber,card_limit, sort, order) =>{
    const searchParams = new URLSearchParams({'page':pageNumber,'limit':card_limit, 'sort':sort,'order':order})
    console.debug(`Fetching from url: https://backend-rho1.onrender.com/api/stats/players?${searchParams}`)
    return fetch(`https://backend-rho1.onrender.com/api/stats/players?${searchParams}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/JSON',
        },
    })
    .then(response=>{
        if(!response.ok){
            console.error(response);
        }
        else{
            return response.json();
        }
    })
    .catch(error=>{
        console.error(`Error while fetching player data: ${error}`);
    });
}

export {fetchPlayers}