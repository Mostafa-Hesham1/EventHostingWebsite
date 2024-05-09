import React, { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CssBaseline,
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Box,
  TextField, useMediaQuery, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  Delete as DeleteIcon, Home as HomeIcon, EventNote as EventNoteIcon, ExitToApp as ExitToAppIcon,
  Add as AddIcon, ExpandMore as ExpandMoreIcon, Menu as MenuIcon, People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUpUser } from '../../api-helpers/api-helpers';
import { SERVER_URL } from '../../contants';

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

const ManageUsers = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const result = await signUpUser(newUser);
      if (result.success) {
        setUsers([...users, result.user]);
        setUserDialogOpen(false);
        setNewUser({ name: '', email: '', password: '' }); 
        console.log('User added successfully');
      } else {
        console.error(result.message || 'Failed to add user. Please try again.');
      }
    } catch (error) {
      console.error('Failed to add user:', error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${SERVER_URL}/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    localStorage.removeItem("role"); 
    navigate('/login');
};  
  const fetchUserBookings = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/booking/user/${userId}`);
      setBookings(response.data.bookings);
      setSelectedUser(userId);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
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
            Manage Users
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pl: { sm: `${drawerWidth}px`, xs: 0 }, bgcolor: 'background.default' }}>
        <Toolbar />
        <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => setUserDialogOpen(true)}>
          Add User
        </Button>
        <Paper sx={{ mt: 3, p: 2, bgcolor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>Manage Users</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Bookings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUser(user._id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button startIcon={<ExpandMoreIcon />} onClick={() => fetchUserBookings(user._id)}>
                      View Bookings
                    </Button>
                    {selectedUser === user._id && (
                      <Accordion expanded={selectedUser === user._id} onChange={() => setSelectedUser(null)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Booking Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List>
                            {bookings.map((booking, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={`Booking ID: ${booking._id}`}  />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddUser} color="primary">
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default ManageUsers;
