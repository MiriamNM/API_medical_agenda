# 🤰 API_medical_agenda 🚺

Este proyecto es la realización de una API en la que se crean los servicios para ver la disponibilidad de las consultas de las doctoras y de igual forma tener los servicios de CRUD para las pacientes y poder tener un buen historial medico. 

## Objetivos
- Desarrollar una API en Node.js y Express para unificar la disponibilidad de las doctoras.

- Crear un modelo de base de datos NoSQL para gestionar información de pacientes y consultas médicas.

- Escribir pruebas automatizadas para verificar la funcionalidad de los endpoints y la lógica de negocio.

- Desplegar la aplicación en la nube usando Docker y MongoDB.

## Requisitos
Para comenzar a trabajar con esta aplicación, asegúrate de tener los siguientes elementos instalados:

- Node.js.

- Docker: para crear y ejecutar contenedores.

- MongoDB: para la base de datos NoSQL.

- Git: para clonar el repositorio.

## Instalación
Sigue los pasos a continuación para instalar y configurar el proyecto en tu máquina local.

### Paso 1: Clonar el repositorio
Primero, clona el repositorio en tu máquina:
```bash
    git clone https://github.com/tu-usuario/API_medical_agenda.git
    cd API_medical_agenda
```

### Paso 2: Instalar dependencias
Instala las dependencias del proyecto:
```bash
    npm install
```

Esto instalará todas las dependencias necesarias para ejecutar la aplicación, incluidas las herramientas de TypeScript.

### Paso 3: Compilar el código TypeScript (si es necesario)
Si prefieres compilar los archivos TypeScript antes de ejecutarlos, usa el siguiente comando:
```bash
    npx tsc
```
Esto generará los archivos JavaScript en la carpeta dist.

### Paso 4: Ejecutar la aplicación localmente
Para ejecutar la aplicación localmente con TypeScript, usa ts-node:
```bash
    npx ts-node src/server.ts

    #O copilado el código
    node dist/server.js
```


![Despliegue local](https://raw.githubusercontent.com/MiriamNM/API_medical_agenda/refs/heads/main/assets/Captura%20de%20pantalla%202025-03-28%20a%20la(s)%204.54.22%E2%80%AFp.m..png)

### Paso 5: Probar los Endpoints
Una vez que la aplicación esté corriendo, puedes probar los siguientes endpoints:

GET /doctors/availability: Obtiene el horario unificado de las doctoras.

POST /patients: Crea un nuevo registro de la paciente.

GET /patients/:id: Obtiene la información de una paciente por su ID.

PUT /patients/:id: Actualiza la información de una paciente.

DELETE /patients/:id: Elimina una paciente.

POST /patients/:id/medicalHistory: Agregas una nueva consulta a la paciente.

Puedes usar herramientas como Postman o cURL para hacer estas peticiones.

## Desarrollo
### Sección 1: Desarrollo e Integración de API
####  Tarea 1: Implementar una Función para Unificar la Disponibilidad de Doctoras
- Se creó un servidor web utilizando TypeScript, Node.js y Express.

- Implementé un middleware global para manejar solicitudes POST vacías y devolver un error 400.

- Desarrollé una función para unificar la disponibilidad de las doctoras a partir de un JSON proporcionado.

- Se expuso un endpoint GET /doctors/availability que devuelve el horario unificado de las doctoras.

![Disponibilidad](https://raw.githubusercontent.com/MiriamNM/API_medical_agenda/refs/heads/main/assets/Captura%20de%20pantalla%202025-03-28%20a%20la(s)%209.57.25%E2%80%AFp.m..png)

#### Tarea 2: Modelado de Base de Datos y Operaciones CRUD
- MongoDB se utilizó para almacenar la información de los pacientes y sus consultas médicas.

- Se crearon los siguientes endpoints para manejar las operaciones CRUD de los pacientes:

POST /patients: Crear un nuevo paciente.

GET /patients/:id: Obtener información de un paciente por su ID.

PUT /patients/:id: Actualizar los datos de un paciente.

DELETE /patients/:id: Eliminar un paciente.

- Se implementó un manejo de errores adecuado para cada operación CRUD.

- Se agrego un servicio para poder agregar consultas al historial de la paciente.

POST /patients/:id/medicalHistory

![Esquema Plenna](https://raw.githubusercontent.com/MiriamNM/API_medical_agenda/refs/heads/main/assets/Plenna.drawio.png)
![Agregando consulta](https://raw.githubusercontent.com/MiriamNM/API_medical_agenda/refs/heads/main/assets/Captura%20de%20pantalla%202025-04-01%20a%20la(s)%208.47.05%E2%80%AFp.m..png)


### Sección 2: Tests Automatizados
#### Tarea 3: Escribir Pruebas Automatizadas
- Se utilizaron Jest para escribir pruebas unitarias e integrales.

- Las pruebas cubren casos como:

    - Verificar que la disponibilidad de las doctoras se unifique correctamente.

    - Comprobar la correcta creación, actualización, lectura y eliminación de pacientes.

Ejemplo de comando para ejecutar las pruebas:
```bash
    npx jest
```

## Despliegue en la Nube
Uso de Docker para el Despliegue
La aplicación está configurada para ser ejecutada en un contenedor Docker. Para desplegarla en la nube, puedes seguir estos pasos:

### Construir la imagen Docker:

En el directorio raíz del proyecto, construye la imagen Docker:
```bash
    docker build -t myapp .
```

### Ejecutar el contenedor Docker:

Después de construir la imagen, puedes ejecutar el contenedor:
```bash
    docker run -p 5050:5050 myapp
```

Esto expondrá la aplicación en el puerto 3000 de tu máquina local.

### MongoDB en Docker
La base de datos MongoDB también se puede ejecutar en un contenedor Docker. Se incluye un docker-compose.yml para configurar ambos servicios (aplicación y base de datos).

Para iniciar MongoDB y la aplicación, puedes usar el siguiente comando:
```bash
    docker-compose up
```

Para volver a levantar mongo.
```bash
    docker-compose down -v                                                                                            
    docker-compose up --build
```
