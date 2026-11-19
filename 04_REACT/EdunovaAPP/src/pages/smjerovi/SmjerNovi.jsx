import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/smjerovi/SmjerService";
import { ShemaSmjer } from "../../schemas/ShemaSmjer"
import { useEffect, useState } from "react";
import { useRive } from '@rive-app/react-canvas';
import useBreakpoint from "../../hooks/useBreakpoint";


export default function SmjerNovi() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [isChecking, setIsChecking] = useState(false);
    const [spustiRuke, setSpustiRuke] = useState(true);
    const [numLook, setNumLook] = useState(null);
    const sirina = useBreakpoint();

    async function dodaj(smjer) {
        await SmjerService.dodaj(smjer).then(() => {
            navigate(RouteNames.SMJEROVI)
        })
    }

    const { rive, RiveComponent } = useRive({
        src: '/animacija.riv',
        stateMachines: 'State Machine 1', // Važno: mora odgovarati nazivu u Rive editoru
        autoplay: true,
    });

    // za ispravak ove greške treba mijenjati animaciju pa ćemo ju ostaviti. Za ubuduće koristiti animacije s triggerima i inputima
    const inputs = rive?.stateMachineInputs('State Machine 1');
    const isHandsUp = inputs?.find((i) => i.name === 'hands_up');
    const fail = inputs?.find((i) => i.name === 'fail');

    useEffect(() => {
        if (!rive || !isHandsUp) return;

        if (!spustiRuke) {
            // 1. Podigni ruke
            isHandsUp.value = true;
            // 2. Ako je tek pokrenut submit (puna lista grešaka), "stisni" fail trigger
            if (fail) fail.fire();
        } else {
            isHandsUp.value = false;
        }
    }, [errors, isHandsUp, fail, rive, spustiRuke]);

    function odradiSubmit(e) { 
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
            setSpustiRuke(false)
            return;
        }

        dodaj({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
            setSpustiRuke(true)
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
            <Row>
                <Col md={7} className="mt-4">

                    <Form onSubmit={odradiSubmit}>
                        <Container className="visinaProgran">
                            <Card className="shadow-sm" style={{ padding: '2rem' }}>
                                <Card.Title className="mb-4">Unos novog smjera</Card.Title>
                                <Row>
                                    <Col xs={12}>
                                        <Form.Group controlId="naziv">
                                            <Form.Label>Naziv</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="naziv"
                                                placeholder="Unesite naziv smjera"
                                                isInvalid={!!errors.naziv}
                                                onFocus={() => handleFocus('naziv')}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    if (numLook) numLook.value = e.target.value.length * 2;
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.naziv}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={7} md={6} className="mt-2">
                                        <Form.Group controlId="trajanje">
                                            <Form.Label>Trajanje</Form.Label>
                                            <Form.Control type="number"
                                                style={{ textAlign: 'right' }}
                                                name="trajanje"
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
                                            <Form.Control type="number"
                                                style={{ textAlign: 'right' }}
                                                name="cijena"
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
                                                onClick={(e) => e.target.showPicker()}
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
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5} md={6} style={{ paddingTop: '2.8rem' }}>
                                        <div >
                                            <label title="" htmlFor="aktivan" style={{ marginRight: '0.5rem' }}>Aktivan</label>
                                            <input id="aktivan" className="form-check-input" type="checkbox" name="aktivan" />

                                        </div>
                                    </Col>

                                    <Col className="mt-4" xs={4}>
                                        <Link to={RouteNames.SMJEROVI} className="btn btn-danger">
                                            Odustani
                                        </Link>
                                    </Col>
                                    <Col className="mt-4" xs={8} style={{ textAlign: 'right' }}>
                                        <Button type="submit" variant="success">
                                            Dodaj novi smjer
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Container>
                    </Form>
                </Col>
                {['lg', 'xk', 'xxl', 'md'].includes(sirina) && (
                    <Col md={5} className="mt-4">
                        <RiveComponent />
                    </Col>
                )}
            </Row>
        </>
    )
}