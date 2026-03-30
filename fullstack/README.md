# Task Manager Fullstack (Node.js + Express + MySQL)

Aplicacion CRUD de tareas con frontend en HTML/Bootstrap y backend REST en Express.

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
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=task_manager
```

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
node server.js
```

2. Servir frontend en puerto 8080 (recomendado por configuracion CORS):

```bash
npx http-server . -p 8080
```

Luego abre:

- Frontend: http://localhost:8080/index.html
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

- El frontend usa API_URL fija a http://localhost:3000/api/tasks/ en app.js.
- Si cambias host/puertos, ajusta CORS en server.js y API_URL en app.js.
