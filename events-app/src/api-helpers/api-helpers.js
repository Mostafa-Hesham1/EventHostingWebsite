import axios from 'axios';
import { SERVER_URL } from '../contants';
export const getAllevents = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/event`);
        if (res.status === 200) {
            return { success: true, events: res.data.events || [] }; // Adjust according to actual response structure
        } else {
            return { success: false, message: "Failed to fetch events. Status code: " + res.status };
        }
    } catch (err) {
        console.error("Error fetching events:", err);
        return { success: false, message: 'Network error, unable to fetch events.' };
    }
};


export const signUpUser = async (userData) => {
    try {
        const response = await axios.post(`${SERVER_URL}/users/signup`, userData);
        if (response.status === 201 && response.data.user) {
            return { success: true, user: response.data.user };
        } else {
            return { success: false, message: response.data.errors.join(", ") };
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return { success: false, message: error.response.data.errors.join(", ") };
        } else {
            return { success: false, message: 'Network error, unable to sign up.' };
        }
    }
};


export const signInUser = async (credentials) => {
    try {
        const response = await axios.post(`${SERVER_URL}/users/login`, credentials);
        console.log("Login Response Data:", response.data);

        if (response.status === 200) {
            return { 
                success: true, 
                token: response.data.token,
                userId: response.data.userId 
            };
        } else {
            return { success: false, message: response.data.message || "Login failed. Check your credentials." };
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message || 'Server error during login.' };
        } else {
            return { success: false, message: 'Network error, unable to log in.' };
        }
    }
};


export const signInAdmin = async (credentials) => {
    try {
        const response = await axios.post(`${SERVER_URL}/admin/login`, credentials);
        if (response.status === 200) {
            const { token } = response.data; 
            return { success: true, token }; 
        } else {
            return { success: false, message: response.data.message || "Login failed. Check your credentials." };
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message || 'Server error during login.' };
        } else {
            return { success: false, message: 'Network error, unable to log in.' };
        }
    }
};
export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/event/${eventId}`);
        if (response.status === 200) {
            return { success: true, message: "Event deleted successfully." };
        } else {
            return { success: false, message: "Failed to delete event. Status code: " + response.status };
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, message: "Network error, unable to delete event." };
    }
};