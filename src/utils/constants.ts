// Mensajes de la base de datos
export const DB_MESSAGES = {
    CONNECTED: '✅ Conectado a MongoDB',
    CONNECTION_ERROR: '❌ Error conectando a MongoDB:',
    URI_NOT_FOUND: 'MONGODB_URI no está definida en las variables de entorno',
    MIGRATION_SUCCESS: 'Migración completada exitosamente',
    MIGRATION_ERROR: '❌ Error en la migración:',
};

// Mensajes del servidor
export const SERVER_MESSAGES = {
    RUNNING: (port: string | number) => `🚀 Servidor corriendo en http://localhost:${port}`,
    START_ERROR: 'Error al iniciar el servidor:',
};

// Mensajes de errores HTTP
export const ERROR_MESSAGES = {
    NOT_FOUND: 'Recurso no encontrado',
    SCHEDULE: {
        NOT_FOUND: 'Agenda no encontrada',
        INVALID_DATA: 'Datos de agenda inválidos',
    },
};

// Textos de la aplicación
export const APP_TEXTS = {
    WELCOME: 'Bienvenido a Medical Agenda API',
};

// Logos (en formato ASCII)
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
