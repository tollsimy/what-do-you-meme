import {Form, Button, Container} from "react-bootstrap";
import {useState} from "react";

export default function SignupPageLayout() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitSignup = async (event) => {
        
    }

    return (
        <Container fluid>
            <h1>Signup</h1>
            <br />
            <Form className='block-example border rounded mt-4 mb-0 px-5 py-4 form-padding' onSubmit={submitSignup}>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" required={true} value={username} onChange={event => setUsername(event.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required={true} value={password} onChange={event => setPassword(event.target.value)}/>
                </Form.Group>            

                <Form.Group>
                    <Button className='my-3' variant='primary' type='submit'>Signup</Button>
                </Form.Group>

                <Form.Group>
                    <Button className='my-3' variant='warning' href="/login">Or login instead</Button>
                </Form.Group>

                <Form.Group className='mb-3' hidden={error ? "" : "hidden"}>
                    <Form.Label className="text-danger">{error}</Form.Label>
                </Form.Group>  
            </Form>
        </Container>
    )
}