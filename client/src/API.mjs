const SERVER_URL = 'http://localhost:3001/api/v1';

/* Helper functions */

async function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.status) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1) {
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return await response;
}

/* API functions */

async function login(username, password) {
    const URL = SERVER_URL + '/sessions';
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function amILoggedIn() {
    const URL = SERVER_URL + '/sessions/current';
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function logout() {
    const URL = SERVER_URL + '/sessions/current';
    const response = await fetch(URL, {
        method: 'DELETE',
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function signup(username, password) {
    const URL = SERVER_URL + '/users';
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    return await handleInvalidResponse(response);
}

async function getUserInfo() {
    const URL = SERVER_URL + '/users/current';
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function changePassword(password) {
    const URL = SERVER_URL + '/users/current';
    const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function getGamesHistory() {
    const URL = SERVER_URL + '/users/current/games';
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function getNewGame() {
    const URL = SERVER_URL + '/game';
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function sendAnswer(meme, c_id, captions_id) {
    const URL = SERVER_URL + '/game';
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meme, c_id, captions_id }),
        credentials: 'include',
    })
    return await handleInvalidResponse(response);
}

async function getScoreboard() {
    const URL = SERVER_URL + '/users/scoreboard';
    const response = await fetch(URL, {
        method: 'GET',
    })
    return await handleInvalidResponse(response);
}

/* Export API object */

const API = {
    login,
    amILoggedIn,
    getUserInfo,
    logout,
    signup,
    changePassword,
    getGamesHistory,
    getNewGame,
    sendAnswer,
    getScoreboard,
};

export default API;
