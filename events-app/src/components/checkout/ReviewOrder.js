import React from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, List, ListItem, ListItemText, Grid, Button } from '@mui/material';

function ReviewOrder({ formData, eventDetails }) {
  if (!eventDetails) {
    return <Typography variant="h6" color="error">Event details not available.</Typography>;
  }

  const imageUrl = eventDetails.posterUrl ? `http://localhost:5000/uploads/${eventDetails.posterUrl}` : 'https://via.placeholder.com/400';



  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Card raised sx={{ maxWidth: 345, mx: "auto", mb: 4 }}>
          <CardMedia
            component="img"
            height="400"
            image={imageUrl}
            alt={eventDetails.title || "Event image"}
            sx={{ borderRadius: '4px 4px 0 0' }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>{eventDetails.title}</Typography>
            <Typography variant="subtitle1" paragraph>{eventDetails.description}</Typography>
            <Typography variant="body1" paragraph>Actors: {eventDetails.actors?.join(', ')}</Typography>
            <Typography variant="body2" paragraph>Location: {eventDetails.location}</Typography>
            <Typography variant="body2" paragraph>Event Time: {eventDetails.eventTime}</Typography>
            <Typography variant="caption" display="block" gutterBottom>Event Date: {eventDetails.eventDate}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        <List disablePadding>
          <ListItem><ListItemText primary="Street" secondary={formData.street} /></ListItem>
          <ListItem><ListItemText primary="City" secondary={formData.city} /></ListItem>
          <ListItem><ListItemText primary="Postal Code" secondary={formData.zip} /></ListItem>
          <ListItem><ListItemText primary="Phone Number" secondary={formData.phoneNumber} /></ListItem>
          <ListItem><ListItemText primary="Total Price" secondary={`$${eventDetails.pricing?.standard || 'Not available'}`} /></ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default ReviewOrder;
