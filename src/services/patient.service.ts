import { Patient } from "../models/patient.models";

export const createPatient = async (data: any) => {
  return await Patient.create(data);
};

export const getPatients = async () => {
  return await Patient.find();
};

export const getPatientById = async (id: string) => {
  return await Patient.findById(id);
};

export const updatePatient = async (id: string, data: any) => {
  return await Patient.findByIdAndUpdate(id, data, { new: true });
};

export const deletePatient = async (id: string) => {
  return await Patient.findByIdAndDelete(id);
};

export const addMedicalHistory = async (id: string, newMedicalHistory: any) => {
  return await Patient.findByIdAndUpdate(
    id,
    { $push: { medicalHistory: newMedicalHistory } },
    { new: true }
  );
};
