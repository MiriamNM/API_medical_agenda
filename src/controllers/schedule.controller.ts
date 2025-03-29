import { Request, Response } from "express";
import * as scheduleService from "../services/schedule.service";

export const getSchedules = async (req: Request, res: Response): Promise<void> => {
    const schedules = await scheduleService.getAllSchedules();
    res.json(schedules);
};

export const getSchedule = async (req: Request, res: Response): Promise<void> => {
    const schedule = await scheduleService.getScheduleById(req.params.id);
    if (!schedule) {
        res.status(404).json({ message: "No encontrado" });
        return;
    }
    res.json(schedule);
};

export const createSchedule = async (req: Request, res: Response): Promise<void> => {
    const newSchedule = await scheduleService.createSchedule(req.body);
    res.status(201).json(newSchedule);
};

export const updateSchedule = async (req: Request, res: Response): Promise<void> => {
    const updatedSchedule = await scheduleService.updateSchedule(req.params.id, req.body);
    if (!updatedSchedule) {
        res.status(404).json({ message: "No encontrado" });
        return;
    }
    res.json(updatedSchedule);
};

export const deleteSchedule = async (req: Request, res: Response): Promise<void> => {
    const deletedSchedule = await scheduleService.deleteSchedule(req.params.id);
    if (!deletedSchedule) {
        res.status(404).json({ message: "No encontrado" });
        return;
    }
    res.json({ message: "Eliminado correctamente" });
};