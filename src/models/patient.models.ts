import mongoose, { Document, Schema } from "mongoose";

interface IConsultation {
  idClinic?: string;
  idDoctor?: string;
  dateTime: Date;
  scheduleId?: string;
}

const consultationSchema = new Schema<IConsultation>({
  idClinic: { type: String, required: true },
  idDoctor: { type: String, required: true },
  dateTime: { type: Date, required: true },
});

interface IMedicalHistory {
  medicalConsultation: IConsultation[];
}

export interface IPatient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  medicalHistory: IMedicalHistory[];
}

const patientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String, required: true },
  address: { type: String },
  dateOfBirth: { type: Date },
  medicalHistory: [
    {
      medicalConsultation: consultationSchema,
    },
  ],
});

const Patient = mongoose.model<IPatient>("Patient", patientSchema);

export { IConsultation, Patient };
