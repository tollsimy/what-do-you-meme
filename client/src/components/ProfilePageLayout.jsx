import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom"
import { useState, useContext, useEffect } from 'react';
import { Col, Row, Container, Button, ListGroup, Pagination, Card } from "react-bootstrap"
import { UserContext } from '../contexts/userContext.jsx';
import API from "../API.mjs";

export function ProfilePageLayout() {

    return (
        <Outlet />
    )
}

export function ProfileIndexLayout() {
    const { user, contextLogin, contextLogout, userGamesHistory } = useContext(UserContext);

    const [games, setGames] = useState([]);
    const gameNumber = 3;

    const location = useLocation();
    const navigate = useNavigate();

    // handle manually refreshing the page
    useEffect(() => {
        if (userGamesHistory.length - gameNumber < 0) {
            setGames([...userGamesHistory].reverse());
        }
        else {
            setGames([...userGamesHistory.slice(userGamesHistory.length - gameNumber, userGamesHistory.length)].reverse());
        }
    }, [userGamesHistory]);

    return (
        <Container fluid>
            <Row>
                <Col className="profile-left" md={8}>
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col>
                                    <h2>{user ? user.username : ""}</h2>
                                    <i style={{ fontSize: '10rem' }} className="bi bi-person-circle"></i>
                                </Col>
                                <Col className="p-5">
                                    <br />
                                    <br />
                                    <h3 style={{ whiteSpace: 'nowrap' }}> Total score: {user ? user.score : ""} XPs</h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="sidebar-right">
                    <h3>Recently played games</h3>
                    <br />
                    <ListGroup>
                        {games.map((game, index) => (
                            <ListGroup.Item key={index} action onClick={() => navigate(`/profile/games/${game.game}`)}>
                                <ListGroup>
                                    <Row className="align-items-end p-3">
                                        {game.rounds.map((round, index) => (
                                            <Col key={index}>
                                                <img
                                                    src={"/images/memes/" + round.meme}
                                                    alt="meme"
                                                    style={{ width: '100px', height: 'auto' }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        <p>Score: {game.rounds.filter((round) => round.won).length * 5} XPs</p>
                                    </Row>
                                </ListGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <br />
                    <Button variant="primary" onClick={() => navigate("/profile/games")}>View full history</Button>
                </Col>
            </Row>
        </Container>
    )
}

export function ProfileGamesLayout() {

    const { user, contextLogin, contextLogout, userGamesHistory } = useContext(UserContext);

    const [gamesInPage, setGamesInPage] = useState([]);
    const [totalGames, setTotalGames] = useState(0);

    const gamesPerPage = 5;
    const totalPages = Math.ceil(totalGames / gamesPerPage);

    const [activePage, setActivePage] = useState(1);

    const navigate = useNavigate();

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    // handle manually refreshing the page
    useEffect(() => {
        // Calculate the games to display based on the active page
        setTotalGames(userGamesHistory.length);
        const firstGameIndex = (activePage - 1) * gamesPerPage;
        setGamesInPage(userGamesHistory.slice(firstGameIndex, firstGameIndex + gamesPerPage));
    }, [activePage, userGamesHistory]);

    return (
        <Container fluid>
            <h1>Games</h1>
            <ListGroup>
                {gamesInPage.map((game, index) => (
                    <ListGroup.Item key={index} action onClick={() => navigate(`/profile/games/${game.game}`)}>
                        <h3>GameID: {game.game}</h3>
                        <ListGroup>
                            <Row>
                                {game.rounds.map((round, index) => (
                                    <Col key={index}>
                                        <img
                                            src={"/images/memes/" + round.meme}
                                            alt="meme"
                                            style={{ width: '150px', height: 'auto' }}
                                        />
                                        <p>{round.won ? "+5 XPs" : "0 XPs"}</p>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <h3>Total score: {game.rounds.filter((round) => round.won).length * 5} XPs</h3>
                            </Row>
                        </ListGroup>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <br />
            <Pagination className="justify-content-center" size="sm">{items}</Pagination>
            <Button variant="primary" onClick={() => navigate("/profile")}>Back to profile</Button>
        </Container>
    );
}

export function ProfileGamesDetailLayout() {

    const { gameId: gameId } = useParams();
    const navigate = useNavigate();

    const { user, contextLogin, contextLogout, userGamesHistory } = useContext(UserContext);
    const [game, setGame] = useState(null);

    useEffect(() => {
        setGame(userGamesHistory.find((game) => game.game == gameId));
    }, [gameId, userGamesHistory]);

    return (
        <Container fluid>
            <h3>GameID: {gameId}</h3>
            <br />
        <Card>
            <Card.Body>
            <Row>
                {game && (
                    game.rounds.map((round, index) => (
                        <Col key={index}>
                            <img
                                src={"/images/memes/" + round.meme}
                                alt="meme"
                                style={{ width: '300px', height: 'auto' }}
                            />
                            <p>{round.caption}</p>
                            <p>{round.won ? "+5 XPs" : "0 XPs"}</p>
                        </Col>
                    ))
                )
                }
            </Row>
            <Row>
                {game && (
                    <h3>Total score: {game.rounds.filter((round) => round.won).length * 5} XPs</h3>
                )
                }
            </Row>
            </Card.Body>
        </Card>
            <br />
            <Button variant="primary" onClick={() => navigate("/profile/games")}>Back to games</Button>
        </Container>
    )
}