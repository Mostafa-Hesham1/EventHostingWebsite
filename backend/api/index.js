import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";

// Routers
import userRouter from "./../routes/user-routes.js";
import adminRouter from "./../routes/admin-routes.js";
import eventRouter from "./../routes/event-routes.js";
import bookingRouter from "./../routes/booking-routes.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, 'uploads');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Ensuring unique file names
    }
});


const upload = multer({ storage });
app.options('*', cors()) // include before other routes
app.use(cors({
  origin: ['http://localhost:3000',"https://events-app-fe.vercel.app"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE',"OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/event", eventRouter);
app.use("/booking", bookingRouter);


//console.log("Uploads Directory:", uploadsDir);

app.post('/upload', upload.single('file'), async (req, res) => { 
    if (req.file) {
      const filename = req.file.filename; 
      const filePath = path.join(uploadsDir, filename);
  
      const newEvent = new Event({
        posterUrl: filename,
      });
      try {
        await newEvent.save(); 
        res.json({ message: 'File uploaded successfully', path: filePath });
      } catch (error) {
        console.error("Failed to save the event:", error);
        res.status(500).json({ message: 'Failed to save the event.' });
      }
    } else {
      res.status(400).send('No file uploaded.');
    }
  });
  
  app.use(express.static(path.join(__dirname, 'events-app/build')));

mongoose.connect(process.env.MONGODB_URI )
.then(() => app.listen(process.env.PORT || 5000, () => console.log("Connected to Database And server is running on port " + (process.env.PORT || 5000))))
.catch((e) => console.log(e));