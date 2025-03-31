export const SUCCESS_MESSAGES = {
  CONNECTED: "✅ Conectado a MongoDB",
  MIGRATION_SUCCESS: "Migración completada exitosamente",
  DELETED_SUCCESS: "Eliminado correctamente",
};

export const SERVER_MESSAGES = {
  RUNNING: (port: string | number) =>
    `🚀 Servidor corriendo en http://localhost:${port}`,
  START_ERROR: "Error al iniciar el servidor:",
};

export const ERROR_MESSAGES = {
  CONNECTION_ERROR: "❌ Error conectando a MongoDB:",
  URI_NOT_FOUND: "MONGODB_URI no está definida en las variables de entorno",
  MIGRATION_ERROR: "❌ Error en la migración:",
  NOT_FOUND: "No encontrado",
  NOT_FOUND_PATIENT: "Paciente no encontrado",
  PATIENT_NOT_CREATED: "El paciente no se pudo crear",
  PATIENT_NOT_UPDATED: "The patient could not be updated.",
  SCHEDULE: {
    NOT_FOUND: "Agenda no encontrada",
    INVALID_DATA: "Datos de agenda inválidos",
    NOT_FOUND_CONSULTATION: "Medical consultation not found",
  },
  AVAILABILITY_ERROR: "Error al obtener la disponibilidad:",
  REPEATED_QUERY: "This consultation has already been scheduled",
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
