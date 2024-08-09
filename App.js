import Lab5 from "./Lab5/index.js";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./routes/userRoutes.js";
import session from "express-session";

import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/route.js";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
if (!CONNECTION_STRING) {
    exit(0);
}

mongoose.connect(CONNECTION_STRING).then(() => console.log("Mongo DB has been connected")).catch((err) => console.log("Error occured ", err));
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);
