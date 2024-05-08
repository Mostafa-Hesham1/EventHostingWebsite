import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, CssBaseline, Grid,
  Step, StepLabel, Stepper, Typography, ThemeProvider, createTheme,
  IconButton
} from '@mui/material';
import { ChevronLeftRounded, ChevronRightRounded, Home as HomeIcon } from '@mui/icons-material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/event/${id}`);
        if (response.data.event) {
          setEventDetails(response.data.event);
        } else {
          throw new Error('Event details incomplete');
        }
      } catch (error) {
        console.error('Failed to fetch event details:', error);
        setEventDetails(null);
      }
    }

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  //console.log("Event Details at Checkout:", eventDetails);

  const theme = createTheme();

  const handleNext = async () => {
    if (isFormValid()) {
      if (activeStep === steps.length - 1) {
        await handleBooking();  
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpdate = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHome = () => {
    navigate('/events');  
  };

  const isFormValid = () => {
    switch (activeStep) {
      case 0:
        return formData.street && formData.city && formData.zip;
      case 1:
        return formData.cardNumber && formData.expiryDate && formData.cvv &&
          formData.cardNumber.replace(/\s/g, '').length === 16 &&
          formData.cvv.length === 3;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert('No token found! Please log in again.');
        return;
    }

    const requestBody = {
        eventId: eventDetails._id,
        eventDate: eventDetails.eventDate
    };

    try {
        const response = await axios.post('http://localhost:5000/booking/', requestBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.booking && response.data.booking._id) {
            alert('Booking successful! Booking ID: ' + response.data.booking._id);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);  // Optionally move to a confirmation step
        } else {
            throw new Error(response.data.message || 'Booking was not successfully created.');
        }
    } catch (error) {
        console.error('Failed to book:', error);
        alert(`Booking failed: ${error.response?.data.message || "Unauthorized access."}`);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm onUpdate={handleUpdate} formData={formData} />;
      case 1:
        return <PaymentForm onUpdate={handleUpdate} formData={formData} />;
      case 2:
        return <ReviewOrder formData={formData} eventDetails={eventDetails} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton onClick={handleHome} sx={{ position: 'absolute', top: 16, left: 16 }}>
        <HomeIcon />
      </IconButton>
      <Grid container spacing={2} sx={{ height: '100vh', padding: 3 }}>
        <Grid item xs={12} md={4} sx={{ borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ marginY: 2 }}>Checkout</Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ padding: 3 }}>
          <Card sx={{ marginBottom: 4 }}>
            <CardContent>
              {getStepContent(activeStep)}
            </CardContent>
          </Card>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              onClick={handleBack}
              startIcon={<ChevronLeftRounded />}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep !== steps.length - 1 ? (
              <Button
                variant="contained"
                endIcon={<ChevronRightRounded />}
                onClick={handleNext}
                disabled={!isFormValid()}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isFormValid()}
              >
                Place order
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}