import Schedule, { ISchedule } from "../models/schedule.model";

export const getAllSchedules = async () => {
  return await Schedule.find();
};

export const getScheduleById = async (id: string) => {
  return await Schedule.findById(id);
};

export const createSchedule = async (data: ISchedule) => {
  return await Schedule.create(data);
};

export const updateSchedule = async (id: string, data: Partial<ISchedule>) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSchedule = async (id: string) => {
  return await Schedule.findByIdAndDelete(id);
};

export const getScheduleByDoctorAndClinic = async (
  idDoctor: string,
  idClinic: string
) => {
  return await Schedule.findOne({ idDoctor, idClinic });
};
