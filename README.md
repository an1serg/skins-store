# Установка и запуск

## 1. Клонирование репозитория
```bash
git clone https://github.com/an1serg/skins-store.git
cd skins-store
```

## 2. Установка зависимостей
```bash
npm install
```

## 3. Настройка базы данных
Убедитесь, что PostgreSQL и Redis запущены.

Создайте базу данных в PostgreSQL.

Настройте подключение к базе данных в файле `src/db.ts`:
```typescript
const db = new Pool({
  connectionString: 'postgres://user:password@localhost:5432/mydb',
});
```
Замените `user`, `password` и `mydb` на свои значения.

Инициализируйте базу данных, выполнив команду:
```bash
npm run init-db
```

## 4. Запуск приложения
```bash
npm run build
npm start
```
Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000).

# API Endpoints

## 1. Регистрация пользователя
**Метод:** POST  
**URL:** `/api/auth/register`

**Тело запроса:**
```json
{
  "username": "user123",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "message": "User registered"
}
```

## 2. Аутентификация
**Метод:** POST  
**URL:** `/api/auth/login`

**Тело запроса:**
```json
{
  "username": "user123",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## 3. Смена пароля
**Метод:** POST  
**URL:** `/api/auth/change-password`

**Тело запроса:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```

**Ответ:**
```json
{
  "message": "Password changed"
}
```

## 4. Получение списка предметов
**Метод:** GET  
**URL:** `/api/items`

**Ответ:**
```json
[
  {
    "name": "AK-47 | Redline",
    "tradable": 25.5,
    "not_tradable": 23.0
  }
]
```

## 5. Покупка товара
**Метод:** POST  
**URL:** `/api/purchases/buy`

**Тело запроса:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "productId": 1
}
```

**Ответ:**
```json
{
  "message": "Purchase successful",
  "newBalance": 89.5
}
```
