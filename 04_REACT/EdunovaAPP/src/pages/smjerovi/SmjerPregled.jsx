import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr";
import { FcApproval, FcDisapprove } from "react-icons/fc";
import { NumericFormat } from "react-number-format";
import FormatDatuma from "../../components/FormatDatuma";

export default function SmjerPregled() {

    const [smjerovi, setSmjerovi] = useState([])

    useEffect(() => {
        console.log('Došao na pregled smjerova')
        ucitajSmjerove()
    }, [])

    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {
            //console.table(odgovor.data)
            setSmjerovi(odgovor.data)
        })
    }


    return (
        <>

            <Table hover striped bordered responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Datum pokretanja</th>
                        <th>Aktivan</th>
                    </tr>
                </thead>
                <tbody>
                    {smjerovi && smjerovi.map((smjer) => (
                        <tr key={smjer.sifra}>
                            <td className="lead">{smjer.naziv}</td>
                            <td className="text-end">{smjer.trajanje}</td>
                            <td className="desno">
                                <NumericFormat
                                    value={smjer.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    decimalScale={2}
                                    fixedDecimalScale
                                    suffix=" €"
                                    prefix="="
                                />
                            </td>
                            <td>{smjer.cijena}</td>
                            <td style={{textAlign: 'center'}}>
                                <FormatDatuma datum={smjer.datumPokretanja}/>
                            </td>
                            {/* <td>{smjer.aktivan ? 'DA' : 'NE'}</td> */}
                            <td>
                                <GrValidate
                                    color={smjer.aktivan ? 'green' : 'red'}
                                    size={25}
                                />

                                {smjer.aktivan ? (
                                    <FcApproval size={25} />
                                ) : (
                                    <FcDisapprove size={25} />
                                )}
                            </td>
                        </tr>



                    ))}
                </tbody>
            </Table>

            {/* <pre>
                {JSON.stringify(smjerovi, null, 2)}
            </pre> */}
        </>
    )
}