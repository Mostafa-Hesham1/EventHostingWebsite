import React, { useState, useEffect } from 'react';
import { Link as RouterLink,useNavigate  } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { getAllevents } from '../api-helpers/api-helpers.js';


const pages = [
  { name: 'AboutUs', path: '/aboutUs' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'ContactUs', path: '/contact' },
  { name: 'Events', path: '/events' }
];
interface Event {
  title: string;
  // Add other event properties as needed
}


function ResponsiveAppBar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  useEffect(() => {
    async function fetchEvents() {
      const result = await getAllevents();
      if (result && result.events) {
        setEvents(result.events);
      } else {
        setEvents([]);
      }
    }

    fetchEvents();
    setIsAuthenticated(localStorage.getItem("isLoggedIn") === "true");
  }, []);
  const handleNavigate = (path) => {
    if (path === '/events' && !isAuthenticated) {
      toast.error("Please login to view the events", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      navigate(path);
    }
  };

  const logout = () => {
    console.log("Logout action");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    toast.info("Logged out successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/');
  };
  const settings = isAuthenticated ? [
    { name: 'Bookings', path: '/bookings' },
    ...(role === 'admin' ? [{ name: 'Dashboard', path: '/Manage-event' }] : []),
    { name: 'Logout', action: logout }
  ] : [
    { name: 'Sign In/Sign Up', path: '/signup' }  
  ];
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const imageUrl = `/icons8-ticket-100.png`; 

  return (
    <>
    <AppBar position="sticky" sx={{ bgcolor: "rgb(16, 20, 25)" }}>
      <Container maxWidth="xl">
      <Toolbar disableGutters>
          <RouterLink to="/homepage">
            <img src={imageUrl} alt="Ticket Icon" style={{ maxWidth: '50px', marginRight: '10px', filter: 'invert(43%) sepia(85%) saturate(3391%) hue-rotate(174deg) brightness(102%) contrast(101%)' }} />
          </RouterLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ '.MuiPaper-root': { bgcolor: 'rgb(16, 20, 25)', color: 'rgb(51, 153, 255)' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}


            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            
          </Box>
          <Box width="30%" margin="auto">
              <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={events.map((option, index) => option.title + index)}
                  renderInput={(params) => (
                      <TextField {...params} placeholder="Search Events" variant="standard" sx={{ input: { color: "rgb(51, 153, 255)" } }} />
                  )}
              />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ '.MuiPaper-root': { bgcolor: 'rgb(16, 20, 25)', color: 'rgb(51, 153, 255)' } }}
            >
              {settings.map((setting) =>
                setting.path ? (
                  <MenuItem key={setting.name} component={RouterLink} to={setting.path}>
                    <Typography>{setting.name}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting.name} onClick={setting.action}>
                    <Typography>{setting.name}</Typography>
                  </MenuItem>
                )
              )}
          

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box sx={{ height: '0.7px', bgcolor: 'white' }}></Box>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default ResponsiveAppBar;
