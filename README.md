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

- POST `/api/something`: purpose
  - request parameters and request body content
  - response body content
  - response status codes and possible errors
- GET `/api/something`: purpose
  - request parameters
  - response body content
  - response status codes and possible errors
- PUT `/api/something`: purpose
  - request parameters and request body content
  - response body content
  - response status codes and possible errors
- ...

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

