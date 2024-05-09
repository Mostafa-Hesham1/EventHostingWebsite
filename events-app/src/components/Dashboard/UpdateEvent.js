import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

import {SERVER_URL} from "../../constants"


import { useParams } from 'react-router-dom';



const UpdateEventForm = () => {    const { eventId } = useParams();

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

    useEffect(() => {
        console.log("Event ID:", eventId); 
        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(`${SERVER_URL}/event/${eventId}`);
                setFormData(data.event);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
    
        fetchEvent();
    }, [eventId]);
    

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

    const handleImageChange = (e) => {
        setFormData({ ...formData, posterUrl: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'pricing') {
                Object.entries(value).forEach(([priceKey, priceValue]) => {
                    formDataToSend.append(`pricing[${priceKey}]`, priceValue);
                });
            } else if (key === 'posterUrl' && value) {
                formDataToSend.append(key, value, value.name);
            } else {
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await axios.put(`${SERVER_URL}/event/${eventId}`, formDataToSend);
            console.log('Event updated:', response.data);
            alert("Event updated successfully!");
        } catch (error) {
            console.error('Error updating event:', error.response.data);
            alert("Error updating event: " + error.response.data.message);
        }
    };

    return (
        <Container maxWidth="sm" style={{ color: '#ffffff', backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
                Update Event
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
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{ style: { color: '#ffffff', borderColor: '#ffffff' } }}
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
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{ style: { color: '#ffffff' } }}
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
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{ style: { color: '#ffffff' } }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="actors"
                    label="Actors"
                    value={formData.actors}
                    onChange={handleChange}
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{ style: { color: '#ffffff' } }}
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
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{ style: { color: '#ffffff' } }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="location"
                    label="Location"
                    value={formData.location}
                    onChange={handleChange}
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{
style: { color: '#ffffff' } }}
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
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                    InputProps={{ style: { color: '#ffffff' } }}
                />
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 10 }}
                >
                    Upload New Image
                    <input
                        type="file"
                        hidden
                        name="posterUrl"
                        onChange={handleImageChange}
                    />
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20 }}
                >
                    Update Event
                </Button>
            </form>
        </Container>
    );
}

export default UpdateEventForm;
