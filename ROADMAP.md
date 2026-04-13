# Life Roadmap — Дорожная карта разработки

> Статус: `[ ]` — не начато · `[~]` — в процессе · `[x]` — готово

---

## Фаза 0 — Текущее состояние
- [x] Макет `index.html` — таймлайн + 18 психологических метрик
- [x] Все 8 UX-фич (Impact, Chroma, Compact, Causal, Trend, Zoom, Drawer, Minimap)
- [x] Фильтр периода (dropdown → пересчёт всех метрик)
- [x] Фиксация архитектурных решений (этот файл)

---

## Фаза 1 — Рефакторинг фронтенда (Vite)

### 1.1 Инициализация проекта
- [x] `npm create vite@latest` — vanilla JS, без фреймворков
- [x] Перенос CSS в `src/styles/` по модулям
- [x] Перенос JS-логики в `src/` по модулям
- [x] Настройка `vite.config.js` (путь сборки, base URL)

### 1.2 Модули данных (`src/data/`)
- [x] `events.js` — все события таймлайна (ev-bully, ev-anxiety, …)
- [x] `periods.js` — датасеты по периодам (1m, 3m, 6m, 1y, 2y, 5y, all)
- [x] `causal-links.js` — массив причинно-следственных связей

### 1.3 Модули метрик (`src/metrics/`)
- [x] `maslow.js` — пирамида Маслоу
- [x] `erikson.js` — стадии Эриксона
- [x] `radar.js` — колесо жизни (SVG radar)
- [x] `donut.js` — состав событий
- [x] `density.js` — плотность по годам
- [x] `arc.js` — эмоциональная дуга
- [x] `balance.js` — баланс полярностей
- [x] `growth.js` — зоны роста
- [x] `defense.js` — защитные механизмы Вайлант
- [x] `locus.js` — локус контроля Роттер
- [x] `rf.js` — рефлексивное функционирование Фонаги
- [x] `ego.js` — эго-состояния Берн / ТА
- [x] `window.js` — окно толерантности Сигел
- [x] `exist.js` — экзистенциальный анализ Франкл / Лэнгле
- [x] `sdt.js` — теория самодетерминации Деси / Райан
- [x] `cognitive.js` — когнитивные искажения Бек / КБТ

### 1.4 Модули фич (`src/features/`)
- [x] `timeline.js` — рендер таймлайна из `src/data/timeline.js` (данные вынесены из HTML)
- [x] `drawer.js` — прогрессивное раскрытие (боковая панель)
- [x] `minimap.js` — навигационная миникарта
- [x] `causal.js` — SVG-цепочки причинно-следственных связей
- [x] `trend.js` — наложение кривых (энергия / стресс)
- [x] `zoom.js` — семантическое приближение (события / эпохи / декады)
- [x] `impact.js` — смещение карточек по оси значимости
- [x] `chroma.js` — хроматика эпох (насыщенность цвета)

### 1.5 Точка входа
- [x] `src/main.js` — импорт всех модулей, инициализация
- [x] `index.html` — упрощён до shell (только подключение main.js)

---

## Фаза 2 — Бэкенд (FastAPI + PostgreSQL)

### 2.1 Инфраструктура
- [x] `docker-compose.yml` — сервисы: postgres, api
- [x] PostgreSQL 16 (pgvector — при подключении AI)
- [x] Dockerfile для FastAPI
- [x] `.env.example` — переменные окружения (DB_PASSWORD, SECRET_KEY, CORS_ORIGINS)

### 2.2 Схема базы данных (Alembic миграции)
- [x] Таблица `events` — id, parent_id, type, date, title, body, impact (-5..+5), metrics (jsonb), tags[]
- [x] Таблица `audit_log` — Postgres-триггер на events (INSERT/UPDATE/DELETE)
- [x] Таблица `snapshots` — ежемесячные слепки (period_start, period_end, metrics_json)
- [x] Индексы: GIN на jsonb+tags, B-tree на type/date/impact
- [x] Recursive CTE — функция `get_event_chain(event_id)` → все потомки

