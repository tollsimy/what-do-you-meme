import MemesDao from '../dao/memesDao.mjs';
import CaptionsDao from '../dao/captionsDao.mjs';
import GamesDao from '../dao/gamesDao.mjs';

export default function GameController() {

    const memesDao = new MemesDao();
    const captionsDao = new CaptionsDao();
    const gamesDao = new GamesDao();

    this.getNMemesWithCaptions = async (num) => {
        try {
            const memes = await memesDao.getNRandomMemes(num);
            let memes_captions = [];
            for (const meme of memes) {
                const rc = await captionsDao.getNRightCaptions(meme, 2);
                const wc = await captionsDao.getNWrongCaptions(meme, 5);
                // Combine captions
                const captions = [...rc, ...wc];
                // Shuffle
                captions.forEach((val, index, array) => {
                    const pos = Math.round(Math.random() * (array.length -1));
                    array[index] = array[pos];
                    array[pos] = val;
                });
                memes_captions.push({ meme: meme, captions: captions } );
            }
            return memes_captions;
        } catch(err) {
            throw err;
        }
    }

    this.saveGame = async (user, meme, c_id, valid) => {
        try {
            return await gamesDao.saveGame(user, meme, c_id, valid, new Date());
        } catch(err) {
            throw err;
        }
    }

    this.getGames = async (username) => {
        try {
            const games = await gamesDao.getGames(username);
            return games;
        } catch(err) {
            throw err;
        }
    }

    this.checkAnswer = async (meme, caption_id, captions) => {
        let res = false;
        let corr_answers = [];
        const answers = await captionsDao.getAnswers(meme);
        for (const answer of answers) {
            if (answer == caption_id) {
                res = true;
            }
            if (captions.includes(answer)) {
                corr_answers.push(answer);
            }
        }
        if (corr_answers.length != 2) {
            throw new Error('Error: Correct answers not found');
        }
        return {val: res, answer1: corr_answers[0], answer2: corr_answers[1]};
    }
}