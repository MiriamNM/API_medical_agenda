import { Request, Response } from "express";
import * as scheduleService from "../services/schedule.service";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants";

export const createSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newSchedule = await scheduleService.createSchedule(req.body);
  res.status(201).json(newSchedule);
};

export const getSchedules = async (
  req: Request,
  res: Response
): Promise<void> => {
  const schedules = await scheduleService.getAllSchedules();
  res.json(schedules);
};

export const getSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const schedule = await scheduleService.getScheduleById(req.params.id);
  if (!schedule) {
    res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
    return;
  }
  res.json(schedule);
};

export const updateSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedSchedule = await scheduleService.updateSchedule(
    req.params.id,
    req.body
  );
  if (!updatedSchedule) {
    res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
    return;
  }
  res.json(updatedSchedule);
};

export const deleteSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deletedSchedule = await scheduleService.deleteSchedule(req.params.id);
  if (!deletedSchedule) {
    res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
    return;
  }
  res.json({ message: SUCCESS_MESSAGES.DELETED_SUCCESS });
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

        if (!idDoctor) {
          console.error("idDoctor is undefined for schedule:", schedule);
          return;
        }

        const key = `${idDoctor}-${date}`;

        if (!availabilityMap[key]) {
          availabilityMap[key] = {
            idDoctor,
            date,
            slots: [],
          };
        }

        if (slotDate.slots?.length) {
          availabilityMap[key].slots.push(
            ...slotDate.slots.map((slot) => slot.dateTime.toISOString())
          );
        }
      });
    });

    const unifiedAvailability = Object.values(availabilityMap)
      .map((entry) => ({
        ...entry,
        slots: entry.slots.sort(),
      }))
      .filter((entry) => entry.slots.length > 0);
    res.json({ availability: unifiedAvailability });
  } catch (error) {
    console.error(ERROR_MESSAGES.AVAILABILITY_ERROR, error);
    res.status(500).json({ message: ERROR_MESSAGES.AVAILABILITY_ERROR });
  }
};
