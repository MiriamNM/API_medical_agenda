import { Router } from "express";
import {
  addMedicalHistory,
  getPatientById,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller";

const patientRouter = Router();

patientRouter.post("/", (req, res) => createPatient(req, res));
patientRouter.get("/", (req, res) => getPatients(req, res));
patientRouter.get("/:id", (req, res) => getPatientById(req, res));
patientRouter.put("/:id", (req, res) => updatePatient(req, res));
patientRouter.delete("/:id", (req, res) => deletePatient(req, res));
patientRouter.post("/:id/medicalHistory", async (req, res) => {
  await addMedicalHistory(req, res);
});


export default patientRouter;
