import { Router } from "express";
import {
  availabilitySchedule,
  createSchedule,
  deleteSchedule,
  getSchedule,
  getSchedules,
  updateSchedule,
} from "../controllers/schedule.controller";

const scheduleRouter = Router();
const doctorRouter = Router();

scheduleRouter.get("/", getSchedules);
scheduleRouter.get("/:id", getSchedule);
scheduleRouter.post("/", createSchedule);
scheduleRouter.put("/:id", updateSchedule);
scheduleRouter.delete("/:id", deleteSchedule);

doctorRouter.get("/availability", availabilitySchedule);

export { scheduleRouter, doctorRouter };
