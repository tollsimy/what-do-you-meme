import db from "../db/db.mjs";

export default function GamesDao() {

    this.getGames = async (username) => {
        return new Promise((resolve, reject) => {
            // Get all completed games played by user
            const sql = "SELECT * FROM games WHERE g_user = ? AND g_complete = 1 \
                ORDER BY g_id asc;";
            db.all(sql, [username], async (err, games) => {
                if (err) { reject(err); }
                else if (games === undefined) { resolve([]); }
                else {
                    if (games.length == 0) {
                        resolve([])
                    }
                    // format games
                    const formattedGames = await Promise.all(games.map(async (game) => {
                        // get rounds by game id
                        const rounds = await getRoundsByGameId(game.g_id);
                        // get caption from r_c_id
                        const captionsPromises = rounds.map((round) => getCaptionById(round.r_c_id));
                        const captions = await Promise.all(captionsPromises);
                        const newGame = {
                            game: game.g_id,
                            rounds: rounds.map((round, index) => {
                                const caption = captions.length > index ? captions[index] : null;
                                return {
                                    meme: round.r_meme,
                                    caption: caption,
                                    won: round.r_valid
                                };
                            })
                        };
                        return newGame;
                    }));
                    resolve(formattedGames);
                }
            });
        })
    }

    const getRoundsByGameId = (g_id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM rounds WHERE r_g_id = ? ORDER BY r_num asc;";
            db.all(sql, [g_id], (err, rounds) => {
                if (err) {
                    reject(err);
                } else if (rounds === undefined) {
                    resolve(false);
                } else if (rounds.length == 0) {
                    resolve(false);
                }
                resolve(rounds);
            })
        });
    }

    const getCaptionById = (c_id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM captions WHERE c_id = ?;";
            db.get(sql, [c_id], (err, caption) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(caption.caption);
                }
            });
        });
    }

    this.savePlay = (user, meme, c_id, valid) => {
        return new Promise((resolve, reject) => {
            // Get last game id for user
            const getMaxGameSql = 'SELECT MAX(g_id) AS max_game FROM games WHERE g_user = ?;';
            let curGameId;
            db.get(getMaxGameSql, [user], (err, row) => {
                if (err) {
                    return reject(err);
                }
                curGameId = row.max_game || 1;

                // Now find round index to insert play
                const getMaxRoundSql = 'SELECT MAX(r_num) AS max_round FROM rounds WHERE r_g_id = ?;';
                let nextRound;
                db.get(getMaxRoundSql, [curGameId], (err, round) => {
                    if (err) {
                        return reject(err);
                    }
                    if (round === undefined) {
                        nextRound = 1;
                    }
                    else {
                        nextRound = round.max_round + 1;
                    }
                    // Finally insert the new round
                    const insertRoundSql = `INSERT INTO rounds (r_g_id, r_meme, \
                        r_c_id, r_valid, r_num) VALUES (?, ?, ?, ?, ?);`;
                    db.run(insertRoundSql, [curGameId, meme, c_id, valid, nextRound], function (err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(true);
                    });
                    // If last round, mark game as completed
                    if (nextRound == 3) {
                        const completeGameSql = `UPDATE games SET g_complete = 1 WHERE g_id = ?;`;
                        db.run(completeGameSql, [curGameId], function (err) {
                            if (err) {
                                return reject(err);
                            }
                        });
                    }
                });
            });
        })
    }

    this.addGame = (user) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO games (g_user) VALUES (?);`;
            db.run(sql, [user], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
}