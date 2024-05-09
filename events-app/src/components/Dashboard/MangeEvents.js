import React, { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Box,
  useMediaQuery, SwipeableDrawer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {SERVER_URL} from "../../contants"
const drawerWidth = 240;

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "rgb(16, 20, 25)",
      paper: "rgb(16, 20, 25)"
    },
    text: {
      primary: "#fff",
      secondary: "#b9bbbe"
    }
  },
});

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const adminId = localStorage.getItem('adminId');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/event?admin=${adminId}`);
                setEvents(response.data.events);
            } catch (error) {
                console.error('Failed to fetch events', error);
            }
        };
        fetchEvents();
    }, [adminId]);

    const handleViewDetails = (event) => {
        setSelectedEvent(event);
        setDetailOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailOpen(false);
        setSelectedEvent(null);
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/event/${eventId}`);
            if (response.status === 200) {
                setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
                //console.log('Event deleted successfully:', response.data);
            }
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    const handleAddEvent = () => {
        navigate('/add-event');
    };

    const handleUpdateEvent = (eventId) => {
        navigate(`/updateEvent/${eventId}`);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // Example of removing auth status
        localStorage.removeItem("role"); // Remove role from local storage
        navigate('/login');
    };  

    const drawer = (
        <List>
            <ListItem button component={RouterLink} to="/homepage">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="HomePage" />
            </ListItem>
            <ListItem button component={RouterLink} to="/homepage">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="HomePage" />
            </ListItem>
            <ListItem button component={RouterLink} to="/Manage-user">
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button component={RouterLink} to="/Manage-event">
                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                <ListItemText primary="Manage Events" />
            </ListItem>
            <ListItem button component={RouterLink} to="/events">
                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                <ListItemText primary="Events" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        Manage Events
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                onOpen={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawer}
            </SwipeableDrawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, pl: { sm: `${drawerWidth}px`, xs: 0 }, bgcolor: 'background.default' }}>
                <Toolbar />
                <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="h5" gutterBottom>Manage Events</Typography>
                    <Button variant="contained" onClick={handleAddEvent} color="primary" sx={{ mb: 2 }}>Add New Event</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map(event => (
                                <TableRow key={event._id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{new Date(event.eventDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleViewDetails(event)} color="primary">
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleUpdateEvent(event._id)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteEvent(event._id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Dialog open={detailOpen} onClose={handleCloseDetails} fullWidth maxWidth="sm">
                        <DialogTitle>Event Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="h6">Title: {selectedEvent?.title}</Typography>
                                <Typography>Description: {selectedEvent?.description}</Typography>
                                <Typography>Location: {selectedEvent?.location}</Typography>
                                <Typography>Event Date: {new Date(selectedEvent?.eventDate).toLocaleDateString()}</Typography>
                                <Typography>Event Time: {selectedEvent?.eventTime}</Typography>
                                <Typography>Standard Price: ${selectedEvent?.pricing.standard}</Typography>
                                <Typography>VIP Price: ${selectedEvent?.pricing.vip}</Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDetails} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default ManageEvents;
