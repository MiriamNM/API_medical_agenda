import request from "supertest";
import app from "../app";
import * as scheduleService from "../services/schedule.service";
jest.mock("../services/schedule.service");

jest.mock("../services/schedule.service");

describe("Schedule Controller", () => {
  test("GET /schedules should return a list of schedules", async () => {
    const mockSchedules = [
      { id: "1", idDoctor: "doctor1", slotdates: [] },
      { id: "2", idDoctor: "doctor2", slotdates: [] },
    ];

    (scheduleService.getAllSchedules as jest.Mock).mockResolvedValue(
      mockSchedules
    );

    const response = await request(app).get("/schedules");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSchedules);
  });
});
