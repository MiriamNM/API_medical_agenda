import { ISchedule } from "../models/schedule.model";
import scheduleModel from "../models/schedule.model";

export const getAllSchedules = async () => {
  return await scheduleModel.find();
};

export const getScheduleById = async (id: string) => {
  return await scheduleModel.findById(id);
};

export const createSchedule = async (data: ISchedule) => {
  return await scheduleModel.create(data);
};

export const updateSchedule = async (id: string, data: Partial<ISchedule>) => {
  return await scheduleModel.findByIdAndUpdate(id, data, { new: true });
};

export const cleanSlotDates = async (id: string) => {
  const schedule = await scheduleModel.findById(id);

  if (!schedule) {
    return null;
  }

  schedule.slotdates = schedule.slotdates.map((slotDate: any) => ({
    date: slotDate.date.split("T")[0],
  }));

  return await schedule.save();
};

export const deleteSchedule = async (id: string) => {
  return await scheduleModel.findByIdAndDelete(id);
};

export const getScheduleByDoctorAndClinic = async (
  idDoctor: string,
  idClinic: string
) => {
  return await scheduleModel.findOne({ idDoctor, idClinic });
};
