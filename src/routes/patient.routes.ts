import { Router } from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addMedicalHistory,
} from "../controllers/patient.controller";

const patientRouter = Router();

patientRouter.get("/:id", getPatientById);
patientRouter.get("/", getPatients);
patientRouter.post("/", createPatient);
patientRouter.put("/:id", updatePatient);
patientRouter.delete("/:id", deletePatient);
patientRouter.post("/:id/medicalHistory", addMedicalHistory);

export default patientRouter;
