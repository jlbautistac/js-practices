# Task Manager Fullstack (Node.js + Express + MySQL)

Aplicacion CRUD de tareas con frontend y backend separados por capas.

## Estructura

```text
fullstack/
  backend/
    app.js
    server.js
    config/
      db.js
    controllers/
      tasksController.js
    middlewares/
      taskValidation.js
    routes/
      taskRoutes.js
  frontend/
    app.js
    index.html
  .env
  package.json
  README.md
```

## Stack

- Node.js (CommonJS)
- Express
- MySQL (mysql2)
- dotenv
- CORS
- Bootstrap 5 + Bootstrap Icons

## Features

- Listar tareas
- Crear tareas
- Editar tareas
- Eliminar tareas
- Validaciones en backend y frontend
- Notificaciones tipo Toast en frontend

## Requisitos

- Node.js 18+
- MySQL 8+

## Instalacion

1. Entrar al proyecto:

```bash
cd fullstack
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo .env en la raiz de fullstack:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=task_manager
```

### Configuracion Railway (MySQL)

Puedes usar cualquiera de estos formatos:

```env
DATABASE_URL=mysql://usuario:password@host:puerto/database
```

o separado por campos:

```env
DB_HOST=host
DB_PORT=puerto
DB_USER=usuario
DB_PASSWORD=password
DB_NAME=database
```

Nota: si usas URL completa de Railway, ponla en DATABASE_URL (o en DB_HOST con formato mysql://...) y el backend la detecta automaticamente.

## Base de datos

Ejecuta estas sentencias en MySQL:

```sql
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  priority ENUM('Low', 'Medium', 'High') NOT NULL,
  isCompleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Opcional: datos de prueba.

```sql
INSERT INTO tasks (title, priority, isCompleted) VALUES
('Complete project documentation', 'High', false),
('Review pull requests', 'Medium', false),
('Update dependencies', 'Low', true);
```

## Ejecucion

1. Iniciar backend (puerto 3000):

```bash
npm run start:api
```

2. Servir frontend en puerto 8080 (recomendado por configuracion CORS):

```bash
npm run start:client
```

Luego abre:

- Frontend: http://localhost:8080
- API health check: http://localhost:3000/

## Validaciones

### Backend

- id: entero positivo
- title: requerido, string, no vacio
- priority: debe ser uno de Low, Medium, High
- isCompleted (en PUT): booleano

### Frontend

- Validacion de campo Task vacio antes de enviar
- Manejo de errores del servidor mostrando mensaje en Toast

## Endpoints

- GET /api/tasks/
- GET /api/tasks/:id
- POST /api/tasks/
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

### Ejemplo POST

```json
{
  "title": "Write README",
  "priority": "Medium"
}
```

### Ejemplo PUT

```json
{
  "title": "Write README v2",
  "priority": "High",
  "isCompleted": false
}
```

## Notas

- El backend queda aislado en la carpeta backend y el frontend en frontend.
- La URL del frontend calcula el host actual y usa el puerto 3000 para la API.
- Si cambias puertos, ajusta CORS en backend/app.js y la constante API_URL en frontend/app.js.
