import mongoose from 'mongoose';
import Booking from '../models/Bookings.js';  // Assuming correct file name
import Event from '../models/event.js'; 
import User from '../models/User.js';
import jwt from 'jsonwebtoken';



export const newBooking = async (req, res) => {
    const { authorization } = req.headers;
    const { eventId, eventDate } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Authorization required." });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid event or user ID." });
        }

        const existingBooking = await Booking.findOne({ event: eventId, user: userId });
        if (existingBooking) {
            return res.status(409).json({ message: "Booking already exists for this event." });
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const event = await Event.findById(eventId).session(session);
            const user = await User.findById(userId).session(session);

            if (!event || !user) {
                await session.abortTransaction();
                return res.status(404).json({ message: "Event or user not found." });
            }

            const booking = new Booking({ event: eventId, date: new Date(eventDate), user: userId });
            await booking.save({ session });

            event.bookings = event.bookings || [];
            event.bookings.push(booking._id);
            await event.save({ session });

            user.bookings = user.bookings || [];
            user.bookings.push(booking._id);
            await user.save({ session });

            await session.commitTransaction();
            res.status(201).json({ message: "Booking created successfully.", bookingId: booking._id.toString() });
        } catch (error) {
            await session.abortTransaction();
            console.error("Error during transaction:", error);
            res.status(500).json({ message: "Unable to create booking.", error: error.message });
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Invalid or expired token.", error: error.message });
    }
};
export const getBookingById = async (req, res) => {
    const id = req.params.id;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.status(200).json({ booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unexpected Error", error: err.message });
    }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    let session;

    try {
        session = await mongoose.startSession();
        await session.startTransaction();

        const booking = await Booking.findById(id).populate('user event').session(session);
        if (!booking) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Booking not found." });
        }

        if (booking.user && Array.isArray(booking.user.bookings)) {
            booking.user.bookings.pull(id);
            await booking.user.save({ session });
        }
        if (booking.event && Array.isArray(booking.event.bookings)) {
            booking.event.bookings.pull(id);
            await booking.event.save({ session });
        }

        await Booking.findByIdAndDelete(id).session(session);
        await session.commitTransaction();

        res.status(200).json({ message: "Booking deleted successfully." });
    } catch (err) {
        console.error(err);
        if (session) await session.abortTransaction();
        res.status(500).json({ message: "Unexpected Error", error: err.message });
    } finally {
        if (session) session.endSession();
    }
};
 
export const getBookingsOfUser = async (req, res) => {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid or missing User ID." });
    }

    try {
        const bookings = await Booking.find({ user: userId }).populate('event');

        res.status(200).json({ bookings: bookings });
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: "Unexpected error occurred while fetching bookings." });
    }
};
// Function to cancel a booking
export const cancelBooking = async (req, res) => {
    const { id } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const booking = await Booking.findById(id).session(session);
        if (!booking) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Booking not found." });
        }

        await Booking.findByIdAndDelete(id, { session: session });
        await session.commitTransaction();

        res.status(200).json({ message: "Booking deleted successfully." });
    } catch (err) {
        console.error("Error deleting booking:", err);
        await session.abortTransaction();
        res.status(500).json({ message: "Unable to delete booking.", error: err.message });
    } finally {
        session.endSession();
    }
};


export const requestRefund = async (req, res) => {
    const { id } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const booking = await Booking.findById(id).session(session);
        if (!booking) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Booking not found." });
        }

        booking.status = 'refund requested';  // Update the status to reflect a refund request
        await booking.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Refund requested successfully." });
    } catch (err) {
        console.error("Error requesting refund:", err);
        await session.abortTransaction();
        res.status(500).json({ message: "Unable to request a refund.", error: err.message });
    } finally {
        session.endSession();
    }
};
