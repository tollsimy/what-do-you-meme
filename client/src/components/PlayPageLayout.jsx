import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom"
import { Container, Row, Col, Button, Card, Form, ProgressBar } from 'react-bootstrap';
import { UserContext } from '../contexts/userContext.jsx';
import { GameContext, GameProvider } from '../contexts/gameContext.jsx';
import { useContext, useEffect, useState, useRef } from 'react';
import API from '../API.mjs';

export function PlayPageLayout() {
    return (
        <GameProvider>
            <Outlet />
        </GameProvider>
    )
}

export function PlayIndexLayout() {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { game, setGame, roundsPlayed, setRoundsPlayed } = useContext(GameContext);

    const startGame = () => {
        API.getNewGame().then((res) => {
            res.json().then((data) => {
                setGame(data);
                setRoundsPlayed([]);
                navigate("/play/1");
            }).catch((err) => {
                console.error(err);
            });
        })
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Body hidden={!user}>
                            When you are ready, click the button below to start playing. <br />
                            You will be given three of memes, each one with seven possible captions, only two of them are correct. <br />
                            You will have 30 seconds for each meme to choose the correct caption. GL HF!
                        </Card.Body>
                        <Card.Body hidden={user}>
                            When you are ready, click the button below to start playing. <br />
                            You will be given a meme and seven possible captions, only two of them are correct. <br />
                            You will have 30 seconds to choose the correct caption. GL HF!
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row className="text-center mb-3">
                <Col>
                    <Button variant="success" size="lg" className="mb-3" onClick={() => startGame()}>Ready to rock!</Button>
                </Col>
            </Row>
        </Container>
    )
}

