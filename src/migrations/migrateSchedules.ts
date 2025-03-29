import mongoose from "mongoose";
import Schedule from "../models/schedule.model";
import schedulesData from "../data/pruebaTecnica.json";
import { DB_MESSAGES } from "../utils/constants";

const migrateSchedules = async () => {
    try {
        console.log("⏳ Iniciando migración de datos...");

        await Schedule.deleteMany();
        console.log("🔄 Colección Schedule limpiada");

        const schedulesToInsert = schedulesData.schedules.map(schedule => ({
            idDoctor: schedule.idDoctor,
            idClinic: schedule.idClinic,
            slotdates: schedule.slotdates.map(slotdate => ({
                date: slotdate.date,
                slots: slotdate.slots || []
            }))
        }));

        const result = await Schedule.insertMany(schedulesToInsert);
        console.log(`✅ ${DB_MESSAGES.MIGRATION_SUCCESS}: ${result.length} registros insertados`);

        return result;
    } catch (error) {
        console.error(DB_MESSAGES.MIGRATION_ERROR, error);
        throw error;
    }
};

export default migrateSchedules;