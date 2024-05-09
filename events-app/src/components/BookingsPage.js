import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Container, Grid, Button, Snackbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {SERVER_URL} from "../contants"
const CustomCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        '& .cardMedia': {
            filter: 'brightness(70%)'
        }
    }
}));
function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                //console.log("Querying bookings for userID:", userId);
    
                if (!userId) {
                    throw new Error('User ID is missing');
                }
    
                const bookingsResponse = await axios.get(`${SERVER_URL}/booking/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (bookingsResponse.status === 200 && bookingsResponse.data.bookings.length > 0) {
                    const events = await Promise.all(bookingsResponse.data.bookings.map(async (booking) => {
                        const eventId = booking.event._id || booking.event;
                        const eventResponse = await axios.get(`${SERVER_URL}/event/${eventId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const eventDate = new Date(eventResponse.data.event.eventDate);
                        const now = new Date();
                        const timeDiff = eventDate.getTime() - now.getTime();
                        const daysUntilEvent = Math.floor(timeDiff / (1000 * 3600 * 24));
    
                        return {
                            ...booking,
                            eventDetails: eventResponse.data.event,
                            daysUntilEvent
                        };
                    }));
                    setBookings(events);
                } else {
                   // console.log('No bookings found for this user.');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
                handleNotification('Failed to fetch bookings. Please try again: ' + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, []);
    
    

    const handleCancelBooking = async (bookingId, daysUntilEvent, index) => {
        if (daysUntilEvent <= 2) {
            handleNotification("Cancellation period has expired. You can no longer cancel this booking.", 'error');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${SERVER_URL}/booking/${bookingId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                handleNotification("Booking cancelled successfully", 'success');
                setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
            } else {
                handleNotification("Failed to cancel booking: " + response.data.message, 'error');
            }
        } catch (error) {
            handleNotification("Failed to cancel booking: " + (error.response?.data?.message || error.message), 'error');
        }
    };

    const handleRequestRefund = async (bookingId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${SERVER_URL}/booking/${bookingId}/refund`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                handleNotification("Refund requested successfully", 'success');
            } else {
                handleNotification("Failed to request refund: " + response.data.message, 'error');
            }
        } catch (error) {
            handleNotification("Failed to request refund: " + (error.response?.data?.message || error.message), 'error');
        }
    };

    const handleNotification = (message, type) => {
        setNotification({ message, type });
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) return <div>Loading bookings...</div>;

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom style={{ color: '#FFF', fontFamily: 'Montserrat', fontWeight: 'bold' }}>Your Bookings</Typography>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={notification.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
            <Grid container spacing={4}>
                {bookings.length > 0 ? bookings.map((booking, index) => (
                    <Grid item key={booking._id} xs={12} sm={6} md={4}>
                        <CustomCard raised sx={{ position: 'relative' }}>
                            
                            <CardMedia
                                component="img"
                                height="300"
                                image={booking.eventDetails?.posterUrl ? `${SERVER_URL}/uploads/${booking.eventDetails.posterUrl}` : 'https://via.placeholder.com/300'}
                                alt={booking.eventDetails?.title || "Event Image"}
                                sx={{ filter: 'brightness(50%)' }} 
                            />
                            <CardContent sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', padding: 2, backdropFilter: 'blur(5px)' }}>
                                <Box>
                                    <Typography variant="h5" component="div" style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'rgb(51, 153, 255)' }}>
                                        {booking.eventDetails?.title || "No title available"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Location: {booking.eventDetails?.location || "No location available"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Date: {booking.eventDetails?.eventDate ? new Date(booking.eventDetails.eventDate).toLocaleDateString() : "No date available"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Time: {booking.eventDetails?.eventTime || "No time available"}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleCancelBooking(booking._id, booking.daysUntilEvent, index)}
                                        sx={{ mt: 1 }}
                                    >
                                        Cancel My Order
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            handleRequestRefund(booking._id);
                                        }}
                                        sx={{ mt: 1 }}
                                    >
                                        Request Refund
                                    </Button>
                                </Box>
                            </CardContent>

                        </CustomCard>
                    </Grid>
                )) :  <Typography variant="h5" margin={'20px'} component="div" style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'rgb(51, 153, 255)' }}>
                No bookings found.</Typography>}
            </Grid>
        </Container>
    );
}

export default UserBookings;
