```mermaid
erDiagram
    USER ||--|| SETTINGS: contains
    USER ||--|{ ANIME_WATCHLIST: contains
    USER ||--|{ ANIME_REVIEW: contains
    USER ||--|{ ANIME_GROUPS: contains
    ANIME_GROUPS ||--|| ANIME_GROUP_ITEMS: contains

    USER {
        string id
        string username
        string email
        string password
         string status
        date created_at
        date updated_at
    }
    SETTINGS {
        string id
        string user_id
        string theme
        string created_at
        string updated_at
    }
    ANIME_WATCHLIST {
        string id
        string anime_id
        string user_id
        string status
        %% watching, completes, planned & dropped
        integer progress
        %% episode number
        boolean is_favorite
        date updated_at
    }
    ANIME_REVIEW {
        string id
        string anime_id
        string user_id
        integer rating
        text comment
        date created_at
        date updated_at
    }
    ANIME_GROUPS {
        string id
        string user_id
        varchar name
        date created_at
        date updated_at
    }
    ANIME_GROUP_ITEMS {
        string id
        string group_id
        string anime_id
        %% updates on this are recorded on anime group
    }
