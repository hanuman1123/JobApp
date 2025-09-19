import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import connectionRoutes from "./routes/connectionsRouter.js";
import profileRoutes from "./routes/profileRoutes.js"
import cors from "cors"
import adminRoutes from "./routes/adminRoutes.js"


const app = express()
dotenv.config()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/connections",connectionRoutes);
app.use("/api/applications",businessRoutes);
app.use("/api/profile",profileRoutes)
app.use("/api/admin",adminRoutes);


app.get("/",(req,res) => {
    res.send("connectIn API is running ...")
})


const port = process.env.PORT || 5000

app.listen(port,()=> {
    console.log("server was running in the port 5000");
    connectDB()
})