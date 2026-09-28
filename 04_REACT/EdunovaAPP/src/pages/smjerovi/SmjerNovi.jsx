import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function SmjerNovi(){

    return(
        <>
        <h3>
            Unos novog smjera
        </h3>

        <Form>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" name="trajanje" step={1} />
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijela</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} />
            </Form.Group>

            <Form.Group controlId="datumPokretanja">
                <Form.Label>Datum pokretanja</Form.Label>
                <Form.Control type="date" name="datumPokretanja" />
            </Form.Group>

            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan" />
            </Form.Group>
        </Form>

        

        <Row>
            <Col>
            <Link to={RouteNames.SMJEROVI}>
            Odustani
            </Link>
            </Col>
        </Row>
        </>
    )
}