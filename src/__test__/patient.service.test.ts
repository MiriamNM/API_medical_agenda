import { Patient } from "../models/patient.models";
import * as patientService from "../services/patient.service";

jest.mock("../models/patient.models");

describe("Patient Service", () => {
  const mockPatient = {
    _id: "123456789",
    name: "John Doe",
    age: 30,
    medicalHistory: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe crear un paciente correctamente", async () => {
    (Patient.create as jest.Mock).mockResolvedValue(mockPatient);

    const result = await patientService.createPatient(mockPatient);

    expect(Patient.create).toHaveBeenCalledWith(mockPatient);
    expect(result).toEqual(mockPatient);
  });

  test("Debe obtener la lista de pacientes", async () => {
    (Patient.find as jest.Mock).mockResolvedValue([mockPatient]);

    const result = await patientService.getPatients();

    expect(Patient.find).toHaveBeenCalled();
    expect(result).toEqual([mockPatient]);
  });

  test("Debe obtener un paciente por ID", async () => {
    (Patient.findById as jest.Mock).mockResolvedValue(mockPatient);

    const result = await patientService.getPatientById("123456789");

    expect(Patient.findById).toHaveBeenCalledWith("123456789");
    expect(result).toEqual(mockPatient);
  });

  test("Debe actualizar un paciente correctamente", async () => {
    const updatedPatient = { ...mockPatient, age: 31 };
    (Patient.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPatient);

    const result = await patientService.updatePatient("123456789", { age: 31 });

    expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
      "123456789",
      { age: 31 },
      { new: true }
    );
    expect(result).toEqual(updatedPatient);
  });

  test("Debe eliminar un paciente correctamente", async () => {
    (Patient.findByIdAndDelete as jest.Mock).mockResolvedValue(mockPatient);

    const result = await patientService.deletePatient("123456789");

    expect(Patient.findByIdAndDelete).toHaveBeenCalledWith("123456789");
    expect(result).toEqual(mockPatient);
  });

  test("Debe agregar historial médico a un paciente", async () => {
    const medicalHistoryEntry = { diagnosis: "Flu", date: "2024-03-31" };
    const updatedPatient = {
      ...mockPatient,
      medicalHistory: [medicalHistoryEntry],
    };

    (Patient.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPatient);

    const result = await patientService.addMedicalHistory(
      "123456789",
      medicalHistoryEntry
    );

    expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
      "123456789",
      { $push: { medicalHistory: medicalHistoryEntry } },
      { new: true }
    );
    expect(result).toEqual(updatedPatient);
  });
});
