import db from "../db/db.mjs";

export default function GamesDao() {

    this.getGames = async (username) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM games WHERE g_user = ? \
                ORDER BY g_id AND g_round asc;";
            db.all(sql, [username], async (err, rows) => {
                if (err) { reject(err); }
                else if (rows === undefined) { resolve(false); }
                else {
                    if (rows.length == 0) {
                        resolve([])
                    }
                    let games_id = new Set();
                    let games = [];
                    // get all games_id
                    for (const row of rows) {
                        games_id.add(row.g_id);
                    }
                    // for each game
                    for (const id of games_id) {
                        // Create rounds array using only rounds with g_id = id
                        // NOTE: since map use an async callback it returns an array of promises
                        // thus, we need to resolve all, we can do this using Promise.all
                        let rounds = await Promise.all(rows
                            .filter((row) => row.g_id == id) // remove rounds with g_id != id
                            .map(async (row) => {            // for each round
                                // Get caption from caption_id
                                const sql = "SELECT * FROM captions WHERE c_id = ?;";
                                let caption = await new Promise((resolve, reject) => {
                                    db.get(sql, [row.g_c_id], (err, rowCaption) => {
                                        if (err) { reject(err); }
                                        else if (rowCaption === undefined) { resolve(false); }
                                        else {
                                            resolve(rowCaption.caption);
                                        }
                                    });
                                });
                                // Finally create and return round object
                                return {
                                    meme: row.g_meme,
                                    caption: caption,
                                    won: row.valid,
                                    date: row.g_date,
                                }
                            }));
                        // Create game containing all rounds
                        const game = {
                            game: id,
                            rounds: rounds,
                        }
                        // Add game to games array
                        games.push(game);
                    }
                    resolve(games);
                }
            });
        })
    }

    this.saveGame = (user, meme, c_id, valid, date) => {
        return new Promise((resolve, reject) => {
            // Get next game id for user (same as max game id if round = 1 or 2, if round = 3, then max game id + 1)
            const getMaxGameSql = 'SELECT MAX(g_id) AS max_game FROM games WHERE g_user = ?;';
            let nextGame;          
            db.get(getMaxGameSql, [user], (err, row) => {
                if (err) {
                    return reject(err);
                }
                nextGame = row.max_game || 1;

                // Now find the next round (if round = 3, then next round = 1, else next round = round + 1)
                const getMaxRoundSql = 'SELECT MAX(g_round) AS max_round FROM games WHERE g_id = ?;';
                let nextRound;
                db.get(getMaxRoundSql, [nextGame], (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    if (row.max_round == 3) {
                        nextRound = 1;
                        nextGame += 1;
                    } else {
                        nextRound = row.max_round + 1;
                    }

                    // Finally insert the new row
                    const insertRoundSql = `INSERT INTO games (g_id, g_round, g_user, g_meme, g_c_id, valid, g_date)
                                            VALUES (?, ?, ?, ?, ?, ?, ?);`;
                    
                    db.run(insertRoundSql, [nextGame, nextRound, user, meme, c_id, valid, date], function(err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(true);
                    });
                });
            });
        })
    }
}