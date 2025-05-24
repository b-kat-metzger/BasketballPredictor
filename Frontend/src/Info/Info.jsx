import './Info.css'
import React from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material';

function Info() {
  return (
    <div className='info-container'>
      <div className="info-title">
        <h2>Basketball Predictor</h2>
      </div>
      <div className="description">
        <Card sx={{borderRadius:3,boxShadow:4}}>
          <CardContent>
            <Typography variant='h5'>Project Description</Typography>
            <Typography>Basketball Predictor is a full-stack web application that predicts outcomes for NBA games. 
              Predictions are powered through [machine learning techniques]. Users are able to explore various ML models based
              on real-time metrics using the nba_api public api.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="technologies">
        <Card sx={{borderRadius:3,boxShadow:4}}>
          <CardContent>
            <Typography variant='h5'>Technologies Used</Typography>
            <Typography>Filler</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="developer">
        <Card sx={{borderRadius:3,boxShadow:4}}>
          <CardContent>
            <Typography variant='h5'>About the Developer</Typography>
            <Typography>This project was created by Ben Metzger, a 3rd year Computer Science student studying at Washington
              State University. Created from a passion in data science and the NBA, this project was developed during the 2024-2025 playoffs
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button href='/' sx={{color:'#284B63'}}>Back to Dashboard</Button>
    </div>
  )
}

export default Info
