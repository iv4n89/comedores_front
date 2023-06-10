import { Layout } from "@/base/Layout";
import { FormControlBox } from "@/components/boxes/FormControlBox";
import { RoundedBox } from "@/components/boxes/RoundedBox";
import { Button, Chip, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabPanel } from '@/components/tabs/TabPanel';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Col, Container, Radio, Row } from "@nextui-org/react";
import { City, Province, State } from "@/interfaces/user.interface";
import stateApi from "@/api/state.api";
import provinceApi from "@/api/province.api";
import cityApi from "@/api/city.api";
import { AddressSelects } from "@/components/address/AddressSelects";
import { AddressInfo } from "@/components/user/registerUser/AddressInfo";
import commPlaceApi from "@/api/commPlace.api";
import { useRouter } from "next/router";
import { Entity } from "@/interfaces/entity.interface";
import entityApi from "@/api/entity.api";


export default function ComedorRegister() {

    const { register, control, watch, formState: { errors }, handleSubmit, setValue } = useForm();
    const [tab, setTab] = useState(0);
    const [addEntity, setAddEntity] = useState(false);
    const [entities, setEntities] = useState([] as Entity[]);
    const [entitiesAdd, setEntitiesAdd] = useState([] as number[]);
    const { push } = useRouter();

    useEffect(() => {
        if (addEntity && !entities.length) {
            entityApi.getAllEntitys().then(setEntities);
        }
    })

    const onsubmit = (data: any) => {
        commPlaceApi.createPlace({ ...data, ...(addEntity && entitiesAdd.length && { entity: entitiesAdd }) }).then(() => push({ pathname: '/comedor/all' }))
    };
    const handleEntityAddChange = (event: SelectChangeEvent<typeof entitiesAdd>) => {
        const { target: { value } } = event;
        setEntitiesAdd(value as number[]);
    }

    return (
        <Layout>
            <RoundedBox>
                <form
                    className="w-full pt-10"
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Tabs
                            textColor="secondary"
                            indicatorColor="secondary"
                            value={tab}
                            onChange={(event, newValue) => setTab(newValue)}
                        >
                            <Tab label="Datos" />
                            <Tab label='Dirección' />
                            <Tab label='Agregar entidades' />
                        </Tabs>
                    </Box>
                    <Box
                        sx={{
                            minHeight: '400px',
                            height: '80%'
                        }}
                    >
                        <TabPanel value={tab} index={0}>
                            <FormControlBox>
                                <Controller
                                    control={control}
                                    name='name'
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) => (
                                            <TextField
                                                {...field}
                                                label='Nombre'
                                                color='secondary'
                                            />
                                        )
                                    }
                                />
                            </FormControlBox>
                            <FormControlBox>
                                <Controller
                                    control={control}
                                    name='cif'
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) => (
                                            <TextField
                                                {...field}
                                                label="CIF"
                                                color='secondary'
                                            />
                                        )
                                    }
                                />
                            </FormControlBox>
                            <FormControlBox>
                                <InputLabel color='secondary' id='type_id'>Tipo de lugar</InputLabel>
                                <Controller
                                    control={control}
                                    name='type'
                                    rules={{ required: false }}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                {...field}
                                                color='secondary'
                                                fullWidth
                                                label="Tipo de lugar"
                                                labelId='type_id'
                                                displayEmpty
                                                sx={{
                                                    width: '235px'
                                                }}
                                            >
                                                <MenuItem value='community kitchen'>Comedor</MenuItem>
                                                <MenuItem value='company store'>Economato</MenuItem>
                                            </Select>
                                        )
                                    }
                                />
                            </FormControlBox>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <AddressInfo control={control} watch={watch} setValue={setValue} />
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            <Container>
                                <Row>
                                    <Col>
                                        <FormControlBox>
                                            <Typography>
                                                ¿Quiere agregar entidades a este {watch()?.type === 'community kitchen' ? 'comedor' : watch()?.type === 'company store' ? 'economato' : ''}?
                                            </Typography>
                                            <FormControlBox>
                                                <Radio.Group
                                                    label='Agregar entidades'
                                                    defaultValue='0'
                                                    value={addEntity ? '1' : '0'}
                                                    onChange={e => setAddEntity(e === '1' ? true : false)}
                                                >
                                                    <Radio value='1'>Sí</Radio>
                                                    <Radio value='0'>No</Radio>
                                                </Radio.Group>
                                            </FormControlBox>
                                        </FormControlBox>
                                    </Col>
                                    <Col
                                        hidden={addEntity === false}
                                    >
                                        <FormControlBox>
                                            <InputLabel id='ent-id'>Entidades</InputLabel>
                                            <Controller
                                                name='entity'
                                                control={control}
                                                rules={{ required: false }}
                                                render={
                                                    ({ field }) => (
                                                        <Select
                                                            {...field}
                                                            label='Entidades'
                                                            labelId='ent-id'
                                                            displayEmpty
                                                            color='secondary'
                                                            fullWidth
                                                            multiple
                                                            value={entitiesAdd}
                                                            onChange={handleEntityAddChange}
                                                            sx={{
                                                                width: '235px'
                                                            }}
                                                            renderValue={(selected) => (
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexWrap: 'wrap',
                                                                        gap: 0.5
                                                                    }}
                                                                >
                                                                    {
                                                                        selected.map(value => (
                                                                            <Chip
                                                                                key={value}
                                                                                label={entities.find(ent => ent.id === value)?.name}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Box>
                                                            )}
                                                        >
                                                            {
                                                                entities.map(ent => (
                                                                    <MenuItem
                                                                        key={ent.id}
                                                                        value={ent.id}
                                                                    >
                                                                        {ent.name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                    </Col>
                                </Row>
                            </Container>
                        </TabPanel>
                    </Box>
                    <div>
                        <Button
                            variant='outlined'
                            color="secondary"
                            type='submit'
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </RoundedBox>
        </Layout>
    )
}