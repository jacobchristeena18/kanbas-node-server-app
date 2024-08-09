import Lab5 from "./Lab5/index.js";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./routes/userRoutes.js";

import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/route.js";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
if(!CONNECTION_STRING){
    exit(0);
}

mongoose.connect(CONNECTION_STRING).then(()=>console.log("Mongo DB has been connected")).catch((err)=>console.log("Error occured ",err));
const app = express();
app.use(cors()); 
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app); 
UserRoutes(app);

app.listen(process.env.PORT || 4000);
