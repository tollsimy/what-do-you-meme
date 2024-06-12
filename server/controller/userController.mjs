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
}