import mongoose, { Schema, Document } from "mongoose";

interface Slot {
  sourceEvent: string;
  dateTime: Date;
}

export interface SlotDate {
  date: Date;
  slots?: Slot[];
}

export interface ISchedule extends Document {
  idDoctor?: string;
  idClinic?: string;
  slotdates: SlotDate[];
}

const ScheduleSchema: Schema = new Schema(
  {
    idDoctor: { type: String },
    idClinic: { type: String },
    slotdates: [
      {
        date: { type: Date, required: true },
        slots: [
          {
            sourceEvent: { type: String, required: true },
            dateTime: { type: Date, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);
export default Schedule;
