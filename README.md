Стек:
 **Backend:** ASP.NET 8 Web API, Swagger, Entity Framework Core, Dapper, PostgreSQL
 
 **Frontend:** Angular + TypeScript + SCSS + RxJS + ESLint + Prettier + Husky

---
### Backend
- .NET 8 SDK
- PostgreSQL 14+

### Frontend
- Node.js 20+
- npm 10+

---
## Запуск локально
1. PostgreSQL 

2. backend
### 1. Перейти в backend

```bash
cd backend/src/Lasmart.DriverRecords.Api
```
### 2. Запустить backend

```bash
dotnet restore
dotnet run
```

Доступно:
- API: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger`

---

## Локальный запуск frontend

### 1. Перейти в frontend

```bash
cd frontend
```

### 2. Установить зависимости

```bash
npm install
```

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api',
};
```

### 4. Запустить frontend

```bash
npm start
```

Приложение откроется на:
- `http://localhost:4200`

---





