import React from 'react';
import { Grid, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

const cities = [
  'Cairo', 'Alexandria', 'Giza', 'Suez', 'Luxor', 'Mansoura', 'Ismailia', 'Sharm El-Sheikh', 'Hurghada', 'Aswan',
  'Port Said', 'Damietta', 'El Mahalla El Kubra', 'Zagazig', 'Tanta', 'Asyut', 'Faiyum', 'Qena', 'Sohag'
];

function AddressForm({ onUpdate, formData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onUpdate(name, value);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); 
    onUpdate('phoneNumber', value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Street Address"
          name="street"
          value={formData.street || ''}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required variant="outlined">
          <InputLabel>City</InputLabel>
          <Select
            label="City"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            }
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          label="Postal Code"
          name="zip"
          value={formData.zip || ''}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          onChange={handlePhoneChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default AddressForm;
