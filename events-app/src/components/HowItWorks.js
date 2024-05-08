import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, createTheme, ThemeProvider, styled } from '@mui/material';

const theme = createTheme({
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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30, 30, 45, 0.85)',
          color: '#fff',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(255, 255, 255, 0.5)',
          },
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const HowItWorks = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <Typography variant="h2" gutterBottom align="center" color="primary">
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <StyledGridItem item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary">Plan Your Event</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Start by creating your event. Set dates, configure ticket options, and customize your event page.
                </Typography>
              </CardContent>
            </Card>
          </StyledGridItem>

          <StyledGridItem item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary">Promote and Sell</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Utilize our tools to promote your event. Share on social media, send out invitations, and track your sales in real-time.
                </Typography>
              </CardContent>
            </Card>
          </StyledGridItem>

          <StyledGridItem item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary">Manage Everything</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Access real-time data, adjust your event settings, and manage attendees with our comprehensive dashboard.
                </Typography>
              </CardContent>
            </Card>
          </StyledGridItem>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default HowItWorks;
