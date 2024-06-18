import { Outlet } from "react-router-dom"
import { Container, Row, Col, Button, Card, Form, ProgressBar } from 'react-bootstrap';

export function PlayPageLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}

export function PlayIndexLayout() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Body>
                            When you are ready, click the button below to start playing. <br />
                            You will be given a series of memes and seven possible captions, only two of them are correct. <br />
                            You will have 30 seconds to choose the correct caption. GL HF!
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row className="text-center mb-3">
                <Col>
                    <Button variant="success" size="lg" className="mb-3" href="/play/1">Ready to rock!</Button>
                </Col>
            </Row>
        </Container>
    )
}

export function PlayRoundLayout() {
    return (
        <Container fluid>
            <h1>Play</h1>
            <br />
            <br />
            <Row className="align-items-center">
                <Col>
                    <img
                        src="/images/memes/bugs_bunny.png"
                        alt="meme"
                        className="img-fluid"
                    />
                </Col>
                <Col>
                    <div>
                        <h1>30s</h1>
                    </div>
                    <div className="bg-light p-3">
                        <h4>Choose the correct caption:</h4>
                    </div>
                    <Form className="bg-light p-3">
                        <div key="default-radio" className="mb-3">
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio1"
                                label={<h4>caption 1</h4>}
                            />
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio2"
                                label={<h4>caption 1</h4>}
                            />
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio3"
                                label={<h4>caption 1</h4>}
                            />
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio4"
                                label={<h4>caption 1</h4>}
                            />
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio5"
                                label={<h4>caption 1</h4>}
                            />
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio6"
                                label={<h4>caption 1</h4>}
                            />
                            <Form.Check
                                name="captions"
                                type="radio"
                                id="radio7"
                                label={<h4>caption 1</h4>}
                            />
                        </div>
                    </Form>
                    <br />
                    <Button variant="primary" size="lg" className="mb-3" href="/play/stats">Confirm</Button>
                </Col>
            </Row>
            <br />
            <ProgressBar now={33} />
        </Container>
    )
}

export function PlayStatsLayout() {
    return (
        <Row>
            <h2>Results</h2>
            <br />
            <br />
            <Col>
                <Row className="align-items-center">
                    <Col md={5}>
                        <img
                            src="/images/memes/bugs_bunny.png"
                            alt="meme"
                            className="img-fluid"
                        />
                    </Col>
                    <Col>
                        <h1>Caption</h1>
                        <h1>5 XP</h1>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={5}>
                        <img
                            src="/images/memes/bugs_bunny.png"
                            alt="meme"
                            className="img-fluid"
                        />
                    </Col>
                    <Col>
                        <h1>Caption</h1>
                        <h1>5 XP</h1>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={5}>
                        <img
                            src="/images/memes/bugs_bunny.png"
                            alt="meme"
                            className="img-fluid"
                        />
                    </Col>
                    <Col>
                        <h1>Caption</h1>
                        <h1>5 XP</h1>
                    </Col>
                </Row>
            </Col>
            <Col className="d-flex justify-content-center">
                <Row className="align-items-center">
                    <h3>Total XP: 15</h3>
                </Row>
                <Row className="align-items-end">
                    <Button variant="primary" size="lg" className="mb-3" href="/play">Play again</Button>
                </Row>
            </Col>
        </Row>
    )
}