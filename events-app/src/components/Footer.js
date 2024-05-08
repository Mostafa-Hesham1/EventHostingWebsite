import React from 'react';
import { Grid, Box, Typography, Button, TextField, Container, CssBaseline, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from 'react-router-dom';  

const CustomLink = styled(RouterLink)({
  color: '#90caf9',
  textDecoration: 'none', 
  '&:hover': {
    color: '#f48fb1', 
    textDecoration: 'underline'
  }
});

const SocialIcon = styled(Box)({
  marginRight: '10px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)'
  }
});

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "rgb(16, 20, 25)", py: 6, color: 'white', mt: 5 }}>
      <CssBaseline />
     
      <Box sx={{ width: '100%', height: '4px', bgcolor: 'rgba(255, 255, 255, 0.12)' }}></Box>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <img src="/icons8-ticket-100.png" alt="Ticket Icon" style={{ maxWidth: '50px', marginRight: '10px', filter: 'invert(43%) sepia(85%) saturate(3391%) hue-rotate(174deg) brightness(102%) contrast(101%)' }} />
              <Typography variant="body1">
                Discover and create events with Eventra, your complete ticketing solution.
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <SocialIcon><FacebookIcon /></SocialIcon>
                <SocialIcon><TwitterIcon /></SocialIcon>
                <SocialIcon><InstagramIcon /></SocialIcon>
                <SocialIcon><LinkedInIcon /></SocialIcon>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            <Box><CustomLink to="/aboutUs">About Us</CustomLink></Box>
            <Box><CustomLink to="/howItWorks">How It Works</CustomLink></Box>
            <Box><CustomLink to="/pricing">Pricing</CustomLink></Box>
            <Box><CustomLink to="/contact">Contact Us</CustomLink></Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Support
            </Typography>
            <Box><CustomLink to="/faqs">FAQs</CustomLink></Box>
            <Box><CustomLink to="/termsofService">Terms of Service</CustomLink></Box>
            <Box><CustomLink to="/privacyPolicy">Privacy Policy</CustomLink></Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Stay Updated
            </Typography>
            <TextField
              fullWidth
              label="Your email address"
              variant="filled"
              sx={{
                mb: 1,
                input: { color: 'white' },
                '.MuiFilledInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.09)',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.13)'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,0.12)'
                  }
                }
              }}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Subscribe
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ mt: 6 }}>
          © {new Date().getFullYear()} Eventra. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
