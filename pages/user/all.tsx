import userApi from "@/api/user.api";
import { Layout } from "@/base/Layout";
import { User } from "@/interfaces/user.interface";
import { Chip, Typography } from "@mui/material";
import { Card, Container, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function AllUsers() {

    const [users, setUsers] = useState([] as User[]);
    useEffect(() => {
        userApi.getAllUsers().then(setUsers);
    }, []);

    return (
        <Layout>
            <Container fluid>
                <Grid.Container gap={2} justify='space-around'>
                    {
                        users.map(user => (
                            <Grid xs={4} key={user.id}>
                                <Card 
                                    isHoverable
                                    isPressable
                                >
                                    <Card.Header
                                        style={{ 
                                            backgroundColor: 'lightgreen',
                                            margin: 0
                                        }}
                                    >
                                        <Typography>
                                            {user.name} {user.surname}
                                        </Typography>
                                    </Card.Header>
                                    <Card.Body>
                                        <div>
                                            <Typography>
                                                { 
                                                    user.identityDoc?.docType === 'DNI' && 'DNI: ' 
                                                    || user.identityDoc?.docType === 'NIE' && 'NIE: '
                                                    || user.identityDoc?.docType === 'Passport' && 'Pasaporte: '
                                                    || 'Otro: '
                                                }
                                                <span>{user.identityDoc?.idNumber}</span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <span>
                                                Dirección:
                                            </span>
                                            <div className="rounded-md border border-green-400 p-3 mt-2">
                                                <label>
                                                    { user.address?.addrType } { user.address?.streetName } Número { user.address?.streetNumber }
                                                </label>
                                                <br />
                                                <label>
                                                    {user.address?.city?.name}{ user.address?.city && ', ' } { user.address?.city?.province?.name }
                                                </label>
                                                <br />
                                                <label>
                                                    { user.address?.city?.postalCode.split(',')[0] }
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            user.commPlaces?.length && (
                                                <>
                                                <div className="pt-2">
                                                    <Typography>Comedor: </Typography>
                                                    <Typography>
                                                        {user.commPlaces.find(cp => cp.type === 'community kitchen')?.name ?? ''}
                                                    </Typography>
                                                </div>
                                                <div className="pt-2">
                                                    <Typography>Economato: </Typography>
                                                    <Typography>
                                                        {user.commPlaces.find(cp => cp.type === 'company store')?.name ?? ''}
                                                    </Typography>
                                                </div>
                                                </>
                                            ) || null
                                        }
                                    </Card.Body>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid.Container>
            </Container>
        </Layout>
    )

}