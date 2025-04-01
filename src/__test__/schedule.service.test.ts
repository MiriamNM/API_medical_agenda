import mongoose from "mongoose";
import scheduleModel from "../models/schedule.model";
import * as scheduleService from "../services/schedule.service";

jest.mock("../models/schedule.model");

describe("Schedule Service", () => {
  const mockSchedule = {
    __id: new mongoose.Types.ObjectId(),
    idDoctor: "doctor456",
    idClinic: "clinic789",
    slotdates: [
      { date: "2025-03-31T10:00:00.000Z", slots: ["09:00", "10:00"] },
    ],
    save: jest.fn().mockResolvedValue({
      _id: new mongoose.Types.ObjectId(),
      idDoctor: "doctor456",
      idClinic: "clinic789",
      slotdates: [
        { date: "2025-03-31T10:00:00.000Z", slots: ["09:00", "10:00"] },
      ],
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener todos los horarios", async () => {
    (scheduleModel.find as jest.Mock).mockResolvedValue([mockSchedule]);

    const result = await scheduleService.getAllSchedules();

    expect(scheduleModel.find).toHaveBeenCalled();
    expect(result).toEqual([mockSchedule]);
  });

  test("Debe obtener un horario por ID", async () => {
    (scheduleModel.findById as jest.Mock).mockResolvedValue(mockSchedule);

    const result = await scheduleService.getScheduleById("schedule123");

    expect(scheduleModel.findById).toHaveBeenCalledWith("schedule123");
    expect(result).toEqual(mockSchedule);
  });

  test("Debe actualizar un horario correctamente", async () => {
    const updatedSchedule = { ...mockSchedule, idClinic: "clinic999" };
    (scheduleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      updatedSchedule
    );

    const result = await scheduleService.updateSchedule("schedule123", {
      idClinic: "clinic999",
    });

    expect(scheduleModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "schedule123",
      { idClinic: "clinic999" },
      { new: true }
    );
    expect(result).toEqual(updatedSchedule);
  });

  test("Debe limpiar las fechas de slotdates en un horario", async () => {
    const mockScheduleWithSave = {
      _id: new mongoose.Types.ObjectId(),
      idDoctor: "doctor456",
      idClinic: "clinic789",
      slotdates: [
        { date: "2025-03-31T10:00:00.000Z", slots: ["09:00", "10:00"] },
      ],
      save: jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        idDoctor: "doctor456",
        idClinic: "clinic789",
        slotdates: [{ date: "2025-03-31", slots: [] }],
      }),
    };

    (scheduleModel.findById as jest.Mock).mockResolvedValue(
      mockScheduleWithSave
    );

    const result = await scheduleService.cleanSlotDates("schedule123");

    const { _id, ...expectedResult } = {
      _id: mockScheduleWithSave._id,
      idDoctor: "doctor456",
      idClinic: "clinic789",
      slotdates: [{ date: "2025-03-31", slots: [] }],
    };

    const { _id: resultId, ...resultWithoutId } = result;

    expect(scheduleModel.findById).toHaveBeenCalledWith("schedule123");
    expect(mockScheduleWithSave.save).toHaveBeenCalled();
    expect(resultWithoutId).toEqual(expectedResult);
  });

  test("Debe retornar null si el horario no existe en cleanSlotDates", async () => {
    (scheduleModel.findById as jest.Mock).mockResolvedValue(null);

    const result = await scheduleService.cleanSlotDates("nonexistent123");

    expect(scheduleModel.findById).toHaveBeenCalledWith("nonexistent123");
    expect(result).toBeNull();
  });
});
