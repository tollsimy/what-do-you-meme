import { Outlet } from "react-router-dom"
import { Col, Row, Container, Button, ListGroup, Pagination } from "react-bootstrap"

export function ProfilePageLayout() {
    return (
        <Outlet />
    )
}

export function ProfileIndexLayout() {
    return (
        <Row>
            <Col>
                <h1>Profile</h1>
                <img src="https://via.placeholder.com/150" alt="profile" />
                <Button>Edit profile pic</Button>
            </Col>
            <Col>
                test
            </Col>
            <Col>
                <Button variant="primary" href="/profile/games">View full history</Button>
            </Col>
        </Row>
    )
}

export function ProfileGamesLayout() {

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Container fluid>
            <h1>Games</h1>
            <ListGroup>
                <ListGroup.Item action href="/profile/games/game1">Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            </ListGroup>
            <Container>
                <Pagination size="sm">{items}</Pagination>
            </Container>
        </Container>
    )
}

export function ProfileGamesDetailLayout() {
    return (
        <Container fluid>
            <h1>Game Details</h1>
        </Container>
    )
}