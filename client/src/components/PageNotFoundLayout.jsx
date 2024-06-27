import { Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';    

export default function PageNotFoundLayout() {

    const navigate = useNavigate();

    const [_, setTimer] = useState(5);

    useEffect(() => {
        const interval = setTimeout(() => {
            navigate("/");
        }, 5000);
        return () => clearTimeout(interval);
    }, []);

    return (
        <Container fluid>
            <Row className="align-items-center">
                <Col>
                    <img 
                        src="/images/site-images/not_found.jpg" 
                        alt="Page not found" 
                        className="img-fluid" 
                    />
                </Col>
                <Col>
                    <p style={{fontSize: "150px"}}>404</p>
                    <h2>Meme not found, redirecting..</h2>
                    <br />
                    <Button onClick={() => navigate("/")} variant="primary">Take me away</Button>
                </Col>
            </Row>
        </Container>
    )
}