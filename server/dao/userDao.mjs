import db from "../db/db.mjs";
import crypto from "crypto"

export default function UserDao() {

    this.getUser = (username, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username=?';
            db.get(sql, [username], (err, row) => {
                if (err) { reject(err); }
                else if (row === undefined) { resolve(false); }
                else {
                    const user = { username: row.username };
                    crypto.scrypt(password, row.salt, 32, (err, hashedPassword) => {
                        if (err) reject(err);
                        if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword)) {
                            resolve(false);
                        }
                        else {
                            resolve(user);
                        }
                    });
                }
            });
        });
    };

    this.getUserInfo = (username) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username=?';
            db.get(sql, [username], (err, row) => {
                if (err) { reject(err); }
                else if (row === undefined) { resolve(false); }
                else {
                    // TODO: add other data here when implemented
                    const user = { username: row.username, score: row.score };
                    resolve(user);
                }
            });
        });
    }

    this.createUser = (username, password) => {
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(8).toString('hex');
            crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                if (err) reject(err);
                const hash = hashedPassword.toString('hex');
                const sql = 'INSERT INTO users (username, password, salt) VALUES (?, ?, ?)';
                db.run(sql, [username, hash, salt], (err) => {
                    if(err){
                        if (err.message.includes("SQLITE_CONSTRAINT")) { reject("Error: Username already existing"); }
                        else { reject(err); }
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    };

    this.updateUserPassword = (username, password) => {
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(8).toString('hex');
            crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                if (err) reject(err);
                const hash = hashedPassword.toString('hex');
                const sql = 'UPDATE users SET password = ?, salt = ? WHERE username = ?';
                db.run(sql, [hash, salt, username], (err) => {
                    if(err){
                        reject(err);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    };

    this.getScoreboard = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT username, score FROM users ORDER BY score DESC';
            db.all(sql, [], (err, rows) => {
                if (err) { reject(err); }
                else {
                    const scoreboard = rows.map((row) => ({ username: row.username, score: row.score }));
                    resolve(scoreboard);
                }
            });
        });
    }
}
