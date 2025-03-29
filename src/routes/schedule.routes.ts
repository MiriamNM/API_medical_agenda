import { Router } from "express";
import {
    getSchedules,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
} from "../controllers/schedule.controller";

const router = Router();

router.get("/", getSchedules);
router.get("/:id", getSchedule);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;