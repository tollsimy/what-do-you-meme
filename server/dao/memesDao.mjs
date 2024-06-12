import db from "../db/db.mjs";

export default function MemesDao() {

    this.getNRandomMemes = (num) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM memes ORDER BY RANDOM() LIMIT ?;';
            db.all(sql, [num], (err, rows) => {
                if (err) { reject(err); }
                else if (rows === undefined) { resolve(false); }
                else {
                    resolve(rows.map((row) => row.filename));
                }
            });
        });
    };
}