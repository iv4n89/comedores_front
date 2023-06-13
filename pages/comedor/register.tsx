import commPlaceApi from "@/api/commPlace.api";
import entityApi from "@/api/entity.api";
import { Layout } from "@/base/Layout";
import { FormControlBox } from "@/components/boxes/FormControlBox";
import { RoundedBox } from "@/components/boxes/RoundedBox";
import { TabPanel } from '@/components/tabs/TabPanel';
import { AddressInfo } from "@/components/user/registerUser/AddressInfo";
import { Entity } from "@/interfaces/entity.interface";
import { Button, Chip, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Col, Container, Radio, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";


export default function ComedorRegister() {

    const { register, control, watch, formState: { errors, isValid }, handleSubmit, setValue } = useForm();
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
                            <FormControlBox>
                                <Controller
                                    name='telephone'
                                    control={control}
                                    rules={{required: true}}
                                    render={
                                        ({ field }) => (
                                            <TextField
                                                {...field}
                                                color='secondary'
                                                label='Teléfono'
                                            />
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
                        <button
                            type='submit'
                            disabled={!isValid}
                            className={
                                isValid 
                                ? `pt-2 pb-2 pl-3 pr-3 border rounded-lg text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200 ${Object.keys(errors).length ? ' bg-red-600 ' : 'bg-green-600 '}`
                                : 'pt-2 pb-2 pl-3 pr-3 border rounded-lg text-white font-bold shadow-lg bg-gray-500'
                            }
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </RoundedBox>
        </Layout>
    )
}