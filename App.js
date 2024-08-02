import Lab5 from "./Lab5/index.js";
import express from "express";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/route.js";
const app = express();
app.use(cors()); 
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app); 

app.listen(process.env.PORT || 4000);
