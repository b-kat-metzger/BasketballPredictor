import './Info.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Info() {
  return (
    <div className='info-container'>
      <div className="info-title row">
        <img src="./about-hero.png" alt="" />
      </div>
      <div className="description">
        <Card sx={{borderRadius:3,boxShadow:4}}>
          <CardContent>
            <Typography variant='h5'>Project Description</Typography>
            <Typography>This is a full-stack web application which uses the native XGBoost classifer model to make predictions for NBA games.
              I used <a href="https://github.com/swar/nba_api">nba_api</a>, an open-source API client package which pulls data from NBA.com.
              With nba_api I built data pipelines for individual player and team stats to use as features for the XGBoost model, which is trained on regular season games.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="technologies">
        <Card sx={{borderRadius:3,boxShadow:4}}>
          <CardContent>
            <Typography variant='h5'>Technologies Used</Typography>
            {/* <Typography>Filler</Typography> */}
            <div className="row mb-5 p-2">
              <div className="col-sm-4 tech-card">
                <img src="./react-1.svg" alt="React logo" width={100} height={100}/>
                <h5>React chosen for performance, easy state management, and single page application capabilities</h5>
              </div>
              <div className="col-sm-4 tech-card">
                <img src="./flask.svg" alt="" width={100} height={100}/>
                <h5>Flask chosen due to lightweight structure since we only need the backend to serve REST APIs</h5>
                </div>
              <div className="col-sm-4 tech-card">
                <img src="./pandas.svg" alt="" width={100} height={100}/>
                <h5>Pandas gives lightning fast performance and has a great use case for our small dataset</h5>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-sm-4 tech-card">
                <img src="./figma-icon.svg" alt="" width={100} height={100}/>
                <h5>Figma used to design layout of website which simplifies production</h5>
              </div>
              <div className="col-sm-4 tech-card">
                <img src="./bootstrap-1.svg" alt="" width={100} height={100}/>
                <h5>Bootstrap allows for easy styling and flexbox usage</h5>
              </div>
              <div className="col-sm-4 tech-card">
                <img src="./material-ui-1.svg" alt="" width={100} height={100}/>
                <h5>Material-UI is a component library which was chosen for its modern feel and easy-to-use components out of the box</h5>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="developer">
        <Card sx={{borderRadius:3,boxShadow:4}}>
          <CardContent>
            <Typography variant='h5'>About the Developer</Typography>
            <Typography>
              Ben Metzger is a 3rd year Computer Science major at Washington State University. 
              I made this project to get more comfortable using pandas and working with machine learning packages such as XGBoost.
              I have also become more comfortable working with a full-stack project in React and look forward to experimenting with
              new datasets and ideas. Feel free to <a href="https://github.com/b-kat-metzger/BasketballPredictor">check out the code</a> and my other projects on GitHub
              and follow me on <a href="https://www.linkedin.com/in/ben-metzger-a82bb634b/">LinkedIn</a>!

            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button href='/' sx={{color:'#284B63'}}>Back to Dashboard</Button>
    </div>
  )
}

export default Info
