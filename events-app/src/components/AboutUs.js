import React from 'react';
import { Grid, Typography, Card, CardContent, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.5)',
  },
  backgroundColor: 'rgba(50, 50, 70, 0.9)', 
  color: '#fff',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
});

const AboutUs = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h2" gutterBottom align="center" style={{ color: '#90caf9', marginBottom: '40px' }}>
        About Us
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {[
          {
            title: 'Our Mission',
            description: 'To empower people to experience the world, offering the best options to discover and purchase tickets for events across the globe.'
          },
          {
            title: 'What We Do',
            description: 'We provide a platform for event goers to buy tickets effortlessly and for event organizers to sell tickets and manage events with powerful tools.'
          },
          {
            title: 'Meet Our Team',
            description: 'Our dedicated team of event enthusiasts and technology experts are here to ensure that your event experience is seamless and enjoyable.'
          }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + index * 0.2 }}
            >
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1">
                    {item.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AboutUs;
