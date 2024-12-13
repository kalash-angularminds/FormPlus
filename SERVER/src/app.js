import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


//routes import
import formRouter from "./routes/form.routes.js"


//routes declaration
app.use("/api/v1/form", formRouter);


export {app}