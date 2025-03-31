import mongoose, { Schema, Document } from "mongoose";

interface Slot {
  sourceEvent: string;
  dateTime: Date;
}

interface SlotDate {
  date: Date;
  slots?: Slot[];
}

interface ISchedule extends Document {
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

export default mongoose.model<ISchedule>("Schedule", ScheduleSchema);
