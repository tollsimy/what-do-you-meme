import db from "../db/db.mjs";

export default function CaptionsDao() {

    this.getNWrongCaptions = (meme, num) => {
        return new Promise((resolve, reject) => {
            // find all rows with target meme, get caption_id
            // find all rows that DOES NOT HAVE that caption_id
            // return caption with that caption_id
            const sql = 'SELECT * FROM captions WHERE c_id IN \
                (SELECT mc_c_id FROM memes_captions \
                    WHERE mc_c_id NOT IN \
                        (SELECT mc_c_id FROM memes_captions WHERE mc_meme = ?) \
                    ORDER BY RANDOM() LIMIT ? \
                );'
            db.all(sql, [meme, num], (err, rows) => {
                if (err) { reject(err); }
                else if (rows === undefined) { resolve(false); }
                else {
                    resolve(rows);
                }
            });
        });
    };

    this.getNRightCaptions = (meme, num) => {
        return new Promise((resolve, reject) => {
            // find all rows with target meme, get caption_id
            // return all rows that DOES HAVE that caption_id
            // return caption with that caption_id
            const sql = 'SELECT * FROM captions WHERE c_id IN \
                (SELECT mc_c_id FROM memes_captions \
                    WHERE mc_c_id IN \
                        (SELECT mc_c_id FROM memes_captions WHERE mc_meme = ?) \
                    ORDER BY RANDOM() LIMIT ? \
                );'
            db.all(sql, [meme, num], (err, rows) => {
                if (err) { reject(err); }
                else if (rows === undefined) { resolve(false); }
                else {
                    resolve(rows);
                }
            });
        });
    };

    this.getAnswers = (meme) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT mc_c_id FROM memes_captions WHERE mc_meme = ?';
            db.all(sql, [meme], (err, rows) => {
                if (err) { reject(err); }
                else if (rows === undefined) { resolve(false); }
                else {
                    const answers = rows.map((row) => row.mc_c_id);
                    resolve(answers);
                }
            });
        })
    }
}