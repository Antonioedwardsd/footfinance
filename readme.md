# FootFinance - Seguimiento Financiero para Equipos de Fútbol

FootFinance es una aplicación web fullstack que permite seguir y analizar el rendimiento bursátil de clubes de fútbol que cotizan en el mercado financiero. Los usuarios pueden visualizar datos históricos, comparar rendimientos entre diferentes equipos y acceder a información detallada sobre cada club.

## 📊 Características Principales

- **Seguimiento de Acciones**: Visualización de datos históricos de precios de acciones de clubes de fútbol.
- **Perfiles de Equipos**: Información detallada sobre cada club, incluyendo historia, estadísticas y logros.
- **Herramienta de Comparación**: Comparativa visual entre diferentes equipos con múltiples métricas.
- **Sincronización de Datos**: Actualización de datos financieros desde Yahoo Finance.
- **Interfaz Responsiva**: Diseñada para funcionar en dispositivos móviles y de escritorio.

## 🚀 Tecnologías Utilizadas

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Recharts (para visualizaciones)
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Yahoo Finance API

### DevOps

- Workspaces de NPM para estructura monorepo
- Concurrently para ejecución paralela de servicios

## 📁 Estructura del Proyecto

```
foot-finance/
├── backend-ff/              # Servicios backend
│   ├── src/
│   │   ├── controllers/     # Controladores de API
│   │   ├── models/          # Modelos de datos
│   │   ├── routes/          # Rutas de API
│   │   └── services/        # Servicios de negocio
│   └── ...
├── frontend-ff/             # Aplicación frontend
│   ├── src/
│   │   ├── assets/          # Imágenes y recursos
│   │   ├── components/      # Componentes React
│   │   ├── data/            # Datos estáticos
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── services/        # Servicios y API
│   │   └── styles/          # Estilos comunes
│   └── ...
└── package.json             # Configuración del monorepo
```

## ⚙️ Requisitos Previos

- Node.js (versión 16 o superior)
- npm (versión 7 o superior)
- MongoDB (local o Atlas)

## 🔧 Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Antonioedwardsd/footfinance.git
   cd foot-finance
   ```

2. Instalar todas las dependencias:

   ```bash
   npm run install:all
   ```

3. Configurar variables de entorno:
   - Crea un archivo `.env` en el directorio `backend-ff` basándote en `.env.example`.
   - Crea un archivo `.env` en el directorio `frontend-ff` con:
     ```
     VITE_API_BASE_URL=http://localhost:5000/api/stocks
     ```

## 💻 Ejecución del Proyecto

1. Iniciar el proyecto completo (frontend y backend):

   ```bash
   npm run dev
   ```

2. O iniciar los servicios por separado:

   ```bash
   # Solo backend
   npm run start:backend

   # Solo frontend
   npm run start:frontend
   ```

3. Accede a la aplicación:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📊 Equipos Soportados

- Manchester United (MANU)
- Benfica Lisboa (SLBEN.LS)
- Sporting CP (SCP.LS)
- Juventus FC (JUVE.MI)
- Borussia Dortmund (BVB.DE)

## 📝 Sincronización de Datos

Para sincronizar los datos de las acciones desde Yahoo Finance, visita:

```
http://localhost:5000/api/stocks/sync
```

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---

Desarrollado por Antonio Edwards © 2025
