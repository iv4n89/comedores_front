import commPlaceApi from "@/api/commPlace.api";
import { Layout } from "@/base/Layout";
import { CommPlace, Entity } from "@/interfaces/entity.interface";
import { capitalizeWord } from "@/util/strUtils";
import { Typography } from "@mui/material";
import { Badge, Card, Container, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function ComedorAll() {

    const [comedores, SetComedores] = useState([] as CommPlace[]);

    useEffect(() => {
        commPlaceApi.getAllPlaces().then(SetComedores);
    }, [])

    return (
        <Layout>
            <Container fluid>
                <Grid.Container gap={2} justify='center'>
                    {
                        comedores.map(com => (
                            <Grid xs={4} key={com.id}>
                                <Card
                                    isHoverable
                                    isPressable
                                >
                                    <Card.Header
                                        style={{
                                            backgroundColor: com.type === 'community kitchen' ? '#36C964' : '#8A13D1',
                                            margin: 0,
                                            color: com.type === 'community kitchen' ? 'black' : 'white',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 'bolder'
                                            }}
                                        >
                                            {com.name}
                                        </Typography>
                                    </Card.Header>
                                    <Card.Body>
                                        <Typography>
                                            Tipo: {com.type === 'community kitchen' ? 'Comedor' : 'Economato'}
                                        </Typography>
                                        <div>
                                            <span>
                                                Dirección:
                                            </span>
                                            <div className="rounded-md border border-green-400 p3 mt-2">
                                                <label>
                                                    {capitalizeWord(com?.address?.addrType as string)} {com?.address?.streetName} Número {com?.address?.streetNumber}
                                                </label>
                                                <br />
                                                <label>
                                                    {com?.address?.city?.name}{com?.address?.city && ', '} {com?.address?.city?.province?.name}
                                                </label>
                                                <br />
                                                <label>
                                                    {com?.address?.city?.postalCode.split(',')[0]}
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            com.entity?.length && (
                                                <div className="pt-2">
                                                    <Typography>Entidades: </Typography>
                                                    <div className="p3 mt-2">
                                                        {
                                                            com.entity.map((e: Entity) => (
                                                                <Badge key={e.id}>
                                                                    { e.name }
                                                                </Badge>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
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