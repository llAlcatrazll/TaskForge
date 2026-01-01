# TaskForge

TaskForge is a modular productivity and tracking application built with **React**, **TypeScript**, **Supabase**, and **PostgreSQL**, combining personal utilities with an **anime tracking system powered by AniList GraphQL**.

The app is designed to be fast, extensible, and desktop-ready (Electron-compatible), with a strong focus on UI/UX, performance, and data integrity.

---

## ✨ Features

### 🎌 Anime Watchlist Module
- Trending, Featured, and Random anime discovery
- Detailed anime pages (description, staff, format, duration, dates)
- AniList GraphQL integration
- Embla-powered featured carousel
- Client-side caching for instant navigation

### 🧠 Other Productivity Modules

- 📝 To-do List
- 💰 Money Tracker
- 🎮 Steam Tracker
- 📚 Manhwa Tracker
- ⏱️ App Timeout
- 🖼️ Background Remover
- 💻 Code Snippets
- 🕒 PC Uptime Tracker
- 📊 PC App Usage Tracker
- 🧹 Storage Discoverer / Cleaner / Transfer
- 🔔 Daily Reminder
- 🎯 Work Focus Mode
- 🤖 Auto-Cleanup Suggestions
- 💳 Subscription Manager
- 🔐 File Vault
- 🌐 Universal App Notification Collection
- 👥 Universal App Presence Detector (Friends Online / Offline)
- 📋-  Clipboard Manager
- 🚀 Quick Home Launcher
- 🧩 Custom Desktop Widgets
- 🐙 GitHub Tracker

### 🔐 Authentication
- Supabase Auth (email/password)
- Secure session handling
- Extended user profile stored in PostgreSQL

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Embla Carousel
- TanStack Query (React Query)
- React Router

### Backend
- Node.js
- Express
- AniList GraphQL API
- Supabase (PostgreSQL + Auth)

---

## ⚡ Performance & Caching

- Anime data is cached using **TanStack Query**
- Trending & Featured lists use time-based invalidation
- Random anime is cached per session to prevent unnecessary refetching
- Navigating away and back to pages does not trigger reloads

---

```mermaid
erDiagram
    %% ======================
    %% USER & SETTINGS
    %% ======================
    USER ||--|| SETTINGS : has

    %% ======================
    %% ANIME MODULE
    %% ======================
    USER ||--|{ ANIME_WATCHLIST : contains
    USER ||--|{ ANIME_REVIEW : writes
    USER ||--|{ ANIME_GROUPS : creates
    ANIME_GROUPS ||--|{ ANIME_GROUP_ITEMS : contains

    %% ======================
    %% FINANCE MODULE
    %% ======================
    USER ||--|{ ACCOUNT : owns
    USER ||--|{ INCOME : earns
    USER ||--|{ EXPENSE : logs
    USER ||--|{ RECURRING_EXPENSE : schedules
    USER ||--|{ EXPENSE_CATEGORY : defines

    ACCOUNT ||--|{ INCOME : receives
    ACCOUNT ||--|{ EXPENSE : pays
    ACCOUNT ||--|{ RECURRING_EXPENSE : schedules

    EXPENSE ||--|{ EXPENSE_CATEGORY_ITEMS : tagged_with
    EXPENSE_CATEGORY ||--|{ EXPENSE_CATEGORY_ITEMS : categorizes

    RECURRING_EXPENSE ||--|{ RECURRING_EXPENSE_CATEGORY_ITEMS : tagged_with
    EXPENSE_CATEGORY ||--|{ RECURRING_EXPENSE_CATEGORY_ITEMS : categorizes


    %% ======================
    %% TABLE DEFINITIONS
    %% ======================

    USER {
        string id PK
        string username
        string email
        string password_hash
        string status
        date created_at
        date updated_at
    }

    SETTINGS {
        string id PK
        string user_id FK
        string theme
        date created_at
        date updated_at
    }

    ACCOUNT {
        string id PK
        string user_id FK
        string account_name
        integer income_total
        string currency
    }

    INCOME {
        string id PK
        string user_id FK
        string account_id FK
        integer amount
        string source
        date date_added
    }

    EXPENSE {
        string id PK
        string user_id FK
        string account_id FK
        integer amount
        string notes
        date expense_date
        date created_at
    }

    RECURRING_EXPENSE {
        string id PK
        string user_id FK
        string account_id FK
        integer amount
        string notes
        string frequency
        date start_date
        date next_run_date
        boolean is_active
    }

    EXPENSE_CATEGORY {
        string id PK
        string user_id FK
        string name
    }

    EXPENSE_CATEGORY_ITEMS {
        string expense_id FK
        string category_id FK
    }

    RECURRING_EXPENSE_CATEGORY_ITEMS {
        string recurring_expense_id FK
        string category_id FK
    }

    ANIME_WATCHLIST {
        string id PK
        string anime_id
        string user_id FK
        string status
        integer progress
        boolean is_favorite
        date updated_at
    }

    ANIME_REVIEW {
        string id PK
        string anime_id
        string user_id FK
        integer rating
        text comment
        date created_at
        date updated_at
    }

    ANIME_GROUPS {
        string id PK
        string user_id FK
        string name
        date created_at
        date updated_at
    }

    ANIME_GROUP_ITEMS {
        string group_id FK
        string anime_id
    }

