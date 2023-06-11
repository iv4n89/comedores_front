import userApi from "@/api/user.api";
import { Layout } from "@/base/Layout";
import { User } from "@/interfaces/user.interface";
import { Typography } from "@mui/material";
import { Button, Card, Col, Container, Grid, Modal, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import HTMLString from 'react-html-string';


export default function ({ }) {

    const [users, setUsers] = useState([] as User[]);
    const [loaded, setLoaded] = useState(false);
    const [qr, setQr] = useState([] as { id: number, qr: string }[]);
    const [modalOpen, setModalOpen] = useState(false);
    const [userToView, setUserToView] = useState({} as any);
    const [enterAttempt, setEnterAttempt] = useState({} as { canEnter: boolean, timeToPass?: string });

    useEffect(() => {
        userApi.getAllUsers().then(setUsers);
    }, []);

    useEffect(() => {
        if (users.length) {
            for (const user of users.filter(u => u.commPlaces?.length)) {
                userApi.getQr(user.id).then(res => setQr(prev => ([...prev, { id: user.id, qr: res.replace('\n', '') }])));
            }

            setLoaded(true);
        }
    }, [users]);

    const attemptEnter = (userId: number, placeId: number) => { userApi.attemptEnter(userId, placeId).then(setEnterAttempt); };
    const splitTimeToPass = (time: string) => {
        const splitted = time.split(', ');

        return {
            ...(splitted.length > 3 && {days: Number(splitted[0].split(' ')?.at(0))}),
            hours: Number(splitted?.at(-3)?.split(' ')?.at(0)),
            minutes: Number(splitted?.at(-2)?.split(' ')?.at(0)),
            seconds: Number(splitted?.at(-1)?.split(' ')?.at(0)),
        }
    }

    return loaded && (
        <Layout>
            <Grid.Container gap={3}>
                {
                    users.filter(u => u.commPlaces?.length).map(u => (
                        <Grid xs={3} key={u.id}>
                            <Card
                                isHoverable
                                isPressable
                                onClick={e => {
                                    setModalOpen(true);
                                    setUserToView(u);
                                }}
                            >
                                <Card.Header
                                    css={{
                                        backgroundColor: 'Green',
                                        color: 'white',
                                        height: '70px',
                                    }}
                                >
                                    <Typography>
                                        {u.name} {u.surname}
                                    </Typography>
                                </Card.Header>
                                <Card.Body>
                                    <HTMLString html={qr?.find(q => q.id === u.id)?.qr as string} />
                                </Card.Body>
                            </Card>
                            <Modal
                                open={modalOpen}
                                closeButton
                                onClose={() => setModalOpen(false)}
                                width='75vw'
                                blur
                            >
                                <Modal.Header>
                                    <Text size={30}>
                                        Entrada Beneficiario
                                    </Text>
                                </Modal.Header>
                                <Modal.Body>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <HTMLString html={qr?.find(q => q.id === u.id)?.qr as string} />
                                            </Col>
                                            <Col>
                                                <Button
                                                    onClick={() => attemptEnter(u.id, u.commPlaces?.find(p => p.type === 'community kitchen')?.id as number)}
                                                    hidden={!u.commPlaces?.some(p => p.type === 'community kitchen')}
                                                    color='success'
                                                    className="mb-3"
                                                    shadow
                                                >
                                                    <Text>Simular lectura de QR de comedor</Text>
                                                </Button>
                                                <Button
                                                    onClick={() => attemptEnter(u.id, u.commPlaces?.find(p => p.type === 'company store')?.id as number)}
                                                    hidden={!u.commPlaces?.some(p => p.type === 'company store')}
                                                    shadow
                                                >
                                                    Simular lectura de QR de economato
                                                </Button>
                                                <br />
                                                <div hidden={!('canEnter' in enterAttempt)}>
                                                    <Text
                                                        className="p-3 bg-purple-500 rounded-t-lg  font-bold"
                                                        color="white"
                                                    >
                                                        Puede entrar: 
                                                    </Text>
                                                    <Text
                                                        className={ 'p-3 rounded-b-lg font-bold ' + (enterAttempt?.canEnter ? ' bg-green-600 ' : ' bg-red-600 ') }
                                                        color='white'
                                                    >
                                                        {enterAttempt?.canEnter ? 'Sí' : 'No'}
                                                    </Text>
                                                    <br />
                                                    <Text
                                                        className="p-3 bg-green-500 rounded-t-lg font-bold"
                                                        hidden={!('timeToPass' in enterAttempt)}
                                                    >
                                                        Tiempo de espera:
                                                    </Text>
                                                    <Text>
                                                        {enterAttempt?.timeToPass && (
                                                            <div className="border border-green-500 rounded-b-lg">
                                                                {
                                                                    splitTimeToPass(enterAttempt?.timeToPass)?.hours && (
                                                                        <div className="bg-green-300 pl-3 pt-1 pb-1">
                                                                            <Text
                                                                                css={{
                                                                                    fontWeight: 'bolder'
                                                                                }}
                                                                            > { splitTimeToPass(enterAttempt?.timeToPass)?.days ?? 0 } días </Text>
                                                                        </div>
                                                                    ) || <></>
                                                                }
                                                                <div className="bg-cyan-300 pl-3 pt-1 pb-1">
                                                                    <Text
                                                                        css={{
                                                                            fontWeight: 'bolder'
                                                                        }}
                                                                    > { splitTimeToPass(enterAttempt?.timeToPass)?.hours } horas </Text>
                                                                </div>
                                                                <div className="bg-indigo-300 pl-3 pt-1 pb-1">
                                                                    <Text
                                                                        css={{
                                                                            fontWeight: 'bolder'
                                                                        }}
                                                                    > { splitTimeToPass(enterAttempt?.timeToPass)?.minutes } minutos </Text>
                                                                </div>
                                                                <div className="bg-purple-300 pl-3 pt-1 pb-1">
                                                                    <Text
                                                                        css={{
                                                                            fontWeight: 'bolder'
                                                                        }}
                                                                    > { splitTimeToPass(enterAttempt?.timeToPass)?.seconds } segundos </Text>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Modal.Body>
                            </Modal>
                        </Grid>
                    ))
                }
            </Grid.Container>
        </Layout>
    )
}