import React from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LockIcon from '@mui/icons-material/Lock';

function PaymentForm({ onUpdate, formData }) {
  const handleCardChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); 
    if (value.length <= 16) { 
      value = value.replace(/(\d{4})/g, '$1 ').trim(); 
      onUpdate("cardNumber", value);
    }
  };

  const handleExpiryChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); 
    if (value.length <= 4) {
      value = value.replace(/(\d{2})/, '$1/'); 
      onUpdate("expiryDate", value);
    }
  };

  const handleCvvChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); 
    if (value.length <= 3) { 
      onUpdate("cvv", value);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber || ''}
          onChange={handleCardChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          label="Expiry Date"
          name="expiryDate"
          placeholder="MM/YY"
          value={formData.expiryDate || ''}
          onChange={handleExpiryChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          label="CVV"
          name="cvv"
          value={formData.cvv || ''}
          onChange={handleCvvChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default PaymentForm;
