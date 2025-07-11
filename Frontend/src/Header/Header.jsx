import './Header.css'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
function Header(){
  return (
    <div className='header'>
        <AppBar display='flex'sx={{backgroundColor:'white',color:'black'}}>
            <Container maxWidth="x1">   
                <Toolbar disableGutters>
                    <SportsBasketballIcon sx={{marginRight:2}}/>
                    <Typography
                    variant='h6'
                    noWrap
                    component="h1"
                    className='header-title'
                    sx={{
                        fontFamily:'monospace',
                        fontWeight:700,
                        letterSpacing:'.15rem',
                        color:'inherit',
                        textDecoration:'none',                        
                    }}
                    >
                        Basketball Predictor
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    </div>
  )
}

export default Header;