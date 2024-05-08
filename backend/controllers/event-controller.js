import jwt from 'jsonwebtoken';
import Event from '../models/event.js';
import Admin from '../models/Admin.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, 'uploads');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Ensures unique filenames
    }
});

const upload = multer({ storage });

export const addEventWithImage = upload.single('posterUrl');

export const addEvent = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(404).json({ message: "Token Not Found" });
    }
    const token = authHeader.split(' ')[1];

    let adminId;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        adminId = decoded.id;
    } catch (err) {
        return res.status(404).json({ message: "Invalid Token: " + err.message });
    }

    const { title, description, actors, eventDate, eventTime, location, pricing, featured } = req.body;
    const posterUrl = req.file ? req.file.filename : null;

    const newEvent = new Event({
        title,
        description,
        actors,
        eventDate,
        eventTime,
        location,
        pricing,
        posterUrl,
        featured,
        admin: adminId
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save event to the database' });
    }
};



export const getAllEvents=async(req,res,next)=>{
    let events;
    try
    {
        events=await Event.find();
    }catch(err)
    {
        //return console.log(err)
    }

if(!events)
{
    return res.status(500).json({ message: "Request Failed" });

}
return res.status(200).json({events });


};
export const getEventById = async (req, res) => {
    console.log("Fetching event with ID:", req.params.id);
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            //console.log("Event found:", event);
            res.json({event}); 
        } else {
            //console.log("No event found for ID:", req.params.id);
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err) {
        //console.error("Error fetching event:", err);
        res.status(500).json({ message: "Server error occurred while fetching the event." });
    }
};

export const deleteEvent = async (req, res, next) => {
const eventId = req.params.id;

  try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
          return res.status(404).json({ message: "Event not found." });
      }

      return res.status(200).json({ message: "Event deleted successfully.", deletedEvent });
  } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({ message: "Failed to delete event." });
  }
};
export const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, description, actors, eventDate, eventTime, location, pricing, featured, posterUrl } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $set: { title, description, actors, eventDate, eventTime, location, pricing, featured, posterUrl } },
            { new: true } 
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error); // Log the error details for debugging
        res.status(500).json({ message: "Failed to update event.", error: error.message }); // Include error message in response
    }
};
