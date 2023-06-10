import commPlaceApi from '@/api/commPlace.api';
import entityApi from '@/api/entity.api';
import { Layout } from '@/base/Layout';
import { FormControlBox } from '@/components/boxes/FormControlBox';
import { RoundedBox } from '@/components/boxes/RoundedBox';
import { TabPanel } from '@/components/tabs/TabPanel';
import { CommPlace, Entity } from '@/interfaces/entity.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Chip, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Col, Container, Radio, Row } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function EntidadRegister() {

    const [tab, setTab] = useState(0);
    const [addPlaces, setAddPlaces] = useState(false);
    const [places, setPlaces] = useState([] as CommPlace[]);
    const [comedores, setComedores] = useState([] as number[]);
    const [economatos, setEconomatos] = useState([] as number[]);
    const { control, handleSubmit, watch, formState: { errors, isDirty } } = useForm();
    const { push } = useRouter();
    const onSubmitTest = (data: any) => console.log(data);
    const onSubmit = async (data: any) => {
        const entity = await entityApi.createEntity({
            ...data,
            applicableRate: Number(data.applicableRate) as any,
        });
        if (addPlaces) {
            let _places: number[] = []
            if (comedores.length) {
                _places = [..._places, ...comedores];
            }

            if (economatos.length) {
                _places = [..._places, ...economatos];
            }

            for (const pl of _places) {
                await commPlaceApi.updatePlace(pl, { entity: [entity.id as any] });
            }
        }
        push({
            pathname: '/entidad/all'
        });
    }

    useEffect(() => {
        commPlaceApi.getAllPlaces().then(setPlaces);
    }, [])

    return (
        <Layout>
            <div style={{
                minHeight: '100vh'
            }}>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontWeight: 'bolder'
                    }}
                    className='pb-5'
                >
                    Registro de entidades
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full pt-10'>
                    <RoundedBox sx={{ height: '40vh', backgroundColor: 'white' }} row={false}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Tabs
                                textColor='secondary'
                                indicatorColor='secondary'
                                value={tab}
                                onChange={(event, newValue) => setTab(newValue)}
                            >
                                <Tab label='Datos' />
                                <Tab label='Lugares' />
                            </Tabs>
                        </Box>
                        <TabPanel value={tab} index={0}>
                            <Row>
                                <Col>
                                    <Typography>
                                        Datos de la entidad:
                                    </Typography>
                                    <FormControlBox>
                                        <Controller
                                            control={control}
                                            name='name'
                                            render={
                                                ({ field }) => {
                                                    return (
                                                        <TextField
                                                            label='Nombre'
                                                            color='secondary'
                                                            {...field}
                                                        />
                                                    )
                                                }
                                            }
                                        />
                                    </FormControlBox>
                                    <FormControlBox>
                                        <Controller
                                            control={control}
                                            name='nif'
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) => {
                                                    return (
                                                        <TextField
                                                            label='NIF'
                                                            color='secondary'
                                                            {...field}
                                                        />
                                                    )
                                                }
                                            }
                                        />
                                        {errors.nif && (
                                            <small className='text-red-600'>
                                                Requerido
                                            </small>
                                        )}
                                    </FormControlBox>
                                    <FormControlBox>
                                        <InputLabel id='tarifa'>Tarifa aplicable</InputLabel>
                                        <Controller
                                            control={control}
                                            name='applicableRate'
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) => {
                                                    return (
                                                        <Select
                                                            label='Tarifa aplicable'
                                                            labelId='tarifa'
                                                            color='secondary'
                                                            autoWidth
                                                            sx={{
                                                                minWidth: '235px'
                                                            }}
                                                            {...field}
                                                        >
                                                            <MenuItem value='0.5'>0.5</MenuItem>
                                                            <MenuItem value='0.75'>0.75</MenuItem>
                                                            <MenuItem value='2.5'>2.5</MenuItem>
                                                        </Select>
                                                    )
                                                }
                                            }
                                        />
                                    </FormControlBox>
                                </Col>
                                <Col>
                                    <Typography>
                                        Datos de la persona responsable:
                                    </Typography>
                                    <FormControlBox>
                                        <Controller
                                            control={control}
                                            name='person.name'
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) => {
                                                    return (
                                                        <TextField
                                                            label='Nombre del responsable'
                                                            {...field}
                                                            color='secondary'
                                                        />
                                                    )
                                                }
                                            }
                                        />
                                    </FormControlBox>
                                    <FormControlBox>
                                        <Controller
                                            control={control}
                                            name='person.surname'
                                            render={
                                                ({ field }) => {
                                                    return (
                                                        <TextField
                                                            {...field}
                                                            label='Apellidos del responsable'
                                                            color='secondary'
                                                        />
                                                    )
                                                }
                                            }
                                        />
                                    </FormControlBox>
                                    <FormControlBox>
                                        <Controller
                                            control={control}
                                            name='person.telephone'
                                            rules={{ required: true }}
                                            render={
                                                ({ field }) => {
                                                    return (
                                                        <TextField
                                                            {...field}
                                                            label='Teléfono del responsable'
                                                            color='secondary'
                                                        />
                                                    )
                                                }
                                            }
                                        />
                                    </FormControlBox>
                                </Col>
                            </Row>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <Container>
                                <Row>
                                    <Col>
                                        <FormControlBox>
                                            <Typography>
                                                ¿Desea agregar lugares a esta entidad?
                                            </Typography>
                                            <Radio.Group
                                                label='Agregar lugares'
                                                defaultValue='0'
                                                onChange={e => setAddPlaces(e === '1')}
                                                value={addPlaces ? '1' : '0'}
                                            >
                                                <Radio value='1'>Si</Radio>
                                                <Radio value='0'>No</Radio>
                                            </Radio.Group>
                                        </FormControlBox>
                                    </Col>
                                        <FormControlBox>
                                            <InputLabel id='pla-id'>Comedores</InputLabel>
                                            <Controller
                                                control={control}
                                                name='places'
                                                rules={{ required: false }}
                                                render={
                                                    ({field}) => (
                                                        <Select
                                                            {...field}
                                                            label='Comedores'
                                                            labelId='pla-id'
                                                            displayEmpty
                                                            color='secondary'
                                                            fullWidth
                                                            multiple
                                                            value={comedores}
                                                            onChange={(e) => setComedores(e.target.value as number[])}
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
                                                                                label={places.find(pl => pl.id === value)?.name}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Box>
                                                            )}
                                                        >
                                                            {
                                                                places
                                                                    .filter(pl => pl.type === 'community kitchen')
                                                                    .map(pl => (
                                                                        <MenuItem
                                                                            key={pl.id}
                                                                            value={pl.id}
                                                                        >
                                                                            {pl.name}
                                                                        </MenuItem>
                                                                    ))
                                                            }
                                                        </Select>
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                        <FormControlBox
                                            hidden={!addPlaces}
                                        >
                                            <InputLabel id='pla2-id'>Economatos</InputLabel>
                                            <Controller
                                                control={control}
                                                name='places'
                                                rules={{ required: false }}
                                                render={
                                                    ({field}) => (
                                                        <Select
                                                            {...field}
                                                            label='Economatos'
                                                            labelId='pla2-id'
                                                            displayEmpty
                                                            color='secondary'
                                                            fullWidth
                                                            multiple
                                                            value={economatos}
                                                            onChange={(e) => setEconomatos(e.target.value as number[])}
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
                                                                                label={places.find(pl => pl.id === value)?.name}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Box>
                                                            )}
                                                        >
                                                            {
                                                                places
                                                                    .filter(pl => pl.type === 'company store')
                                                                    .map(pl => (
                                                                        <MenuItem
                                                                            key={pl.id}
                                                                            value={pl.id}
                                                                        >
                                                                            {pl.name}
                                                                        </MenuItem>
                                                                    ))
                                                            }
                                                        </Select>
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                    <Col>
                                    </Col>
                                </Row>
                            </Container>
                        </TabPanel>
                        <button
                            type='submit'
                            className={
                                `absolute bottom-0 pt-2 pb-2 pl-3 pr-3 border rounded-lg text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200 ${Object.keys(errors).length ? ' bg-red-600 ' : 'bg-green-600 '}`
                            }
                        >
                            Enviar
                        </button>
                    </RoundedBox>
                </form>
            </div>
        </Layout>
    )

}