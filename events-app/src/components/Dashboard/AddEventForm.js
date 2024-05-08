import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Typography, Container } from '@mui/material';

function AddEventForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        pricing: { standard: '' },
        featured: false,
        actors: '',
        posterUrl: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "standard" || name === "vip") {
            setFormData(prev => ({
                ...prev, 
                pricing: { ...prev.pricing, [name]: value }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, posterUrl: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'pricing') {
                Object.entries(value).forEach(([priceKey, priceValue]) => {
                    data.append(`pricing[${priceKey}]`, priceValue);
                });
            } else if (key === 'posterUrl' && value) {
                data.append(key, value, value.name);
            } else {
                data.append(key, value);
            }
        });
    
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };
    
        try {
            const response = await axios.post('http://localhost:5000/event', data, config);
            console.log('Event added:', response.data);
            alert("Event added successfully!");
        } catch (error) {
            console.error('Error adding event:', error.response.data);
            alert("Error adding event: " + error.response.data.message);
        }
    };
    
    
    return (
        <Container maxWidth="sm" style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', color: '#fff' }}>
            <Typography variant="h6" color="primary" gutterBottom>
                Add New Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    color="primary"
                    InputLabelProps={{
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    color="primary"
                    InputLabelProps={{
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
                <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    margin="normal"
                    name="eventDate"
                    label="Event Date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="actors"
                    label="Actors"
                    value={formData.actors}
                    onChange={handleChange}
                    color="primary"
                    InputLabelProps={{
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="eventTime"
                    label="Event Time"
                    type="time"
                    value={formData.eventTime}
                    onChange={handleChange}
                    color="primary"
                    InputLabelProps={{
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="location"
                    label="Location"
                    value={formData.location}
                    onChange={handleChange}
                    color="primary"
                    InputLabelProps={{
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="standard"
                    label="Standard Ticket Price"
                    type="number"
                    value={formData.pricing.standard}
                    onChange={handleChange}
                    InputLabelProps={{
                        style: { color: '#fff' }
                    }}
                    InputProps={{
                        style: { color: '#fff' }
                    }}
                />
              
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                name="featured"
                                color="primary"
                            />
                        }
                        label="Featured Event"
                        style={{ color: '#fff' }}
                    />
                </FormGroup>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 10 }}
                >
                    Upload Poster
                    <input
                        type="file"
                        hidden
                        name="posterUrl"
                        onChange={handleFileChange}
                    />
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: 20 }}
                >
                    Add Event
                </Button>
            </form>
        </Container>
    );
}

export default AddEventForm;
