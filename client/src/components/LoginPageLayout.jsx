import {Form, Button, Container} from "react-bootstrap";
import {useState} from "react";

export default function LoginPageLayout() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitLogin = async (event) => {
        
    }

    return (
        <Container fluid>
            <h1>Login</h1>
            <br />
            <Form className='block-example border rounded mt-4 mb-0 px-5 py-4 form-padding' onSubmit={submitLogin}>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" required={true} value={username} onChange={event => setUsername(event.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required={true} value={password} onChange={event => setPassword(event.target.value)}/>
                </Form.Group>            

                <Form.Group>
                    <Button className='my-3' variant='primary' type='submit'>Login</Button>
                </Form.Group>

                <Form.Group>
                    <Button className='my-3' variant='warning' href="/signup">Or signup instead</Button>
                </Form.Group>

                <Form.Group className='mb-3' hidden={error ? "" : "hidden"}>
                    <Form.Label className="text-danger">{error}</Form.Label>
                </Form.Group>  
            </Form>
        </Container>
    )
}