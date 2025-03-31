import { Request, Response } from "express";
import * as patientService from "../services/patient.service";
import { ERROR_MESSAGES } from "../utils/constants";
import {
  getScheduleByDoctorAndClinic,
  updateSchedule,
} from "../services/schedule.service";

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.PATIENT_NOT_CREATED });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  const patients = await patientService.getPatients();
  res.json(patients);
};

export const getPatientById = async (req: Request, res: Response) => {
  const patient = await patientService.getPatientById(req.params.id);
  if (!patient)
    return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
  res.json(patient);
};

export const updatePatient = async (req: Request, res: Response) => {
  const patient = await patientService.updatePatient(req.params.id, req.body);
  if (!patient)
    return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
  res.json(patient);
};

export const deletePatient = async (req: Request, res: Response) => {
  const patient = await patientService.deletePatient(req.params.id);
  if (!patient)
    return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
  res.json({ message: "Paciente eliminado" });
};

export const addMedicalHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newMedicalHistory = req.body;

    const patient = await patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const existingHistory = patient.medicalHistory || [];
    const isDuplicate = existingHistory.some((historyItem) => {
      return (
        historyItem.medicalConsultation &&
        new Date(historyItem.medicalConsultation.dateTime).toISOString() ===
          new Date(newMedicalHistory.medicalConsultation.dateTime).toISOString()
      );
    });

    if (isDuplicate) {
      return res.status(400).json({
        message: "Ya existe una consulta médica en esta fecha y hora.",
      });
    }

    patient.medicalHistory.push(newMedicalHistory);
    const updatedPatient = await patientService.updatePatient(id, patient);

    if (!updatedPatient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const { doctorId, clinicId, dateTime } = req.body;

    const schedule = await getScheduleByDoctorAndClinic(doctorId, clinicId);

    if (schedule) {
      let updatedSchedule = false;

      for (const slotDate of schedule.slotdates) {
        if (
          new Date(slotDate.date).toISOString() ===
          new Date(dateTime).toISOString()
        ) {
          if (slotDate.slots) {
            const slotExists = slotDate.slots.some(
              (slot) =>
                new Date(slot.dateTime).toISOString() ===
                new Date(dateTime).toISOString()
            );

            if (!slotExists) {
              slotDate.slots.push({
                sourceEvent: newMedicalHistory.medicalConsultation._id,
                dateTime: new Date(dateTime),
              });

              updatedSchedule = true;
            } else {
              console.log("El slot ya existe para esta fecha y hora");
            }
          }
        }
      }

      if (updatedSchedule) {
        await updateSchedule(schedule.id, {
          slotdates: schedule.slotdates,
        });
      }
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error(
      "Error al agregar la historia médica y actualizar el calendario:",
      error
    );
    res
      .status(400)
      .json({ message: "No se pudo actualizar el paciente y el calendario" });
  }
};
