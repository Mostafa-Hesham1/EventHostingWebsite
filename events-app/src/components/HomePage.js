import React from 'react';
import { Button, Typography, Box, Container, Grid, Card, CardContent, CardMedia, createTheme, ThemeProvider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h2: {
      fontSize: '3.0rem',  
    },
    h5: {
      fontSize: '1.8rem', 
    },
    body1: {
      fontSize: '1.4rem', 
    },
  },
  palette: {
    primary: {
      main: '#3399ff',
    },
    background: {
      default: 'rgb(16, 20, 25)',
    },
    text: {
      primary: 'rgb(51,153,255)',
      secondary: 'white',
    },
  },
});

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ bgcolor: "rgb(16, 20, 25)", color: "rgb(51,153,255)", mt: -2, pt: 4 }}>

        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: "rgb(51,153,255)" }}>
            Your Event Starts Here
          </Typography>
          <Typography variant="h6" color="rgb(51,153,255)" paragraph>
            Create, manage, and grow your events with ease.
          </Typography>
          <RouterLink to="/pricing" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </RouterLink>
        </Box>
        <Grid container spacing={3}>

        <Grid container spacing={4}>
          
          <Grid item xs={12} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: "rgb(16, 20, 25)" }}>
              <CardMedia
                component="video"
                sx={{ height: 200, width: '100%' }}
                alt="Event Creation"
                autoPlay
                muted
                loop
              >
                <source src="videos/Event Creation.mp4" type="video/mp4" />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color="rgb(51,153,255)">
                  Event Creation
                </Typography>
                <Typography variant="body2" color="white">
                  Easily create and customize your events to match your brand.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: "rgb(16, 20, 25)" }}>
              <CardMedia
                component="video"
                sx={{ height: 200, width: '100%' }}
                alt="Ticket Sales"
                autoPlay
                muted
                loop
              >
                <source src="videos/get your ticket.mp4" type="video/mp4" />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color="rgb(51,153,255)">
                  Ticket Sales
                </Typography>
                <Typography variant="body2" color="white">
                  Simple and secure ticket sales and processing.
                </Typography>
              </CardContent>
            </Card>
          </Grid>


         
          <Grid item xs={12} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: "rgb(16, 20, 25)" }}>
              <CardMedia
                component="video"
                sx={{ height: 200, width: '100%' }}
                alt="Attendee Management"
                autoPlay
                muted
                loop
              >
                <source src="videos/Attendee Management.mp4" type="video/mp4" />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color="rgb(51,153,255)">
                  Attendee Management
                </Typography>
                <Typography variant="body2" color="white">
                  Manage your attendees with real-time data and analytics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        



          <Grid item xs={12} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: "rgb(16, 20, 25)" }}>
              <CardMedia
                component="video"
                sx={{ height: 200, width: '100%' }}
                alt="Promotional Tools"
                autoPlay
                muted
                loop
              >
                <source src="videos/Promotional Tools.mp4" type="video/mp4" />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color="rgb(51,153,255)">
                  Promotional Tools
                </Typography>
                <Typography variant="body2" color="white">
                  Powerful tools to promote your events and boost engagement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>




          <Grid item xs={12} md={7}>
            <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 350, bgcolor: "rgb(16, 20, 25)" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color="rgb(51,153,255)">
                  Dedicated Support
                </Typography>
                <Typography variant="body2" color="white">
                  Our dedicated team is always ready to answer your questions.
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: 388 }}
                image="images/pexels-mart-production-7709085.jpg"
                alt="Dedicated Support"
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
  <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 350, bgcolor: "rgb(16, 20, 25)" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="div" color="rgb(51,153,255)">
        Powerful Features
      </Typography>
      <Typography variant="body2" color="white">
        Need to set up recurring events, coupons, or custom forms? We’ve got you covered.
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      sx={{ width: '100%', height: "100%" }}
      image="images/Powerful-1.png"
      alt="Powerful features in a simple dashboard"
    />
  </Card>
</Grid>


          <Grid item xs={12} md={4}>
    <CardMedia
      component="img"
      sx={{ width: '100%', height: 'auto' }}
      image="images/multiple-ticket-types.png"
      alt="Multiple Ticket Types"
    />
  </Grid>
  <Grid item xs={12} md={8}>
        <Box sx={{ bgcolor: "rgb(16, 20, 25)", color: "rgb(51,153,255)", p: 3 }}>
          <Typography variant="h4" component="div" color="rgb(51,153,255)" sx={{ fontWeight: 'bold', fontSize: '1.7em' }}>
            How it works
          </Typography>
          <Typography variant="body1" color="white" paragraph sx={{ fontSize: '1.4em' }}>
            <span style={{ color: 'rgb(51,153,255)', fontWeight: 'bold' }}>1. </span>Create: Create an event and add a name, date, tickets, and description.
          </Typography>
          <Typography variant="body1" color="white" paragraph sx={{ fontSize: '1.4em' }}>
            <span style={{ color: 'rgb(51,153,255)', fontWeight: 'bold' }}>2. </span>Customize: Add personality to your event page with event details, images, videos, and more.
          </Typography>
          <Typography variant="body1" color="white" paragraph sx={{ fontSize: '1.4em' }}>
            <span style={{ color: 'rgb(51,153,255)', fontWeight: 'bold' }}>3. </span>Promote: Share the event via social media with one click and spread the word via email or in person.
          </Typography>
          <Typography variant="body1" color="white" paragraph sx={{ fontSize: '1.4em' }}>
            <span style={{ color: 'rgb(51,153,255)', fontWeight: 'bold' }}>4. </span>Manage: Generate sales with early-bird discounts, coupons, and group ticketing features, and more.
          </Typography>
          <Typography variant="body1" color="white" sx={{ fontSize: '1.4em' }}>
            <span style={{ color: 'rgb(51,153,255)', fontWeight: 'bold' }}>5. </span>Receive: Get paid directly to your bank account according to your schedule.
          </Typography>
        </Box>
      </Grid>
</Grid>

      </Grid>
    </Container>
    </ThemeProvider>
  );
}

export default HomePage;
