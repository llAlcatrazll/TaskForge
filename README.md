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

