import { Form, Button, Container } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API.mjs";
import { UserContext } from '../contexts/userContext.jsx';

function LoginPageLayout() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user, contextLogin, contextLogout } = useContext(UserContext);

    const navigate = useNavigate();

    const validateForm = () => {
        // No need to check anything for now
    };

    const submitLogin = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors) {
            setError(validationErrors);
            return;
        }
        setError('');

        try {
            const response = await API.login(username, password);
            if (response.status === 200) {
                const userInfoResponse = await API.getUserInfo(username);
                const data = await userInfoResponse.json();
                const gamesHistoryResponse = await API.getGamesHistory();
                const games = await gamesHistoryResponse.json();
                contextLogin(data, games);
                navigate('/');
            }
        } catch (err) {
            if (err.message === "401") {
                setError("Invalid username or password");
            } else {
                setError("Error signing in");
            }
        }
    }

    return (
        <Container fluid>
            <h1>Login</h1>
            <br />
            <Form name="loginForm" className='block-example border rounded mt-4 mb-0 px-5 py-4 form-padding' onSubmit={submitLogin}>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control id ="username" type="text" placeholder="username" required={true} value={username} onChange={event => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="password" type="password" placeholder="password" required={true} value={password} onChange={event => setPassword(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Button className='my-3' variant='primary' type='submit'>Login</Button>
                </Form.Group>

                <Form.Group>
                    <Button className='my-3' variant='warning' onClick={() => navigate("/signup")}>Or signup instead</Button>
                </Form.Group>

                <Form.Group className='mb-3' hidden={error ? false : true}>
                    <Form.Label className="text-danger">{error}</Form.Label>
                </Form.Group>
            </Form>
        </Container>
    )
}

function SignupPageLayout() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { contextUser, contextLogin, contextLogout } = useContext(UserContext);

    const navigate = useNavigate();

    const validateForm = () => {
        // No need to check anything for now
    };

    const submitSignup = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors) {
            setError(validationErrors);
            return;
        }
        setError('');
        
        try {
            const responseSignup = await API.signup(username, password)
            if (responseSignup.status === 200) {
                const responseSignupJson = await responseSignup.json();
                const response = await API.login(username, password);
                if (response.status === 200) {
                    const userInfoResponse = await API.getUserInfo(username);
                    const data = await userInfoResponse.json();
                    const gamesHistoryResponse = await API.getGamesHistory();
                    const games = await gamesHistoryResponse.json();
                    contextLogin(data, games);
                    navigate('/');
                }
            }
        } catch (err) {
            if (err.message === "409") {
                setError("Username already exists");
            } else if (err.message === "401") {
                setError("Invalid username or password");
            }
            else {
                setError("Error signing up");
            }
        }
    }

    return (
        <Container fluid>
            <h1>Signup</h1>
            <br />
            <Form name="signupForm" className='block-example border rounded mt-4 mb-0 px-5 py-4 form-padding' onSubmit={submitSignup}>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control id="username" type="text" placeholder="username" required={true} value={username} onChange={event => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="password" type="password" placeholder="password" required={true} value={password} onChange={event => setPassword(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Button className='my-3' variant='primary' type='submit'>Signup</Button>
                </Form.Group>

                <Form.Group>
                    <Button className='my-3' variant='warning' onClick={() => navigate("/login")}>Or login instead</Button>
                </Form.Group>

                <Form.Group className='mb-3' hidden={error ? false : true}>
                    <Form.Label className="text-danger">{error}</Form.Label>
                </Form.Group>
            </Form>
        </Container>
    )
}

export { LoginPageLayout, SignupPageLayout };