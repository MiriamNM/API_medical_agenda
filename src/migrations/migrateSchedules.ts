import mongoose from "mongoose";
import Schedule from "../models/schedule.model";
import schedulesData from "../data/pruebaTecnica.json";
import { SUCCESS_MESSAGES, ERROR_MESSAGES, APP_TEXTS } from "../utils/constants";

const migrateSchedules = async () => {
    try {
        console.log(APP_TEXTS.STARTING_MIGRATION);

        await Schedule.deleteMany();

        const schedulesToInsert = schedulesData.schedules.map(schedule => ({
            idDoctor: schedule.idDoctor,
            idClinic: schedule.idClinic,
            slotdates: schedule.slotdates.map(slotdate => ({
                date: slotdate.date,
                slots: slotdate.slots || []
            }))
        }));

        const result = await Schedule.insertMany(schedulesToInsert);
        console.log(`✅ ${SUCCESS_MESSAGES.MIGRATION_SUCCESS}`);

        return result;
    } catch (error) {
        console.error(ERROR_MESSAGES.MIGRATION_ERROR, error);
        throw error;
    }
};

export default migrateSchedules;