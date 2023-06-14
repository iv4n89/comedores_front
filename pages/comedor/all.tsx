import commPlaceApi from "@/api/commPlace.api";
import { Layout } from "@/base/Layout";
import { TypeBox } from "@/components/boxes/TypeBox";
import { ComedorCard } from "@/components/cards/ComedorCard";
import { CommPlace } from "@/interfaces/entity.interface";
import { Box, TextField, Typography } from "@mui/material";
import { Container, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Select from "react-select";

function removeDuplicates(arr: Array<{ label: string, value: number }>) {
    let unique: Array<{ label: string, value: number }> = [];
    arr.forEach(element => {
        if (!unique.some(e => e.value === element.value)) {
            unique.push(element);
        }
    });
    return unique;
}

export default function ComedorAll() {

    const [comedores, setComedores] = useState([] as CommPlace[]);
    const plStateOptions = () => removeDuplicates(comedores.map(comedor => comedor.address?.state).map(comunidad => ({ value: comunidad?.id, label: comunidad?.name })) as any);
    const plProvinceOptions = () => removeDuplicates(comedores.map(comedor => comedor.address?.province).map(province => ({ value: province?.id, label: province?.name })) as any);
    const plCityOptions = () => removeDuplicates(comedores.map(comedor => comedor.address?.city).map(city => ({ value: city?.id, label: city?.name })) as any);
    const [filter, setFilter] = useState({
        name: '',
        state: 0,
        province: 0,
        city: 0,
    })

    useEffect(() => {
        commPlaceApi.getAllPlaces().then(setComedores);
    }, [])

    return (
        <Layout>
            <Container fluid>
                <Typography align="center" sx={{
                    position: 'relative',
                    top: 5,
                }}>Filtros</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '20px 10px 10px 10px',
                        backgroundColor: 'whitesmoke',
                        borderRadius: '15px',
                        marginBottom: '10px',
                    }}
                >
                    <TextField
                        label='Nombre...'
                        onChange={e => {
                            setFilter(f => ({
                                ...f,
                                name: e.target.value
                            }))
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography align="center">Comunidad</Typography>
                        <Select
                            isClearable
                            options={plStateOptions()}
                            onChange={e => {
                                setFilter(f => ({
                                    ...f,
                                    state: e?.value as number,
                                }))
                            }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography align="center">Provincia</Typography>

                        <Select
                            isClearable
                            options={plProvinceOptions()}
                            onChange={e => {
                                setFilter(f => ({
                                    ...f,
                                    province: e?.value as number,
                                }))
                            }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography align="center">Ciudad</Typography>

                        <Select
                            isClearable
                            options={plCityOptions()}
                            onChange={e => {
                                setFilter(f => ({
                                    ...f,
                                    city: e?.value as number,
                                }))
                            }}
                        />
                    </div>
                </Box>
                <TypeBox
                    backgroundColor='rgba(54, 201, 78, 0.4)'
                    label='Comedores'
                >
                    <Grid.Container gap={2} justify='center'>
                        {
                            comedores.filter(e => e.type === 'community kitchen')
                                .filter(e => e.name?.toLowerCase().includes(filter.name.toLowerCase()))
                                .filter(e => filter.state > 0 ? e.address?.state?.id === filter?.state : e)
                                .filter(e => filter.province > 0 ? e.address?.province?.id === filter?.province : e)
                                .filter(e => filter.city > 0 ? e.address?.city?.id === filter?.city : e)
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
                <div className="mt-5 mb-10"></div>
                <TypeBox
                    backgroundColor="rgba(138, 19, 209, 0.4)"
                    label='Economatos'
                >
                    <Grid.Container gap={2} justify='center'>
                        {
                            comedores.filter(e => e.type === 'company store')
                                .filter(e => e.name?.toLowerCase().includes(filter.name.toLowerCase()))
                                .filter(e => filter.state > 0 ? e.address?.state?.id === filter?.state : e)
                                .filter(e => filter.province > 0 ? e.address?.province?.id === filter?.province : e)
                                .filter(e => filter.city > 0 ? e.address?.city?.id === filter?.city : e)
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