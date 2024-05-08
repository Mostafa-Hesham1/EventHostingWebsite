import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    actors: [{ type: String, required: true }],
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true }, 
    location: { type: String, required: true },  
    pricing: {
        standard: { type: Number, required: true }
        
    },  
    posterUrl: { type: String, required: true },
    featured: { type: Boolean },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
});

export default mongoose.model("Event", eventSchema);
