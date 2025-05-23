# Lo

**Lo** — это мобильное приложение на React Native.

## Структура проекта

```
src/
  app/         — инициализация, навигация, store
  entities/    — бизнес-сущности
  features/    — функциональные возможности
  widgets/     — виджеты
  pages/       — страницы
  shared/      — общие модули, UI, стили, API, типы, утилиты
```

## Основные технологии

- **React Native** — кроссплатформенная разработка.
- **React Navigation** — навигация в приложении.
- **Tanstack Query** — отправка запросов в API с возможностью кэширования.
- **Axios** — работа с API.
- **TypeScript** — статическая типизация.
- **React Native MMKV** — высокопроизводительное решение для хранения данных на устройстве.
- **Zustand** — управление состоянием.
- **Valibot** — валидация данных.
- **React Native Elements** — UI компоненты.
- **Feature-Sliced Design** — модульная архитектура.

## Работа с API

В папке `src/shared/api` реализованы:
- Базовые запросы через axios
- Конфигурация базовых URL и скоупов
- Поддержка нескольких окружений (dev/prod) через переменные окружения

## Как запустить проект

1. Установите зависимости:
   ```sh
   yarn install
   ```

2. Запустите Metro:
   ```sh
   yarn start
   ```

3. Запустите приложение:
   - **Android:** `yarn android`
   - **iOS:** `yarn ios` (предварительно выполните `cd ios && pod install`)

## Требования

- Node.js 22.x
- npm 10.x
- Yarn 4.9.1

