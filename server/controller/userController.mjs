import UserDao from '../dao/userDao.mjs';

export default function UserController() {

    const userDao = new UserDao();

    this.getUser = async (username, password) => {
        try {
            const user = await userDao.getUser(username, password);
            return user;
        } catch(err) {
            throw err;
        }
    }

    this.getUserInfo = async (username) => {
        try {
            const user = await userDao.getUserInfo(username);
            return user;
        } catch(err) {
            throw err;
        }
    }

    this.createUser = async (username, password) => {
        try {
            const user = await userDao.createUser(username, password);
            return user;
        } catch(err) {
            throw err;
        }
    }

    this.updateUserPassword = async (username, password) => {
        try {
            const user = await userDao.updateUserPassword(username, password);
            return user;
        } catch(err) {
            throw err;
        }
    }

    this.getScoreboard = async () => {
        try {
            const scoreboard = await userDao.getScoreboard();
            return scoreboard;
        } catch(err) {
            throw err;
        }
    }
}