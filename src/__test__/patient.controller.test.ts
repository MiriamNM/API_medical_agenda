import request from "supertest";
import app from "../app";
import * as patientService from "../services/patient.service";

jest.mock("../services/patient.service");

describe("Patient Controller", () => {
  const mockPatient = {
    _id: "123",
    name: "John Doe",
    age: 30,
    medicalHistory: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /patients should create a patient", async () => {
    (patientService.createPatient as jest.Mock).mockResolvedValue(mockPatient);

    const response = await request(app)
      .post("/patients")
      .send({ name: "John Doe", age: 30 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPatient);
    expect(patientService.createPatient).toHaveBeenCalledWith({
      name: "John Doe",
      age: 30,
    });
  });

  test("GET /patients should return a list of patients", async () => {
    (patientService.getPatients as jest.Mock).mockResolvedValue([mockPatient]);

    const response = await request(app).get("/patients");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockPatient]);
    expect(patientService.getPatients).toHaveBeenCalled();
  });
});
