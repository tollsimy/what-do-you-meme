[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/AVMm0VzU)
# Exam #1: "Meme Game"
## Student: s333480 TOLLARDO SIMONE 

## React Client Application Routes

- Route `/`: main page (index), shows game exaplination, allows to redirect to play page and allows to redirect to login page
- Route `/login`: login page, allows users to log in using their credentials
- Route `/signup`: signup page, allows a user to create a new account
- Route `/profile`: user account page, shows username and total user score. Shows last three played games recap. Allows to navigate to user games history.
    - Route `/profile/games`: user games history page, allows user to see previous played games and navigate to a specific game page to see more details
    - Route `/profile/games/:game_id`: allows user to see memes, choosen captions and points scored for a previously played game
- Route `/play`: starting game page, allows user to start a new game
    - Route `/play/:round`: actual game page, allows user to play the game and navigate through rounds (only forward)
    - Route `/play/stats`: game stats page, shows stats about just played game, allows to redirect to main page or directly start a new game
- Route `*`: wildcard route used to display a "404 error not found" page whenever the user enters an invalid URL

## Main React Components

- `App` (in `/src/components/App.jsx`): Main component of the application, it contains the header and the footer of the page and the routing of the application.
- `AppHeader` (in `/src/components/AppHF.jsx`): Header of the page, the navigation bar with logo, links to login, signup, profile and home. It purpose is to show the navigation bar and the logo so the user can navigate through the website.
It is present in all pages.
- `AppFooter` (in `/src/components/AppHF.jsx`): Footer of the page, it shows the footer of the page with the name of the author and other information. It has not real functionality, it is just a footer.
It is present in all pages.
- `LoginPageLayout` (in `/src/components/LoginPageLayout.jsx`): Layout of the login page, it contains the login form and the link to the signup page. It purpose is to allows the user to login and, in case, to redirect to the signup page.
- `SignupPageLayout` (in `/src/components/LoginPageLyout.jsx`): Layout of the signup page, it contains the signup form and the link to the login page. It purpose is to allows the user to create a new account and, in case, to redirect to the login page.
- `MainPageLayout` (in `/src/components/MainPageLayout.jsx`): Layout of the main page, it contains the logo, the game explanation and a button that brings to the play page. On the right there is a global scoreboard. Main purpose is to present the game and allow the user to start a new game or to login/signup and open profile.
- `ProfilePageLayout` (in `/src/components/ProfilePageLayout.jsx`): Outlet for the profile page, it is just a container for the profile page.
- `ProfileIndexLayout` (in `/src/components/ProfilePageLayout.jsx`): Layout of the main profile page, it contains the user information (username and score) and the last three played games recap. A button allows to navigate to the games history page.
- `ProfileGamesLayout` (in `/src/components/ProfilePageLayout.jsx`): Layout of the games history page, it contains the list of all games played by the user. Each game is a link to the game page. Each game shows the game id, the score of each round, the meme of each round and the total score of the game.
A button allows to return to the profile page.
- `ProfileGamesDetailLayout` (in `/src/components/ProfilePageLayout.jsx`): Layout of a single game page, it contains the game id, the score of each round, the meme of each round with the choosen caption, and the total score of the game. It also contains a button to return to the games history page.
- `PlayPageLayout` (in `/src/components/PlayPageLayout.jsx`): Outlet for the play page, it is just a container for the play page.
- `PlayIndexLayout` (in `/src/components/PlayPageLayout.jsx`): Layout of the starting game page, it contains a button to start a new game and how to play the game.
- `PlayRoundLayout` (in `/src/components/PlayPageLayout.jsx`): Layout of the actual game page, it contains the meme and 7 captions (2 correct and 5 wrong). It allows the user to select a caption and submit it. It shows the timer with the remaining time and a progressbar that shows the game progress (how many rounds are left).
- `PlayStatsLayout` (in `/src/components/PlayPageLayout.jsx`): Layout of the game stats page, it contains the memes correctly matched with the captions, the correctly choosen caption and the total score of the game. It also contains a button to return to the main page and another to start a new game.
- `PageNotFoundLayout` (in `/src/components/PageNotFoundLayout.jsx`): Layout of the 404 error page, it contains a message that says that the page is not found and a button that brings to the main page. A timeout of 5 seconds automatically redirects to the main page.
- `GameProvider` & `GameContext` (in `/src/contexts/gameContext.jsx`): Context provider and context for the game state. It contains the game state and the rounds played. It allows to share the game state between the components that needs it without passing it through props.
- `UserProvider` & `UserContext` (in `/src/contexts/userContext.jsx`): Context provider and context for the user state. It contains the user information and the games history of the user. It allows to share the user state between the components that needs it without passing it through props.
- `API.mjs` (in `/src/API.mjs`): Module that contains the API calls to the server. It allows to make requests to the server and to get the response. It is used by the components that needs to make requests to the server.
- `/public/images/memes`: folder that contains the memes images used in the game.
- `/public/images/site-images`: folder that contains the images used in the site (logo, 404 error image, etc).
- `/public/mp3`: folder that contains the audio files used in the game.
- `App.css` (in `/src/App.css`): CSS file that contains the global styles of the application.

## API Server

### Session APIs
Note: all generic server errors are omitted for brevity and they will be reported as status code 500/503.

- POST `/api/v1/sessions`: Create a new authentication session (login)
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

- GET `/api/v1/sessions/current`: Retrieve the currently authenticated user
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

