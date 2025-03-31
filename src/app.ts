import "dotenv/config";
import express from "express";
import cors from "cors";
import { scheduleRouter, doctorRouter } from "./routes/schedule.routes";
import { errorHandler } from "./middlewares/errorMiddleware";
import patientRouter from "./routes/patient.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/schedules", scheduleRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);

app.use(errorHandler);

export default app;
