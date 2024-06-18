import { Container, Col, Row, Button } from 'react-bootstrap';

export default function PageNotFoundLayout() {
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
                    <h1><h1>404</h1></h1>
                    <h2>Meme not found</h2>
                    <br />
                    <Button href="/" variant="primary">Take me away</Button>
                </Col>
            </Row>
        </Container>
    )
}