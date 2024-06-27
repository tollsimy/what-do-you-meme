import { Container, Row, Col, Button, Alert, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext.jsx';
import API from "../API.mjs";

export default function MainPageLayout() {

    const { user, contextLogin, contextLogout } = useContext(UserContext);

    const ScoreBoard = () => {
        const [scoreboard, setScoreboard] = useState([]);

        useEffect(() => {
            API.getScoreboard()
                .then((res) => {
                    res.json()
                        .then((data) => {
                            setScoreboard(data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                )
                .catch((err) => {
                    console.log(err);
                });
        }, []);
        

        return (
            <Container fluid>
                <Card className="mb-3">
                    <Card.Header>Scoreboard</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <i className="bi bi-person-circle h3 me-2"></i>
                            {scoreboard[0] ? scoreboard[0].username : ""}
                            <i className="bi bi-trophy h3 ms-2" style={{backgroundColor: "#f0ad4e"}}></i>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="bi bi-person-circle h3 me-2"></i> 
                            {scoreboard[1] ? scoreboard[1].username : ""}
                            <i className="bi bi-trophy h3 ms-2" style={{backgroundColor: "#C0C0C0"}}></i></ListGroup.Item>
                        <ListGroup.Item>
                            <i className="bi bi-person-circle h3 me-2"></i> 
                            {scoreboard[2] ? scoreboard[2].username : ""}
                            <i className="bi bi-trophy h3 ms-2" style={{backgroundColor: "#CD7F32"}}></i></ListGroup.Item>
                    </ListGroup>
                </Card>
            </Container>
        );
    };

    const MainContent = () => {

        const navigate = useNavigate();

        return (
            <Container>
                <Row className="logo">
                    <img src="/images/site-images/logo.png" alt="What Do You Meme?" className="img-fluid" />
                </Row>
                <Row className="mb-3" hidden={!user}>
                    <Col>
                        <Alert className="rainbow">Hi, <strong>{user ? user.username : ""}</strong>!</Alert>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                🌈🌈🌈
                                "What Do You Meme?" is a popular party game that involves creating funny captions for meme images.
                                This is the web version of the game, where you can play against the computer.
                                The game is simple: you will be shown a meme image with some captions, and you have to choose the funniest one!
                                🌈🌈🌈
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row className="text-center mb-3">
                    <Col>
                        <Button variant="success" size="lg" className="mb-3" onClick={() => navigate("/play")} hidden={user}>Play as Anonymous!</Button>
                        <Button variant="success" size="lg" className="mb-3" onClick={() => navigate("/play")} hidden={!user}>Play</Button>
                        <div hidden={user}>
                            Or <a onClick={() => navigate("/login")} style={{ cursor: 'pointer', color: 'blue' }}> Login</a> to unlock full features
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };

    return (
        <Row>
            <Col className="col-md-8">
                <MainContent/>
            </Col>
            <Col className="col-md-4">
                <ScoreBoard/>
            </Col>
        </Row>
    )
}