import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/smjerovi/SmjerService";


export default function SmjerNovi() {

    const navigate = useNavigate()

    async function dodaj(smjer) {
        await SmjerService.dodaj(smjer).then(()=>{
            navigate(RouteNames.SMJEROVI)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    return (
        <>
            <Form onSubmit={odradiSubmit}>
                <Container className="visinaProgran">
                    <Card className="shadow-sm" style={{padding: '2rem'}}>
                        <Card.Title className="mb-4">Unos novog smjera</Card.Title>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="naziv">
                                    <Form.Label>Naziv</Form.Label>
                                    <Form.Control type="text" name="naziv" required />
                                </Form.Group>
                            </Col>
                            <Col xs={7}  md={6} className="mt-2">
                                <Form.Group controlId="trajanje">
                                    <Form.Label>Trajanje</Form.Label>
                                    <Form.Control type="number" 
                                     style={{textAlign: 'right'}}
                                    name="trajanje" step={1} />
                                </Form.Group>
                            </Col>
                            <Col xs={5}  md={6} className="mt-2">
                                <Form.Group controlId="cijena">
                                    <Form.Label>Cijena</Form.Label>
                                    <Form.Control type="number"
                                     style={{textAlign: 'right'}}
                                    name="cijena" step={0.01} />
                                </Form.Group>
                            </Col>
                            <Col xs={7} md={6} className="mt-2">
                                <Form.Group controlId="datumPokretanja">
                                    <Form.Label>Datum pokretanja</Form.Label>
                                    <Form.Control type="date" 
                                    onClick={(e)=>e.target.showPicker()}
                                    onFocus={(e)=>e.target.showPicker()}
                                    name="datumPokretanja" />
                                </Form.Group>
                            </Col>
                            <Col xs={5}  md={6} style={{paddingTop: '2.8rem'}}>
                                <div >
                                    <label title="" for="aktivan" style={{marginRight: '0.5rem'}}>Aktivan</label>
                                    <input id="aktivan" className="form-check-input" type="checkbox" name="aktivan" />
                                  
                               </div>
                            </Col>

                            <Col className="mt-4" xs={4}>
                                <Link to={RouteNames.SMJEROVI} className="btn btn-danger">
                                    Odustani
                                </Link>
                            </Col>
                            <Col className="mt-4" xs={8} style={{textAlign: 'right'}}>
                                <Button type="submit" variant="success">
                                    Dodaj novi smjer
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </Form>
        </>
    )
}