### 2.3 Materialized Views
- [x] `mv_maslow_current` — агрегация по иерархии Маслоу
- [x] `mv_wheel_of_life` — агрегация для радар-графика
- [x] `mv_density` — плотность событий по годам
- [x] Стратегия обновления: `REFRESH MATERIALIZED VIEW CONCURRENTLY` по триггеру

### 2.4 FastAPI — структура
- [x] `app/main.py` — точка входа, CORS, middleware
- [x] `app/db.py` — SQLAlchemy 2.0 async + async_sessionmaker
- [x] `app/models/` — Event, AuditLog, Snapshot
- [x] `app/schemas/` — Pydantic v2: event, metrics, audit, snapshot
- [x] `app/api/v1/` — роутеры: events, metrics, audit, snapshots

### 2.5 REST API эндпоинты
- [x] `GET /api/v1/events` — список (фильтры: period, type, impact_min/max)
- [x] `POST /api/v1/events` — создать событие
- [x] `PUT /api/v1/events/{id}` — обновить
- [x] `DELETE /api/v1/events/{id}` — удалить (audit log сохраняет историю)
- [x] `GET /api/v1/events/{id}/chain` — цепочка через Recursive CTE
- [x] `GET /api/v1/metrics/maslow?period=6m`
- [x] `GET /api/v1/metrics/wheel?period=1y`
- [x] `GET /api/v1/metrics/density`
- [x] `GET /api/v1/metrics/all?period=all`
- [x] `GET /api/v1/snapshots` — история слепков
- [x] `POST /api/v1/snapshots` — создать слепок вручную
- [x] `GET /api/v1/audit/{event_id}` — история изменений события
- [ ] `POST /api/v1/search` — семантический поиск (pgvector — при подключении AI)

### 2.6 Фоновые задачи (ARQ Worker)
- [ ] ARQ + ежемесячный snapshot (при необходимости)
- [ ] Embeddings + корреляции (при подключении AI)

### 2.7 Надёжность
- [x] Pydantic v2 валидация: типы, диапазоны impact, паттерны строк
- [x] Audit Log — Postgres-триггер (не API-код)
- [x] Health check `GET /health`
- [x] `scripts/seed.py` — начальное наполнение БД из timeline.js
- [ ] Автобэкап: `pg_dump` → cron → зашифрованный архив

---

## Фаза 3 — Интеграция фронт + бэкенд

- [ ] Заменить статические данные в `events.js` на `fetch('/api/v1/events')`
- [ ] Заменить `periodDatasets` на `fetch('/api/v1/metrics/all?period=...')`
- [ ] Подключить поиск по таймлайну через `/api/v1/search`
- [ ] Реализовать создание/редактирование события через Drawer → POST/PUT
- [ ] Реализовать Undo через `/api/v1/audit/{id}` → восстановление из audit_log
- [ ] Оффлайн-режим: Service Worker + кеш последнего состояния

---

## Фаза 4 — Упаковка

### 4.1 Docker Compose (основной дистрибутив)
- [ ] Финальный `docker-compose.yml` — все сервисы (postgres, api, worker, nginx)
- [ ] nginx — раздаёт собранный Vite-фронт + проксирует `/api`
- [ ] `start.sh` / `stop.sh` — скрипты для удобного запуска
- [ ] `.desktop` файл — запуск из меню приложений Linux

### 4.2 Tauri (опционально — десктоп без браузера)
- [ ] Инициализация Tauri-оболочки вокруг localhost
- [ ] Иконка приложения
- [ ] Сборка `.AppImage` для Linux

### 4.3 Документация
- [ ] `README.md` — установка и запуск (`docker compose up`)
- [ ] `ARCHITECTURE.md` — схема компонентов

---

## Технический стек (финальный)

| Слой | Технология |
|---|---|
| Фронтенд | Vanilla JS + Vite |
| Стили | Чистый CSS (модули) |
| API | FastAPI + Pydantic v2 |
| ORM | SQLAlchemy 2.0 async + Alembic |
| БД | PostgreSQL 16 + pgvector |
| Очередь | ARQ (asyncio) |
| Контейнеры | Docker Compose |
| Веб-сервер | nginx (в Docker) |
| Десктоп | Tauri (опционально) |

---

_Обновляется по мере выполнения. Начало: апрель 2026._
