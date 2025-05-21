import './Header.css'
import {React,useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import Toolbar from '@mui/material/Toolbar'
import Tooltip  from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
function Header(){
    const [anchorElUser, setanchorElUser] = useState(null);
    const handleOpenUserMenu = (event)=>{
        setanchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = ()=>{
        setanchorElUser(null);
    }

    const settings = ['Profile','Account','Dashboard','Login']
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
                    <div className="col-4" style={{marginLeft:'auto',marginRight:0}}>
                    <Box sx={{flexGrow:0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p:0}}>
                                <AccountCircleIcon />                            
                            </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{mt:'45px'}}
                        id="menu-header"
                        anchorEl={anchorElUser}
                        anchorOrigin={{vertical:'top',horizontal:'right'}}
                        keepMounted
                        transformOrigin={{vertical:'top',horizontal:'right'}}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            {settings.map(setting=>(
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{textAlign:'center'}}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    </div>
  )
}

export default Header;