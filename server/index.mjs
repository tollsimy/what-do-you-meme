/*** Importing modules ***/
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { body, check, validationResult } from 'express-validator';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import UserController from './controller/userController.mjs';
import GameController from './controller/gameController.mjs';

const gameController = new GameController();
const userController = new UserController();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
    origin: 'http://localhost:5173/api',
    credentials: true,
};
app.use(cors(corsOptions));

// enable sessions in Express
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));

// Register default error handler
app.use((err, req, res, next) => {
    return res.status(503).json({
        error: "Internal Server Error",
        status: 503
    });
})

/* ====== Passport ====== */

passport.use(new LocalStrategy(function verify(username, password, callback) {
    userController.getUser(username, password)
        .then((user) => {
            if (!user) {
                // If credentials wrong, 401 error
                return callback(null, false, { message: 'Incorrect username and/or password.' });
            }
            // If credentials correct
            return callback(null, user);
        });
}));

// init Passport to use sessions
app.use(passport.authenticate('session'));

passport.serializeUser((user, done) => {
    done(null, {
        username: user.username,
    });
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

/* ====== Validation ====== */

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    else {
        next();
    }
}

/* ====== Helpers ====== */

const isLoggedIn = (req, res, next) => {
    // passport isAuthenticated
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: "Not authenticated" });
}

/* ====== APIs ====== */
/* ====== Session APIs ====== */

/** 
 * POST /v1/sessions
 * Body: username, password
 * Response:    200 if success
 *              401 if credentials wrong
 * 
 * Description: Login with username and password
 * 
 **/
app.post('/v1/sessions',
    body("username").isString(),
    body("password").isString(),
    validateRequest,
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            // Username / Password incorrect
            if (!user) { res.status(501).json(info) }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                else next();
            });
        })(req, res, next); // Immediately Invoked Function Expression (IIFE)
    },
    (req, res) => {
        // 200 with username if success
        res.json(req.user.username);
    }
);

/**
 * GET /v1/sessions/current
 * Response:    200 with username if authenticated
 *              401 if not authenticated
 * 
 * Description: Get current session username
 * 
 **/
app.get('/v1/sessions/current',
    validateRequest,
    isLoggedIn,
    (req, res) => {
        // Return 200 with username if success
        res.json(req.user.username);
    }
);

/**
 * DELETE /v1/sessions/current
 * Response:    200 if success
 *              401 if not authenticated
 * 
 * Description: Logout current session
 * 
 **/
app.delete('/v1/sessions/current',
    validateRequest,
    isLoggedIn,
    (req, res) => {
        // passport logout
        req.logOut(() => {
            res.end();
        });
    }
);

/* ====== User APIs ====== */

/**
 * POST /v1/users
 * Body: username, password
 * Response:    200 with username if success
 *              409 if username already existing
 *              422 if validation error
 * 
 * Description: Create a new user
 * 
 **/
app.post('/v1/users',
    body("username").isString(),
    body("password").isString(),
    validateRequest,
    (req, res, next) => {
        userController.createUser(req.body.username, req.body.password)
            .then((val) => {
                if (val) {
                    res.json({ username: req.body.username });
                }
                else {
                    next(new Error());
                }
            })
            .catch((err) => {
                res.status(409).json({ error: "Username already existing" });
            });
    }
);

/**
 * PATCH /v1/users/current
 * Body: password
 * Response:    200 if success
 *              401 if not authenticated
 *              422 if validation error
 *  
 * Description: Update current user password
 * 
 **/
app.patch('/v1/users/current',
    body("password").isString(),
    validateRequest,
    isLoggedIn,
    (req, res, next) => {
        userController.updateUserPassword(req.user.username, req.body.password)
            .then((val) => {
                if (val) { res.json({ message: "password updated" }) }
                else { next(new Error()); }
            })
            .catch((err) => {
                next(err);
            });
    }
);

/**
 * GET /v1/users/current/games
 * Response:    200 with games if success
 *              401 if not authenticated
 * 
 * Description: Get all games played by current user
 * 
 **/
app.get('/v1/users/current/games',
    validateRequest,
    isLoggedIn,
    (req, res, next) => {
        gameController.getGames(req.user.username)
            .then((val) => {
                res.json(val);
            })
            .catch((err) => {
                next(err);
            });
    }
);

/* ====== Games APIs ====== */

/**
 * GET /v1/game
 * Response:    200 with memes and captions if success
 *              401 if not authenticated
 * 
 * Description: Get all material needed to play a game (memes and captions)
 *              If authenticated, return 3 memes with 2 right and 5 wrong captions
 *              If not authenticated, return 1 meme with 2 right and 5 wrong captions
 * 
 **/
app.get('/v1/game',
    validateRequest,
    (req, res, next) => {
        if (req.isAuthenticated()) {
            gameController.getNMemesWithCaptions(3)
                .then((val) => {
                    res.json(val);
                })
                .catch((err) => {
                    next(err);
                });
        }
        else {
            gameController.getNMemesWithCaptions(1)
                .then((val) => {
                    res.json(val);
                })
                .catch((err) => {
                    next(err);
                });
        }
    }
);

/**
 * POST /v1/game
 * Body: meme, caption_id, captions
 * Response:    200 with won if success
 *              401 if not authenticated
 * 
 * Description: Send chosen caption for a meme and return result
 *              If authenticated save the play
 *              If not authenticated check answer only
 * 
 **/
app.post('/v1/game',
    body("meme").isString(),
    body("caption_id").isInt(),
    body("captions").isArray(),
    validateRequest,
    (req, res, next) => {
        gameController.checkAnswer(req.body.meme, req.body.caption_id, req.body.captions)
            .then(({val, answer1, answer2}) => {
                // If authenticated save play
                if (req.isAuthenticated()) {
                    gameController.saveGame(req.user.username, req.body.meme, req.body.caption_id, val)
                        .then((_) => {
                            res.json({ won: val, caption1: answer1, caption2: answer2 });
                        })
                        .catch((err) => {
                            next(err);
                        });
                } else {
                    res.json({ won: val, caption1: answer1, caption2: answer2});
                }
            })
            .catch((err) => {
                next(err);
            });
    }
);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));