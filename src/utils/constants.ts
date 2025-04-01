export const SUCCESS_MESSAGES = {
  CONNECTED: "✅ Conectado a MongoDB",
  MIGRATION_SUCCESS: "Migración completada exitosamente",
  DELETED_SUCCESS: "Eliminada correctamente",
};

export const SERVER_MESSAGES = {
  RUNNING: (port: string | number) =>
    `🚀 Servidor corriendo en http://localhost:${port}`,
  START_ERROR: "Error al iniciar el servidor:",
  INTERNAL_SERVER_ERROR: "Error interno del servidor",
};

export const ERROR_MESSAGES = {
  CONNECTION_ERROR: "❌ Error conectando a MongoDB:",
  URI_NOT_FOUND: "MONGODB_URI no está definida en las variables de entorno",
  MIGRATION_ERROR: "❌ Error en la migración:",
  NOT_FOUND: "No encontrada",
  NOT_FOUND_PATIENT: "Paciente no encontrada",
  PATIENT_NOT_CREATED: "La paciente no se pudo crear",
  PATIENT_NOT_UPDATED: "La paciente no pudo ser actualizada.",
  ERROR_GETTING_PATIENT: "Error al encontrar a la paciente.",
  ERROR_DELETING_PATIENT: "Error al eliminar a la paciente",
  ALREADY_MEDICAL_APPOINTMENT:
    "Ya existe una consulta médica en esta fecha y hora.",
  SCHEDULE: {
    NOT_FOUND: "Agenda no encontrada",
    INVALID_DATA: "Datos de agenda inválidos",
    NOT_FOUND_CONSULTATION: "Consulta médica no encontrada",
    ERROR_CREATING_SCHEDULE: "Error al crear el horario",
    ERROR_GETTING_SCHEDULE: "Error al obtener los horarios",
    ERROR_UPDATING_SCHEDULE: "Error al actualizar la cita",
    ERROR_CLEANING_SLOTS: "Error al limpiar los slots",
    ERROR_DELETED_SCHEDULE: "Error al borrar la cita",
  },
  AVAILABILITY_ERROR: "Error al obtener la disponibilidad:",
  REPEATED_QUERY: "Esta consulta ya ha sido programada",
  GENERIC_ERROR:
    "No se pudo completar la solicitud. Verifique los datos e intente nuevamente.",
  ERROR_ADDING_MEDICAL_HISTORY:
    "Error al agregar la historia médica y actualizar el calendario",
  NOT_UPDATE_PATIENT_CALENDAR:
    "No se pudo actualizar el paciente y el calendario",
  ERROR_RETRIEVING_AVAILABILITY: "Error al recuperar la disponibilidad",
};

export const APP_TEXTS = {
  WELCOME: "Bienvenido a Medical Agenda API",
  STARTING_MIGRATION: "Iniciando migración de datos...",
};

export const APP_LOGO = `
  \x1b[38;2;123;22;70m
  ██████╗ ██╗     ███████╗███╗   ██╗███╗   ██╗ █████╗ 
  ██╔══██╗██║     ██╔════╝████╗  ██║████╗  ██║██╔══██╗
  ██████╔╝██║     █████╗  ██╔██╗ ██║██╔██╗ ██║███████║
  ██╔═══╝ ██║     ██╔══╝  ██║╚██╗██║██║╚██╗██║██╔══██║
  ██║     ███████╗███████╗██║ ╚████║██║ ╚████║██║  ██║
  ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝
  \x1b[0m
`;
