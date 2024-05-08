import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
  },
  backgroundColor: 'rgba(50, 50, 70, 1)',
  color: '#fff',
  borderRadius: '15px',
  padding: '20px',
  height: '100%', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between' 
});

const Pricing = () => {
  const pricingOptions = [
    {
      title: 'Basic',
      description: 'Host your event with a basic setup. Ideal for small gatherings.',
      features: ['10% service fee on ticket sales', 'Basic analytics'],
      price: '$100/event'
    },
    {
      title: 'Pro',
      description: 'Includes a control dashboard for tickets and user management.',
      features: ['5% service fee on ticket sales', 'Advanced analytics', 'Ticket and user dashboard'],
      price: '$200/event'
    },
    {
      title: 'Premium',
      description: 'All-in-one package with full support and marketing strategies.',
      features: ['2% service fee on ticket sales', '24/7 support team', 'Marketing team assistance', 'Comprehensive dashboard'],
      price: '$500/event'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: 'rgb(20, 20, 30)' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Pricing Plans
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {pricingOptions.map((option, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <StyledCard raised>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {option.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {option.description}
                </Typography>
                <ul>
                  {option.features.map((feature, idx) => (
                    <li key={idx}>
                      <Typography variant="body1">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <Typography variant="h6" sx={{ my: 2 }}>
                {option.price}
              </Typography>
              <Button variant="contained" color="secondary" fullWidth>
                Choose Plan
              </Button>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Pricing;
