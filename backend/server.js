import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import connectionRoutes from "./routes/connectionsRouter.js";


const app = express()
dotenv.config()

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/connections",connectionRoutes);
app.use("/api/applications",businessRoutes);


app.get("/",(req,res) => {
    res.send("connectIn API is running ...")
})


const port = process.env.PORT || 5000

app.listen(port,()=> {
    console.log("server was running in the port 5000");
    connectDB()
})