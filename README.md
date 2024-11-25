# Veterinaria Patitas - Sistema de Gestión de Citas

## Descripción del Proyecto
Sistema web para la gestión de citas veterinarias desarrollado como parte de una prueba técnica. La aplicación permite a los usuarios registrar, visualizar y gestionar citas para la Veterinaria Patitas, facilitando la administración de los servicios veterinarios.

## Tecnologías Utilizadas
### Frontend
- Angular 17.1
- Angular Material
- NgRx para gestión de estado
- Pruebas unitarias con Jasmine/Karma
- HttpClient para comunicación con API

### Backend
- Spring Boot 3.3.6
- REST API
- JPA/Hibernate
- Lombok para reducción de código boilerplate
- Spring Web para endpoints REST
- Validación de datos con @Valid

## Características Principales
- Sistema completo de gestión de citas:
  - Registro y actualización de citas
  - Visualización de citas activas y completas
  - Marcado de citas como atendidas
  - Eliminación física de citas
  - Verificación de disponibilidad de horarios
- Interfaz de usuario intuitiva y responsive
- Gestión de estado centralizada con NgRx
- API RESTful con validación de datos
- Cross-Origin Resource Sharing (CORS) configurado

## Requisitos Previos
- Node.js (versión recomendada: 18+)
- Angular CLI 17.1
- Java JDK 17 o superior
- Maven 3.8+

## Instalación y Configuración

### Frontend
```bash
# Clonar el repositorio
git clone https://github.com/coderalexis/repo-prueba.git

# Navegar al directorio del frontend
cd veterinaria-patitas

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

### Backend
```bash
# Navegar al directorio del backend
cd patitas

# Compilar el proyecto
mvn clean install

# Ejecutar el servidor
mvn spring-boot:run
```

La aplicación estará disponible en:
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`

## API Endpoints

### Citas
- `GET /api/citas`: Obtener citas no atendidas
- `GET /api/citas/all`: Obtener todas las citas (atendidas y no atendidas)
- `GET /api/citas/{id}`: Obtener una cita específica
- `POST /api/citas`: Crear nueva cita
- `PUT /api/citas/{id}`: Actualizar una cita existente
- `DELETE /api/citas/{id}`: Marcar cita como atendida
- `DELETE /api/citas/delete/{id}`: Eliminar permanentemente una cita
- `PATCH /api/citas/{id}/atendida`: Marcar cita como atendida
- `GET /api/citas/available-slots`: Obtener horarios disponibles para una fecha

### Servicios Frontend
El servicio Angular (`CitaService`) proporciona los siguientes métodos:
```typescript
- getCitas(): Observable<Cita[]>
- createCita(cita: Cita): Observable<Cita>
- deleteCita(id: number): Observable<void>
- updateCita(id: number, cita: Cita): Observable<Cita>
- getAvailableSlots(date: string): Observable<string[]>
```

## Estructura del Proyecto
```
├── frontend/                # Proyecto Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── models/
│   │   │   │   └── services/      
│   │   │   ├── features/
│   │   │   │   ├── citas/
│   │   │   │   │   ├── components/
│   │   │   │   │   └── store/      # Estado NgRx
│   │   │   │   ├── home/
│   └── └── assets/
└── backend/                 # Proyecto Spring Boot
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   └── resources/
    │   └── test/
```

## Pruebas
### Frontend
```bash
# Ejecutar pruebas unitarias
ng test
```


## Estado del Proyecto
- [✓] Implementación de funcionalidades base
- [✓] Pruebas unitarias frontend
- [✓] Integración con backend
- [✓] Gestión de estado con NgRx
- [✓] Validación de datos en backend
- [✓] Manejo de errores HTTP

## Autor
Jose Alexis Cruz Solar