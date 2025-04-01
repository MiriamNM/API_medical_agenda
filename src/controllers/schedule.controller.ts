import { Request, Response } from "express";
import * as scheduleService from "../services/schedule.service";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants";
import { SlotDate } from "../models/schedule.model";

export const createSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newSchedule = await scheduleService.createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error(ERROR_MESSAGES.SCHEDULE.ERROR_CREATING_SCHEDULE, error);
    res.status(500).json({ message: ERROR_MESSAGES.GENERIC_ERROR });
  }
};

export const getSchedules = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schedules = await scheduleService.getAllSchedules();
    res.json(schedules);
  } catch (error) {
    console.error(ERROR_MESSAGES.SCHEDULE.ERROR_GETTING_SCHEDULE, error);
    res.status(500).json({ message: ERROR_MESSAGES.GENERIC_ERROR });
  }
};

export const getSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.id);
    if (!schedule) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    res.json(schedule);
  } catch (error) {
    console.error(ERROR_MESSAGES.SCHEDULE.ERROR_GETTING_SCHEDULE, error);
    res.status(500).json({ message: ERROR_MESSAGES.GENERIC_ERROR });
  }
};

export const updateSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedSchedule = await scheduleService.updateSchedule(
      req.params.id,
      req.body
    );
    if (!updatedSchedule) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    res.json(updatedSchedule);
  } catch (error) {
    console.error(ERROR_MESSAGES.SCHEDULE.ERROR_UPDATING_SCHEDULE, error);
    res.status(500).json({ message: ERROR_MESSAGES.GENERIC_ERROR });
  }
};

export const cleanScheduleSlotDates = async (
  scheduleId: string,
  dateTime: string
): Promise<SlotDate[]> => {
  try {
    const schedule = await scheduleService.getScheduleById(scheduleId);
    if (!schedule) throw new Error(ERROR_MESSAGES.NOT_FOUND);

    const normalizedDate = new Date(dateTime);
    normalizedDate.setHours(0, 0, 0, 0);

    let slotDate = schedule.slotdates.find(
      (slot) => new Date(slot.date).getTime() === normalizedDate.getTime()
    );

    if (!slotDate) {
      slotDate = { date: normalizedDate, slots: [] };
      schedule.slotdates.push(slotDate);
    }

    slotDate.slots = (slotDate.slots || []).filter(
      (slot) =>
        new Date(slot.dateTime).toISOString() !== normalizedDate.toISOString()
    );

    return schedule.slotdates;
  } catch (error) {
    console.error(ERROR_MESSAGES.SCHEDULE.ERROR_CLEANING_SLOTS, error);
    throw error;
  }
};

export const deleteSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedSchedule = await scheduleService.deleteSchedule(req.params.id);
    if (!deletedSchedule) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    res.json({ message: SUCCESS_MESSAGES.DELETED_SUCCESS });
  } catch (error) {
    console.error(ERROR_MESSAGES.SCHEDULE.ERROR_DELETED_SCHEDULE, error);
    res.status(500).json({ message: ERROR_MESSAGES.GENERIC_ERROR });
  }
};

export const availabilitySchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schedules = await scheduleService.getAllSchedules();

    const availabilityMap: Record<
      string,
      { idDoctor: string; date: string; slots: string[] }
    > = {};

    schedules.forEach((schedule) => {
      schedule.slotdates.forEach((slotDate) => {
        const date = slotDate.date.toISOString().split("T")[0];
        const idDoctor = schedule.idDoctor;
        if (!idDoctor) return;

        const key = `${idDoctor}-${date}`;
        if (!availabilityMap[key]) {
          availabilityMap[key] = { idDoctor, date, slots: [] };
        }

        if (slotDate.slots?.length) {
          availabilityMap[key].slots.push(
            ...slotDate.slots.map((slot) => slot.dateTime.toISOString())
          );
        }
      });
    });

    const unifiedAvailability = Object.values(availabilityMap)
      .map((entry) => ({ ...entry, slots: entry.slots.sort() }))
      .filter((entry) => entry.slots.length > 0);

    res.json({ availability: unifiedAvailability });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_RETRIEVING_AVAILABILITY, error);
    res.status(500).json({ message: ERROR_MESSAGES.AVAILABILITY_ERROR });
  }
};
