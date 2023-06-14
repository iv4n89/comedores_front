import commPlaceApi from "@/api/commPlace.api";
import { Layout } from "@/base/Layout";
import { TypeBox } from "@/components/boxes/TypeBox";
import { ComedorCard } from "@/components/cards/ComedorCard";
import { PlaceRegister } from "@/components/comedor/PlaceRegister";
import { CommPlace, Entity } from "@/interfaces/entity.interface";
import { capitalizeWord } from "@/util/strUtils";
import { Box, Chip, Typography } from "@mui/material";
import { Badge, Card, Container, Grid, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function ComedorAll() {

    const [comedores, setComedores] = useState([] as CommPlace[]);

    useEffect(() => {
        commPlaceApi.getAllPlaces().then(setComedores);
    }, [])

    return (
        <Layout>
            <Container fluid>
                <TypeBox
                    backgroundColor='rgba(54, 201, 78, 0.4)'
                    label='Comedores'
                >
                    <Grid.Container gap={2} justify='center'>
                        {
                            comedores.filter(e => e.type === 'community kitchen')
                                .map(e => (
                                    <ComedorCard
                                        com={e}
                                        setComedores={setComedores}
                                        key={e.id}
                                    />
                                ))
                        }
                    </Grid.Container>
                </TypeBox>
                <div className="mt-5"></div>
                <TypeBox
                    backgroundColor="rgba(138, 19, 209, 0.4)"
                    label='Economatos'
                >
                    <Grid.Container gap={2} justify='center'>
                        {
                            comedores.filter(e => e.type === 'company store')
                                .map(e => (
                                    <ComedorCard
                                        com={e}
                                        setComedores={setComedores}
                                        key={e.id}
                                    />
                                ))
                        }
                    </Grid.Container>
                </TypeBox>
            </Container>
        </Layout>
    )
}