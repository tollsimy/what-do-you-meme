import { Container, Row, Col, Button, Alert, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function MainPageLayout() {

    const Sidebar = () => {
        return (
            <Card className="mb-3">
                <Card.Header>Scoreboard</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><i className="bi bi-person-circle h3"></i> User1 <i className="bi bi-trophy h3"></i></ListGroup.Item>
                    <ListGroup.Item><i className="bi bi-person-circle h3"></i> User2 <i className="bi bi-trophy h3"></i></ListGroup.Item>
                    <ListGroup.Item><i className="bi bi-person-circle h3"></i> User3 <i className="bi bi-trophy h3"></i></ListGroup.Item>
                    <ListGroup.Item><i className="bi bi-person-circle h3"></i> User4</ListGroup.Item>
                    <ListGroup.Item><i className="bi bi-person-circle h3"></i> User5</ListGroup.Item>
                </ListGroup>
            </Card>
        );
    };

    const MainContent = () => {
        return (
            <Container>
                <Row className="mb-3">
                    <Col>
                        <Alert variant="primary">Hi, Anonymous/${'{Username}'}!</Alert>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama imperii, denique quod non sunt actus.
                                Et omnia in potestate nostra esse natura liber, libera, libere valeant; sed illis non est in nostra potestate sunt infirmi, servilis, licet, lex pertinet.
                                Tenete ergo quod si servitus quae natura liber, et aliena tua tunc impeditur. Dolebis, et turbabuntur, et invenietis, cum culpa tam dis hominibusque. Quod si tibi tantum sit propria et aliena quale sit, nemo unquam vel invitum te continebis.
                                Praeterea, ex culpa non invenies unum aut non accusatis unum. Et nihil inuitam. Nemo nocere tibi erit, et non inimicos, et ne illa laederentur.
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row className="text-center mb-3">
                    <Col>
                        <Button variant="success" size="lg" className="mb-3" href="/play">Play as Anonymous!</Button>
                        <div>
                            Or <a href="/login">Login</a> to unlock full features
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
                <Sidebar/>
            </Col>
        </Row>
    )
}