import express from 'express';
import { deleteBooking, getBookingById, newBooking, getBookingsOfUser, cancelBooking, requestRefund } from '../controllers/booking-controller.js';

const bookingRouter = express.Router();

bookingRouter.get('/:id', getBookingById);
bookingRouter.post('/', newBooking);
bookingRouter.get('/user/:userId', getBookingsOfUser);
bookingRouter.delete('/:id', deleteBooking);
bookingRouter.put('/:id/cancel', cancelBooking);
bookingRouter.put('/:id/refund', requestRefund);

export default bookingRouter;
