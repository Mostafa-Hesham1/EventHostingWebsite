import React from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, styled } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCard = styled(Card)({
  maxWidth: 450,
  margin: '0 auto',
  backgroundColor: 'rgba(50, 50, 70, 1)',
  color: '#fff',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)', 
  '&:hover': {
    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.5)',
  },
  transition: 'box-shadow 0.3s ease-in-out',
});

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Form submitted successfully!");
  };

  const backgroundStyle = {
    backgroundColor: 'rgb(16, 20, 25)', 
    color: 'white',
    minHeight: '100vh', 
    padding: '20px' 
  };

  return (
    <div style={backgroundStyle}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Typography gutterBottom variant="h3" align="center" color="primary" style={{ marginBottom: '40px' }}>
        Contact Us
      </Typography>
      <Grid container justifyContent="center">
        <StyledCard>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              We'd love to hear from you!
            </Typography>
            <Typography variant="body2" component="p" color="white" style={{ marginBottom: '20px' }}>
              Fill out the form below and our team will get back to you within 24 hours.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    placeholder="Enter first name" 
                    label="First Name" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    InputLabelProps={{ style: { color: '#fff' }}} 
                    InputProps={{ style: { color: '#fff' }}}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    placeholder="Enter last name" 
                    label="Last Name" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    InputLabelProps={{ style: { color: '#fff' }}}
                    InputProps={{ style: { color: '#fff' }}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    type="email" 
                    placeholder="Enter email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    InputLabelProps={{ style: { color: '#fff' }}}
                    InputProps={{ style: { color: '#fff' }}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    type="number" 
                    placeholder="Enter phone number" 
                    label="Phone" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    InputLabelProps={{ style: { color: '#fff' }}}
                    InputProps={{ style: { color: '#fff' }}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    label="Message" 
                    multiline 
                    rows={4} 
                    placeholder="Type your message here" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    InputLabelProps={{ style: { color: '#fff' }}}
                    InputProps={{ style: { color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.09)' }}} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </StyledCard>
      </Grid>
    </div>
  );
}

export default Contact;