- DELETE `/api/v1/sessions/current`: Delete the current authentication session (logout)
    - request parameters: none
    - request body content: none
    - response body content: none
    - Access Constraints: can be called only by a logged user
    - response status codes:
        - 200 if successful
        - 401 if user is not authenticated

### User APIs
- POST `/api/v1/users`: Add a new user
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

- GET `/api/v1/users/scoreboard`: Get the scoreboard of all users (user, score) ordered by score in descending order
    - request parameters: none
    - request body content: none
    - response body content: (if successful):
    ```json
    [
        {
            "username": "<username>",
            "score": <score>
        },
        ...
    ]
    ```
    - Access Constraints: None
    - response status codes:
        - 200 if successful

- PATCH `/api/v1/users/current`: Change the password of the currently logged user
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

- GET `/api/v1/users/current/games`: Get all games played by the current user
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
                    "won": <0 / 1>,
                },
                {
                    "meme": "<meme_filename>",
                    "caption": "<caption>",
                    "won": <0 / 1>,
                },
                {
                    "meme": "<meme_filename>",
                    "caption": "<caption>",
                    "won": <0 / 1>,
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
- GET `/api/v1/game`: Get one meme along with captions if user is anonymous, get three if user is logged in. Captions generated are 7, 2 of them are correct while 5 are wrong.
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
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
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
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        },
                {
            "meme": "<meme_filename>",
            "captions":
            [
                {   
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        },
                {
            "meme": "<meme_filename>",
            "captions":
            [
                {   
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
                {
                    "c_id": <caption_id>,
                    "caption": "<caption>"
                },
            ]
        }
    ]
    ```
    - Access Constraints: none
    - response status codes:
        - 200 if successful

- POST `/api/v1/game`: Send answer for a round and get answers back.
    - request parameters: none
    - request body content:
    ```json
    {
        "meme": "<meme_filename>",
        "c_id": <caption_id / null>,
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
        "won": <0 / 1>,
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
- **rounds**

### Table `users`
columns:
- **username** TEXT PRIMARY KEY         -> contains the username of the user
- **salt** TEXT NOT NULL                -> contains the salt used to hash the password
- **password** TEXT NOT NULL            -> contains the hashed password
- **score** INTEGER NOT NULL DEFAULT 0  -> contains the score of the user

### Table `memes`
- **filename** TEXT PRIMARY KEY -> contains the filename of the meme

### Table `captions`
- **c_id** INTEGER NOT NULL AUTOINCREMENT   -> contains the id of the caption
- **caption** TEXT NOT NULL                 -> contains the text of caption

### Table `games`
columns:
- **g_id** INTEGER PRIMARY KEY AUTOINCREMENT                    -> contains the id of the game
- **g_user** TEXT FOREIGN KEY                                   -> contains the username of the user that played the game
- **g_complete** INTEGER NOT NULL CHECK (g_complete IN (0, 1)) DEFAULT 0 -> contains the value of the game (0 = not completed, 1 = completed)

### Table `rounds`
columns:
- **r_id** INTEGER PRIMARY KEY AUTOINCREMENT -> contains the id of the round
- **r_g_id** INTEGER FOREIGN KEY NOT NULL    -> contains the id of the game
- **r_meme** TEXT FOREIGN KEY NOT NULL       -> contains the filename of the meme
- **r_c_id** INTEGER FOREIGN KEY             -> contains the id of the caption
- **r_valid** INTEGER NOT NULL CHECK (r_valid IN (0, 1)) -> contains the value of the round (0 = lost, 1 = won)
- **r_num** INTEGER NOT NULL CHECK (r_num IN (1, 2, 3)) -> contains the number of the round

### Table `memes_captions`
columns:
- **mc_meme** INTEGER FOREIGN KEY PRIMARY KEY -> contains the filename of the meme
- **mc_c_id** INTEGER FOREIGN KEY PRIMARY KEY -> contains the id of the caption

## SQL Create Table Query
```sql
CREATE TABLE users (
    username TEXT PRIMARY KEY,
    salt TEXT NOT NULL,
    password TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0
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
    g_user TEXT NOT NULL,
    g_complete INTEGER NOT NULL CHECK (g_complete IN (0, 1)),
    PRIMARY KEY (g_id),
    FOREIGN KEY (g_user) REFERENCES users(username)
);

CREATE TABLE rounds (
    r_id INTEGER PRIMARY KEY AUTOINCREMENT,
    r_g_id INTEGER NOT NULL,
    r_meme TEXT NOT NULL,
    r_c_id INTEGER,
    r_valid INTEGER NOT NULL CHECK (r_valid IN (0, 1)) DEFAULT 0,
    r_num INTEGER NOT NULL CHECK (r_num IN (1, 2, 3)),
    FOREIGN KEY (r_g_id) REFERENCES games(g_id),
    FOREIGN KEY (r_meme) REFERENCES memes(filename),
    FOREIGN KEY (r_c_id) REFERENCES captions(c_id)
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

Home Page:
![home page](/assets/home.png)

Starting game page:
![starting game page](/assets/starting.png)

Game page:
![game page](/assets/game.png)

Game stats page:
![game stats page](/assets/stats.png)

Profile page:
![profile page](/assets/profile.png)

Games history page:
![games history page](/assets/games.png)

Game details page:
![game details page](/assets/game_details.png)


## Users Credentials

- **username**: tollsimy, **password**: tollsimy
- **username**: player1, **password**: password1
- **username**: player2, **password**: password2