export function PlayRoundLayout() {

    const location = useLocation();
    const navigate = useNavigate();

    // User context
    const { user } = useContext(UserContext);
    // Game context, keeps array of rounds (meme and captions) and rounds played
    const { game, setGame, roundsPlayed, setRoundsPlayed } = useContext(GameContext);

    // Number of rounds, get initial num from game array length (given by API = 3 if logged, 1 if not)
    const [rounds, setRounds] = useState(game ? game.length : 0);
    // Current round id from URL
    let { round: roundId } = useParams();
    // Current round from game array
    const [round, setRound] = useState(game ? game[roundId - 1] : null);

    // Choosen caption id
    const [captionId, setCaptionId] = useState(null);
    // Caption bitmap (0: wrong, 1: correct)
    const [captionMap, _setCaptionMap] = useState(null);
    // Round end state
    const [roundEnd, setRoundEnd] = useState(false);
    // Round won state
    const [won, setWon] = useState(null);
    const [timer, setTimer] = useState(10);
    const audioRef = useRef(null);

    // Handle round change
    useEffect(() => {
        // If game is not null just skip (useEffect will navigate to home)
        if (game != null) {
            setRound(game[roundId - 1]);
            setWon(null);
            setCaptionId(null);
            _setCaptionMap(null);
            setRoundEnd(false);
            setTimer(30);
        }
    }, [roundId, game]);

    // Handle timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(time => {
                if (time > 0) {
                    return time - 1;
                } else {
                    if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.muted = false;
                        audioRef.current.volume = 0.05;
                        audioRef.current.play();
                    }
                    clearInterval(interval);
                    submitRound(round);
                    return time;
                }
            });
        }, 1000);
        if (roundEnd) {
            storePlayerAnswer(round.meme, captionId, round.captions, won);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [roundEnd]);

    function setCaptionMap(captionsId, wCaption1, wCaption2) {
        const captionMap = new Map();
        captionsId.forEach((caption) => {
            captionMap.set(caption, 0);
        });
        captionMap.set(wCaption1, 1);
        captionMap.set(wCaption2, 1);
        _setCaptionMap(captionMap);
    };

    // handle manual refresh of page
    useEffect(() => {
        if (!game) {
            navigate('/');
        }
    }, [location, navigate]);

    // Store player answer
    function storePlayerAnswer(meme, captionId, captions, won) {
        const playedRound = {
            meme: meme,
            captionId: captionId,
            captions: captions,
            won: won
        };
        setRoundsPlayed([...roundsPlayed, playedRound]);
    }

    // Handle submit round (confirm btn)
    const submitRound = (round) => {
        if (roundEnd == false) {
            const captionsId = round.captions.map((caption) => caption.c_id);
            API.sendAnswer(round.meme, captionId, captionsId)
                .then((res) => {
                    res.json().then((data) => {
                        // Set won state
                        setWon(data.won);
                        // Set caption correct as one in list
                        setCaptionMap(captionsId, data.caption1, data.caption2);
                        setRoundEnd(true);
                        setRounds(rounds - 1);
                    }).catch((err) => {
                        console.error(err);
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    // Handle next round (next btn)
    const nextRound = () => {
        if (rounds == 0) {
            navigate("/play/stats");
        }
        else {
            navigate("/play/" + (Number(roundId) + 1));
        }
    }

    const renderRound = (curr_round) => {
        return (
            <Card>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col>
                            <img
                                src={"/images/memes/" + curr_round.meme}
                                alt="meme"
                                style={{ width: '400px', height: 'auto' }}
                            />
                        </Col>
                        <Col>
                            <div>
                                <h1><p className={timer > 20 ? "text-dark" : (timer > 10 ? "text-warning" : (timer > 5 ? "text-danger" : "text-danger text_blink"))}>{timer} s</p></h1>
                            </div>
                            <div >
                                <h4>Choose the correct caption:</h4>
                            </div>
                            <Form>
                                <div className="mb-3">
                                    {
                                        // render radio buttons for each caption
                                        curr_round.captions.map((caption, index) => (
                                            <Row key={index}>
                                                <Col md={10}>
                                                    <input
                                                        type="checkbox"
                                                        className="btn-check"
                                                        id={caption.c_id}
                                                        autoComplete="off"
                                                        disabled={roundEnd}
                                                        checked={captionId === caption.c_id}
                                                        onChange={() => setCaptionId(caption.c_id)}
                                                        name="radioGroup"
                                                    />
                                                    <label
                                                        className={`btn ${won ? (captionId === caption.c_id ? 'btn-success' : 'btn-danger') : "btn-outline-primary"}`}
                                                        htmlFor={caption.c_id}
                                                        style={{
                                                            display: 'block',
                                                            textAlign: 'left',
                                                            width: '100%',
                                                        }}>
                                                        {caption.caption}
                                                    </label>
                                                </Col>
                                                <Col md={2}>
                                                    <i className="bi bi-check-lg" hidden={captionMap ? (captionMap.get(caption.c_id) ? false : true) : true}></i>
                                                    <i className="bi bi-x" hidden={captionMap ? captionMap.get(caption.c_id) ? true : false : true}></i>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </div>
                            </Form>
                            <audio ref={audioRef} src="/mp3/time_out_microwave.mp3" muted ></audio>
                            <Button variant="primary" size="lg" className="mb-3" disabled={!captionId} hidden={roundEnd} onClick={() => submitRound(curr_round)}>Confirm</Button>
                            <Button variant="primary" size="lg" className="mb-3" hidden={!roundEnd} onClick={() => nextRound()}>Next</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container fluid>
            <h1>Play</h1>
            <br />
            {round ? renderRound(round) : null}
            <br />
            <ProgressBar now={user ? (1 - rounds / 3) * 100 : (1 - rounds / 1) * 100}/>
            <br />
            <br />
            <h2 style={{ opacity: roundEnd ? 1 : 0 }} className={won ? "text-success" : "text-danger"}>{won ? "Good job!" : "Better luck next time :("}</h2>
            <h2 style={{ opacity: roundEnd ? 1 : 0 }} className={won ? "text-success" : "text-danger"}>{won ? "+5 XP" : "0 XP"}</h2>
        </Container>
    )
}

export function PlayStatsLayout() {

    const location = useLocation();
    const navigate = useNavigate();

    const { user, contextLogin } = useContext(UserContext);
    const { game, setGame, roundsPlayed, setRoundsPlayed } = useContext(GameContext);
    const wonRounds = roundsPlayed.filter(round => round.won).length;
    const shibaImage = `lv${wonRounds}_shiba.webp`;
    const shibaImageAnonym = wonRounds ? "lv3_shiba.webp" : "lv0_shiba.webp";

    // After a game, update user context to get new user score and games
    const updateUserContext = async () => {
        try {
            const userInfoResponse = await API.getUserInfo(user.username);
            const userInfo = await userInfoResponse.json();
            const gamesHistoryResponse = await API.getGamesHistory();
            const games = await gamesHistoryResponse.json();
            contextLogin(userInfo, games);
        } catch (err) {
            //console.log(err);
        }
    }

    // handle manual refresh of page
    useEffect(() => {
        if (!game) {
            navigate('/');
        }
    }, [location, navigate]);

    // update user context after game
    useEffect(() => {
        updateUserContext();
    }, []);

    return (
        <>
            <h2>Correct captions</h2>
            <br />
            <Card>
                <Card.Body>
                    <Col>
                            <Row className="align-items-center">
                    
                    {
                        roundsPlayed.filter((round) => round.won == true).length == 0 ? (
                                <Col>
                                    <Row className="align-items-center">
                                        <Col>
                                            <img
                                                src={"/images/site-images/srly.jpg"}
                                                alt="meme"
                                                style={{ width: '500px', height: 'auto' }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            )
                            :
                            (
                                <Col className="align-items-center">
                                    {
                                        roundsPlayed.map((round, index) => (
                                            round.won ? (
                                                <Row key={index} className="align-items-center" style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <img
                                                            src={"/images/memes/" + round.meme}
                                                            alt="meme"
                                                            style={{ width: '200px', height: 'auto' }}
                                                        />
                                                        <p style={{ marginLeft: '10px' }}>{round.captions.find((caption) => caption.c_id == round.captionId).caption}</p>
                                                    </div>
                                                </Row>
                                            ) : (<Row key={index}></Row>)
                                        ))
                                    }
                                </Col>
                            )
                        }
                        <Col>
                            {
                                <>
                                    {   user ? (
                                            <img
                                                src={"/images/site-images/" + shibaImage}
                                                alt="shiba-img"
                                                style={{ width: '250px', height: 'auto' }}
                                            />
                                        ) : (
                                            <img
                                            src={"/images/site-images/" + shibaImageAnonym}
                                            alt="shiba-img"
                                            style={{ width: '250px', height: 'auto' }}
                                            />
                                        )
                                    }
                                    {   user ? (
                                            <h3>Score: {Number(5 * Number(roundsPlayed.filter((round) => round.won == true).length))}/15 XPs</h3>
                                        ) : (
                                            <h3>Score: {Number(5 * Number(roundsPlayed.filter((round) => round.won == true).length))}/5 XPs</h3>
                                        )
                                    }
                                </>
                            }
                        </Col>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
            <Col>
                <br />
                <br />
                <br />
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <Row className="justify-content-center">
                                <Button variant="success" size="md" className="mb-3" style={{ width: '150px' }} onClick={() => navigate("/play")}>Play again</Button>
                            </Row>
                            <Row className="justify-content-center">
                                <Button variant="primary" size="md" className="mb-3" style={{ width: '150px' }} onClick={() => navigate("/")}>Home</Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </>
    )
}