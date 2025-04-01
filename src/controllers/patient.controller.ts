import { Request, Response } from "express";
import * as patientService from "../services/patient.service";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants";
import {
  getScheduleByDoctorAndClinic,
  updateSchedule,
} from "../services/schedule.service";
import { cleanScheduleSlotDates } from "./schedule.controller";

export const createPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.status(201).json(patient);
  } catch (error) {
    console.error(ERROR_MESSAGES.PATIENT_NOT_CREATED, error);
    res.status(400).json({ message: ERROR_MESSAGES.PATIENT_NOT_CREATED });
  }
};

export const getPatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patients = await patientService.getPatients();
    res.json(patients);
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_GETTING_PATIENT, error);
    res.status(500).json({ message: ERROR_MESSAGES.ERROR_GETTING_PATIENT });
  }
};

export const getPatientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await patientService.getPatientById(id);

    if (!patient) {
      res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
    }

    res.json(patient);
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    res.status(500).json({ message: "Error al obtener paciente" });
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await patientService.updatePatient(id, req.body);

    if (!patient) {
      res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
    }

    res.json(patient);
  } catch (error) {
    console.error(ERROR_MESSAGES.PATIENT_NOT_UPDATED, error);
    res.status(500).json({ message: ERROR_MESSAGES.PATIENT_NOT_UPDATED });
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await patientService.deletePatient(id);

    if (!patient) {
      res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
    }

    res.json({ message: SUCCESS_MESSAGES.DELETED_SUCCESS });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_DELETING_PATIENT, error);
    res.status(500).json({ message: ERROR_MESSAGES.ERROR_DELETING_PATIENT });
  }
};

export const addMedicalHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { doctorId, clinicId, dateTime, _id } = req.body;
    const newMedicalHistory = req.body;

    const patient = await patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
    }

    const newConsultationDate = new Date(dateTime).toISOString();
    const isDuplicate = patient.medicalHistory?.some(
      ({ medicalConsultation }) =>
        medicalConsultation.some(
          ({ dateTime }) =>
            new Date(dateTime).toISOString() === newConsultationDate
        )
    );

    if (isDuplicate) {
      return res.status(400).json({
        message: ERROR_MESSAGES.ALREADY_MEDICAL_APPOINTMENT,
      });
    }

    const updatedPatient = await patientService.updatePatient(id, {
      $push: { medicalHistory: newMedicalHistory },
    });

    if (!updatedPatient) {
      return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND_PATIENT });
    }

    const schedule = await getScheduleByDoctorAndClinic(doctorId, clinicId);
    if (schedule) {
      schedule.slotdates = await cleanScheduleSlotDates(_id, dateTime);
      await updateSchedule(schedule.id, { slotdates: schedule.slotdates });
    }

    return res.status(200).json(updatedPatient);
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_ADDING_MEDICAL_HISTORY, error);
    return res.status(500).json({
      message: ERROR_MESSAGES.NOT_UPDATE_PATIENT_CALENDAR,
    });
  }
};
