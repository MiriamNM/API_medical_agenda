import mongoose from "mongoose";
import Schedule from "../models/schedule.model";
import schedulesData from "../data/pruebaTecnica.json";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  APP_TEXTS,
} from "../utils/constants";
import migrateSchedules from "../migrations/migrateSchedules";

jest.mock("../models/schedule.model", () => ({
  deleteMany: jest.fn(),
  insertMany: jest.fn(),
}));

describe("migrateSchedules", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe migrar los horarios correctamente", async () => {
    console.log = jest.fn();
    (Schedule.insertMany as jest.Mock).mockResolvedValue(
      schedulesData.schedules
    );

    const result = await migrateSchedules();

    expect(console.log).toHaveBeenCalledWith(APP_TEXTS.STARTING_MIGRATION);
    expect(Schedule.deleteMany).toHaveBeenCalled();
    expect(Schedule.insertMany).toHaveBeenCalledWith(
      schedulesData.schedules.map((schedule) => ({
        idDoctor: schedule.idDoctor,
        idClinic: schedule.idClinic,
        slotdates: schedule.slotdates.map((slotdate) => ({
          date: slotdate.date,
          slots: slotdate.slots || [],
        })),
      }))
    );
    expect(console.log).toHaveBeenCalledWith(
      `✅ ${SUCCESS_MESSAGES.MIGRATION_SUCCESS}`
    );
    expect(result).toEqual(schedulesData.schedules);
  });

  test("Debe manejar errores correctamente", async () => {
    console.error = jest.fn();
    const errorMessage = new Error("Error en la BD");
    (Schedule.insertMany as jest.Mock).mockRejectedValue(errorMessage);

    await expect(migrateSchedules()).rejects.toThrow(errorMessage);

    expect(console.error).toHaveBeenCalledWith(
      ERROR_MESSAGES.MIGRATION_ERROR,
      errorMessage
    );
  });
});
