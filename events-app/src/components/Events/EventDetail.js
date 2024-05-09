import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, Container, Button, Snackbar, useTheme } from '@mui/material';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SERVER_URL } from '../../constants';
const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const eventResponse = await axios.get(`${SERVER_URL}/event/${id}`);
        if (eventResponse.data.event) {
          setEvent(eventResponse.data.event);
        } else {
          throw new Error('Event not found');
        }

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (userId && token) {
          const bookingsResponse = await axios.get(`${SERVER_URL}/booking/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const bookedEventIds = bookingsResponse.data.map(booking => booking.event._id);
          setIsBooked(bookedEventIds.includes(id));
        }
      } catch (error) {
        console.error('Failed to fetch event details or bookings:', error);
        setSnackbarMessage('Failed to load event details or check bookings.');
        setSnackbarOpen(true);
      }
    }
    fetchData();
  }, [id]);

  const handleBuyTicket = () => {
    if (isBooked) {
      setSnackbarMessage('You have already booked this event.');
      setSnackbarOpen(true);
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!event) {
    return <Typography variant="h5" color="error">Event not found!</Typography>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ padding: 4 }}>
      <Card raised sx={{
        backgroundColor: '#333',
        color: '#fff',
        marginBottom: 4,
        boxShadow: `0px 12px 24px -4px ${theme.palette.grey[900]}`,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)"
        },
        borderRadius: 2
      }}>
        <CardMedia
          component="img"
          height="400"
          image={event.posterUrl ? `${SERVER_URL}/uploads/${event.posterUrl}` : 'https://via.placeholder.com/400'}
          alt={event.title}
          sx={{ borderRadius: '4px 4px 0 0' }} 
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{event.title}</Typography>
          <Typography variant="subtitle1" paragraph>{event.description}</Typography>
          <Typography variant="body1" paragraph>Actors: {event.actors ? event.actors.join(', ') : 'No actors listed'}</Typography>
          <Typography variant="body2" paragraph>Location: {event.location}</Typography>
          <Typography variant="body2" paragraph>Event Time: {event.eventTime}</Typography>
          <Typography variant="caption" display="block" gutterBottom>Event Date: {event.eventDate}</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={handleBuyTicket}
            sx={{ mt: 2 }}
          >
            Buy Ticket (${event.pricing ? event.pricing.standard : 'N/A'})
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default EventDetail;
