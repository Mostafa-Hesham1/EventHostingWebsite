import express from 'express';
import { addEventWithImage, addEvent, getAllEvents, getEventById,deleteEvent,updateEvent} from '../controllers/event-controller.js';

const eventRouter = express.Router();

eventRouter.post("/", addEventWithImage, addEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.delete("/:id", deleteEvent); 
eventRouter.put('/:id', addEventWithImage, updateEvent);


export default eventRouter;
