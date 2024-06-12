[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/AVMm0VzU)
# Exam #1: "Meme Game"
## Student: s333480 TOLLARDO SIMONE 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...


## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)


## API Server

### Session APIs

- POST `/api/sessions`: Create a new authentication session (login)
    - request parameters: none
    - request body content: 
    ```json
    {
        "username": "<username>",
        "password": "<password>"
    }
    ```
    - response body content: (if successful):
    ```json
    {
        "username": "<username>"
    }
    ```
    - Access Constraints: None
    - response status codes:
        - 200 if successful
        - 401 if credentials wrong
        - 422 if the request body is not well-formed

- GET `/api/sessions/current`: Retrieve the currently authenticated user
    - request parameters: none
    - request body content: none
    - response body content: (if successful):
    ```json
    {
        "username": "<username>"
    }
    ```
    - Access Constraints: can be called only by a logged user
    - response status codes:
        - 200 if successful
        - 401 if user is not authenticated

- DELETE `/api/sessions/current`: Delete the current authentication session (logout)
    - request parameters: none
    - request body content: none
    - response body content: none
    - Access Constraints: can be called only by a logged user
    - response status codes:
        - 200 if successful
        - 401 if user is not authenticated

### User APIs
- POST `/api/users`: Add a new user
    - request parameters: none
    - request body content: 
    ```json
    {
        "username": "<username>",
        "password": "<password>"
    }
    ```
    - response body content: (if successful):
    ```json
    {
        "username": "<username>"
    }
    ```
    - Access Constraints: None
    - response status codes:
        - 201 if the user is created
        - 409 if the username already exists
        - 422 if the request body is not well-formed

- PATCH `/api/users/current`: Change the password of the currently logged user
    - request parameters: none
    - request body content:
    ```json
    {
        "password": "<newPassword>"
    }
    ```
    - response body content (if successful):
    ```json
    { "message": "password updated" }
    ```
    - Access Constraints: can be called only by a logged user
    - response status codes:
        - 200 if successful
        - 422 if the request body is not well-formed
        - 401 if user is not authenticated

- GET `/api/users/current/games`: Get all games played by the current user
    - request parameters: none
    - request body content: none
    - response body content: (if successful):
    ```json
    [
        {
            "game": <game_id>,
            "rounds": 
            [
                {
                    "meme": "<meme_filename>",
                    "caption": "<caption>",
                    "won": <true / false>,
                    "date: "<date>",
                },
                {
                    "meme": "<meme_filename>",
                    "caption": "<caption>",
                    "won": <true / false>,
                    "date: "<date>",
                },
                {
                    "meme": "<meme_filename>",
                    "caption": "<caption>",
                    "won": <true / false>,
                    "date: "<date>",
                },
            ],
        },
        ...
    ]
    ```
    - Access Constraints: can be called only by a logged user
    - response status codes:
        - 200 if successful
        - 401 if user is not authenticated

### Games APIs
- GET `/api/game`: Get one meme along with captions if user is anonymous, get three if user is logged in. Captions generated are 7, 2 of them are correct while 5 are wrong.
    - request parameters: none
    - request body content: none
    - response body content for anonymous users: (if successful):
    ```json
    [
        {
            "meme": "<meme_filename>",
            "captions":
            [
                {   
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        }
    ]
    ```
    - response body content for logged users: (if successful):
    ```json
    [
        {
            "meme": "<meme_filename>",
            "captions":
            [
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        },
        {
            "meme": "<meme_filename>",
            "captions":
            [
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        },
        {
            "meme": "<meme_filename>",
            "captions":
            [
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "caption_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        }
    ]
    ```
    - Access Constraints: none
    - response status codes:
        - 200 if successful

- POST `/api/game`: Send answer for a round. If the user is logged the round will be recorded.
    - request parameters: none
    - request body content:
    ```json
    {
        "meme": "<meme_filename>",
        "caption_id": <caption_id>,
        "captions":
        [
            <caption_id>,
            <caption_id>,
            <caption_id>,
            <caption_id>,
            <caption_id>,
            <caption_id>,
            <caption_id>
        ]
    }
    ```
    - response body content: (if successful):
    ```json
    {
        "won": <true / false>,
        "caption1": "<correct_caption>",
        "caption2": "<correct_caption>",
    }
    ```
    - Access Constraints: none
    - response status codes:
        - 200 if successful

## Database Tables

Tables:
- **users**
- **memes**
- **captions**
- **games**
- **memes_captions**

### Table `users`
columns:
- **username** TEXT PRIMARY KEY -> contains the username of the user
- **salt** TEXT NOT NULL        -> contains the salt used to hash the password
- **password** TEXT NOT NULL    -> contains the hashed password

### Table `memes`
- **filename** TEXT PRIMARY KEY -> contains the filename of the meme

### Table `captions`
- **c_id** INTEGER NOT NULL AUTOINCREMENT   -> contains the id of the caption
- **caption** TEXT NOT NULL                 -> contains the text of caption

### Table `games`
columns:
- **g_id** INTEGER PRIMARY KEY AUTOINCREMENT                    -> contains the id of the game
- **g_round** INTEGER PRIMARY KEY CHECK (g_round IN (1, 2, 3))  -> contains the round of the game (1,2,3)
- **g_user** TEXT FOREIGN KEY                                   -> contains the username of the user
- **g_meme** TEXT FOREIGN KEY                                   -> contains the filename of the meme
- **g_c_id** INTEGER FOREIGN KEY                                -> contains the id of the caption
- **valid** INTEGER NOT NULL CHECK (valid IN (0, 1))            -> contains the value of the game (0 = lost, 1 = won)
- **g_date** TEXT NOT NULL                                      -> contains the timestamp of the game

### Table `memes_captions`
columns:
- **mc_meme** INTEGER FOREIGN KEY PRIMARY KEY -> contains the filename of the meme
- **mc_c_id** INTEGER FOREIGN KEY PRIMARY KEY -> contains the id of the caption

## SQL Create Table Query
```sql
CREATE TABLE users (
    username TEXT PRIMARY KEY,
    salt TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE memes (
    filename TEXT PRIMARY KEY
);

CREATE TABLE captions (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    caption TEXT NOT NULL
);

CREATE TABLE games (
    g_id INTEGER NOT NULL,
    g_round INTEGER NOT NULL CHECK (g_round IN (1, 2, 3)),
    g_user TEXT NOT NULL,
    g_meme TEXT NOT NULL,
    g_c_id INTEGER NOT NULL,
    valid INTEGER NOT NULL CHECK (valid IN (0, 1)),
    g_date TEXT NOT NULL,
    PRIMARY KEY (g_id, g_round),
    FOREIGN KEY (g_user) REFERENCES users(username),
    FOREIGN KEY (g_meme) REFERENCES memes(filename),
    FOREIGN KEY (g_c_id) REFERENCES captions(c_id)
);

CREATE TABLE memes_captions (
    mc_meme TEXT NOT NULL,
    mc_c_id INTEGER NOT NULL,
    PRIMARY KEY (mc_meme, mc_c_id),
    FOREIGN KEY (mc_meme) REFERENCES memes(filename),
    FOREIGN KEY (mc_c_id) REFERENCES captions(c_id)
);
```


## Screenshots

![Screenshot1](./img/screenshot.jpg)

![Screenshot2](./img/screenshot.jpg)


## Users Credentials

- **username**: player1, **password**: password1
- **username**: player2, **password**: password2

