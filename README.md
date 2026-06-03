# 🚀 MiniLink 

Современный REST API сервис для создания персональных страниц со ссылками. Реализован на Node.js с использованием TypeScript, Express.js и MongoDB, упакован в Docker для простоты развертывания.

## 🛠️ Стек технологий

- **Runtime:** Node.js 20 LTS
- **Language:** TypeScript 5.x
- **Framework:** Express.js 4.x
- **Database:** MongoDB 7.0 + Mongoose 8.x
- **Containerization:** Docker + Docker Compose
- **Development:** tsx (hot reload), dotenv

## ✨ Возможности

- ✅ Создание и управление профилями пользователей
- ✅ Добавление/удаление ссылок с валидацией URL
- ✅ Подсчет кликов по ссылкам (асинхронно)
- ✅ Атомарные операции с MongoDB (без race conditions)
- ✅ Полная типизация TypeScript
- ✅ Готов к production с Docker
- ✅ Безопасное хранение секретов через `.env`

## 📁 Структура проекта

MiniLink/
├── src/
│   ├── config/          # Конфигурация (подключение к БД)
│   ├── models/          # Mongoose схемы и модели
│   ├── routes/          # Express маршруты (контроллеры)
│   └── server.ts        # Точка входа приложения
├── .dockerignore
├── .env.example         # Шаблон переменных окружения
├── .gitignore
├── docker-compose.yml   # Оркестрация контейнеров
├── Dockerfile           # Инструкции для сборки образа
├── package.json
└── tsconfig.json

## 🚀 Быстрый старт

### Требования

- [Docker](https://www.docker.com/products/docker-desktop/) и Docker Compose (рекомендуется)
- **ИЛИ** Node.js 20+ и MongoDB (для локального запуска без Docker)

### Вариант 1: Запуск через Docker (Рекомендуется)

1. **Клонируйте репозиторий:**

git clone https://github.com/nveselov-dev/MiniLink.git
cd MiniLink

2. **Создайте файл `.env` на основе шаблона:**

cp .env.example .env

*(Для локальной разработки значения по умолчанию уже подходят)*

3. **Запустите все сервисы одной командой:**

docker-compose up --build

4. **Сервер доступен по адресу:** http://localhost:8080
**MongoDB:** mongodb://localhost:27017/minilink

### Вариант 2: Локальный запуск (без Docker)

1. Установите зависимости:

npm install

2. Создайте файл `.env` и укажите строку подключения к MongoDB:

PORT=8080
MONGO_URI=mongodb://localhost:27017/minilink

3. Запустите сервер в режиме разработки (с hot reload):

npm run dev

## 📡 API Endpoints

### Пользователи

#### Создать пользователя

POST /api/users
Content-Type: application/json

{
  "username": "johndoe"
}

**Ответ:** `201 Created`

{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "username": "johndoe",
  "links": [],
  "createdAt": "2026-06-03T12:00:00.000Z",
  "updatedAt": "2026-06-03T12:00:00.000Z"
}

#### Получить профиль пользователя

GET /api/users/:username

**Ответ:** `200 OK`

{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "username": "johndoe",
  "links": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "url": "https://github.com",
      "title": "My GitHub",
      "clicks": 5
    }
  ]
}

### Ссылки

#### Добавить ссылку пользователю

POST /api/users/:username/links
Content-Type: application/json

{
  "url": "https://github.com",
  "title": "My GitHub"
}

**Ответ:** `201 Created`

#### Зарегистрировать клик по ссылке

PATCH /api/links/:linkId/click

**Ответ:** `200 OK`

{
  "message": "Click registered successfully",
  "clicks": 6
}

## 🔒 Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `PORT` | Порт, на котором работает сервер | `8080` |
| `MONGO_URI` | Строка подключения к MongoDB | `mongodb://mongo:27017/minilink` (Docker) |

## 🏗️ Архитектурные решения

### Почему TypeScript?
Строгая типизация позволяет ловить ошибки на этапе компиляции, а не в продакшене. Все интерфейсы и модели типизированы, что улучшает автодополнение в IDE и снижает количество багов.

### Почему MongoDB + Mongoose?
- **Гибкость схемы:** Идеально подходит для вложенных структур (пользователь → массив ссылок)
- **Атомарные операции:** Использование `$push`, `$inc` и позиционного оператора `$` гарантирует целостность данных при конкурентных запросах
- **Валидация:** Mongoose валидирует данные на уровне схемы до записи в БД

### Почему Docker?
- **Воспроизводимость:** Проект запускается одинаково на любом компьютере
- **Изоляция:** Не нужно устанавливать MongoDB локально
- **Production-ready:** Готов к деплою на любой облачный сервис

## 🧪 Тестирование API

Для тестирования можно использовать:
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (расширение VS Code)
- Встроенный HTTP Client в WebStorm/IntelliJ IDEA
- `curl` в терминале

Пример с curl:

# Создать пользователя
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser"}'

# Получить профиль
curl http://localhost:8080/api/users/testuser

## 📝 Лицензия

MIT

## 👤 Автор

**Николай Веселов**
GitHub: [@nveselov-dev](https://github.com/nveselov-dev)

---


