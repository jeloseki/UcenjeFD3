import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/smjerovi/SmjerService";
import { useEffect, useState } from "react";
import { ShemaSmjer } from "../../schemas/ShemaSmjer";


export default function SmjerPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [smjer, setSmjer] = useState({})
    const [aktivan, setAktivan] = useState(false)

    const [errors, setErrors] = useState({});
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        ucitajSmjer()
    }, [])

    async function ucitajSmjer() {
        await SmjerService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data
            s.datumPokretanja = s.datumPokretanja.substring(0, 10)
            setSmjer(s)
            setAktivan(s.aktivan)
        })
    }


    async function promijeni(smjer) {
        await SmjerService.promijeni(params.sifra, smjer).then(() => {
            navigate(RouteNames.SMJEROVI)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);


        const rezultat = ShemaSmjer.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};


            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });
            setErrors(noveGreske);
            return;
        }

        promijeni({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: aktivan
        })
    }

      const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };


    const handleFocus = (nazivPolja) => {
        ocistiGresku(nazivPolja);
        if (isChecking) setIsChecking(true)
    };

    const handleBlur = () => {
        if (isChecking) setIsChecking(false);
    };

    return (
        <>
            <Form onSubmit={odradiSubmit}>
                <Container className="visinaProgran">
                    <Card className="shadow-sm" style={{ padding: '2rem' }}>
                        <Card.Title className="mb-4">Promjena smjera</Card.Title>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="naziv">
                                    <Form.Label>Naziv</Form.Label>
                                    <Form.Control type="text" name="naziv" 
                                        defaultValue={smjer.naziv} 
                                        isInvalid={!!errors.naziv}
                                        onFocus={() => handleFocus('naziv')} // Pozivamo novu funkciju
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.naziv}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={7} md={6} className="mt-2">
                                <Form.Group controlId="trajanje">
                                    <Form.Label>Trajanje</Form.Label>
                                    <Form.Control type="number" name="trajanje" step={1}
                                        defaultValue={smjer.trajanje}
                                        style={{ textAlign: 'right' }} 
                                        placeholder="0"
                                        isInvalid={!!errors.trajanje}
                                        onFocus={() => ocistiGresku('trajanje')}
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.trajanje}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={5} md={6} className="mt-2">
                                <Form.Group controlId="cijena">
                                    <Form.Label>Cijena</Form.Label>
                                    <Form.Control type="number" name="cijena"
                                        defaultValue={smjer.cijena}
                                        style={{ textAlign: 'right' }} 
                                        placeholder="0,00"
                                        step={0.01}
                                        isInvalid={!!errors.cijena}
                                        onFocus={() => ocistiGresku('cijena')}
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cijena}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={7} md={6} className="mt-2">
                                <Form.Group controlId="datumPokretanja">
                                    <Form.Label>Datum pokretanja</Form.Label>
                                    <Form.Control type="date" 
                                        defaultValue={smjer.datumPokretanja} onClick={(e) => e.target.showPicker()}
                                        onFocus={(e) => {
                                            ocistiGresku('datumPokretanja')
                                            e.target.showPicker()
                                        }}
                                        onBlur={handleBlur}
                                        name="datumPokretanja"
                                        isInvalid={!!errors.datumPokretanja}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.datumPokretanja}
                                    </Form.Control.Feedback>
                                </Form.Group></Col>
                            <Col xs={5} md={6} style={{ paddingTop: '2.8rem' }}>
                                <Form.Group controlId="aktivan" className="mt-3">
                                    <Form.Check label="Aktivan" name="aktivan"
                                        checked={aktivan}
                                        onChange={(e) => { setAktivan(e.target.checked) }} />
                                </Form.Group>

                            </Col>
                            <Col className="mt-4"  xs={4}>
                                <Link to={RouteNames.SMJEROVI} className="btn btn-danger">
                                    Odustani
                                </Link>
                            </Col>
                            <Col className="mt-4"  xs={8} style={{ textAlign: 'right' }}>
                                <Button type="submit" variant="success">
                                    Promjeni smjer
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Container>


            </Form>
        </>
    )
}