import commPlaceApi from '@/api/commPlace.api';
import entityApi from '@/api/entity.api';
import { CommPlace, Entity } from '@/interfaces/entity.interface';
import { Box, Tabs, Tab, Typography, TextField } from '@mui/material';
import { Row, Col, Container, Radio } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FormControlBox } from '../boxes/FormControlBox';
import { RoundedBox } from '../boxes/RoundedBox';
import { TabPanel } from '../tabs/TabPanel';
import Select from 'react-select';

interface Props {
    type?: 'create' | 'update';
    defaultValue?: Entity;
    callBack?: any;
}

export const EntityForm = ({ type = 'create', defaultValue, callBack }: Props) => {

    const [tab, setTab] = useState(0);
    const [addPlaces, setAddPlaces] = useState(false);
    const [places, setPlaces] = useState([] as CommPlace[]);
    const [comedores, setComedores] = useState([] as number[]);
    const comedoresOptions = () => places.filter(p => p.type === 'community kitchen').map(e => ({ value: e.id, label: e.name }));
    const [economatos, setEconomatos] = useState([] as number[]);
    const economatosOptions = () => places.filter(p => p.type === 'company store').map(e => ({ value: e.id, label: e.name }));
    const { control, handleSubmit, watch, formState: { errors, isDirty }, setValue, reset } = useForm();
    const { push } = useRouter();
    const tarifaOptions = [
        { value: 0.5, label: '0.5' },
        { value: 0.75, label: '0.75' },
        { value: 2.5, label: '2.5' }
    ]

    let onSubmit = (data: any) => console.log(data);

    if (type === 'create') {
        onSubmit = async (data: any) => {
            await entityApi.createEntity({
                ...data,
                applicableRate: Number(data.applicableRate) as any,
                places: [...comedores, ...economatos],
            });
            push({
                pathname: '/entidad/all'
            });
        }
    } else if (type === 'update') {
        onSubmit = async (data: any) => {
            await entityApi.updateEntity(defaultValue!.id, {
                ...data,
                applicableRate: Number(data.applicableRate) as any,
                places: [...comedores, ...economatos],
            });
            callBack?.();
        }
    }

    useEffect(() => {
        commPlaceApi.getAllPlaces().then(setPlaces);
        if (defaultValue) {
            reset({
                name: defaultValue?.name,
                nif: defaultValue?.nif,
                applicableRate: defaultValue?.applicableRate,
                person: {
                    name: defaultValue.person?.name,
                    surname: defaultValue.person?.surname,
                    telephone: defaultValue.person?.telephone
                },
            });
            setComedores(defaultValue?.commPlaces?.filter(e => e.type === 'community kitchen')?.map(e => e.id) as number[] ?? []);
            setEconomatos(defaultValue?.commPlaces?.filter(e => e.type === 'company store')?.map(e => e.id) as number[] ?? []);
        }
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full pt-10'>
            <RoundedBox
                sx={{
                    height: '65vh',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                row={false}
            >
                <div>
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
                                <FormControlBox rowStyle={{
                                    marginBottom: '10px',
                                    marginTop: '20px',
                                }}>
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
                                <FormControlBox rowStyle={{
                                    marginBottom: '10px'
                                }}>
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
                                <FormControlBox rowStyle={{
                                    marginBottom: '10px'
                                }}>
                                    <Controller
                                        control={control}
                                        name='applicableRate'
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => {
                                                return (
                                                    <Select
                                                        placeholder='Tarifa aplicable'
                                                        styles={{
                                                            container: style => ({
                                                                ...style,
                                                                width: '235px'
                                                            })
                                                        }}
                                                        className='z-40'
                                                        options={tarifaOptions}
                                                        {...field}
                                                        onChange={e => {
                                                            setValue('applicableRate', e!.value);
                                                        }}
                                                        value={tarifaOptions.find(e => e.value === watch()?.applicableRate)}
                                                    />
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
                                <FormControlBox rowStyle={{
                                    marginBottom: '10px',
                                    marginTop: '20px',
                                }}>
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
                                <FormControlBox rowStyle={{
                                    marginBottom: '10px'
                                }}>
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
                                <FormControlBox rowStyle={{
                                    marginBottom: '10px'
                                }}>
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
                                <Col hidden={type === 'update'}>
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
                                <Col hidden={!addPlaces && type === 'create'}>
                                    <FormControlBox
                                        hidden={!addPlaces}
                                        rowStyle={{
                                            marginBottom: '10px'
                                        }}
                                    >
                                        <Controller
                                            control={control}
                                            name='places'
                                            rules={{ required: false }}
                                            render={
                                                ({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Comedores'
                                                        styles={{
                                                            container: style => ({
                                                                ...style,
                                                                width: '235px'
                                                            })
                                                        }}
                                                        isClearable
                                                        isMulti
                                                        className='z-50'
                                                        options={comedoresOptions()}
                                                        onChange={e => {
                                                            setComedores(e.map(a => a.value));
                                                        }}
                                                        defaultValue={defaultValue?.commPlaces?.filter(e => e.type === 'community kitchen')?.map(e => ({ value: e.id, label: e.name }))}
                                                    />
                                                )
                                            }
                                        />
                                    </FormControlBox>
                                    <FormControlBox
                                        hidden={!addPlaces}
                                    >
                                        <Controller
                                            control={control}
                                            name='places'
                                            rules={{ required: false }}
                                            render={
                                                ({ field }) => (
                                                    <Select
                                                        {...field}
                                                        isMulti
                                                        isClearable
                                                        placeholder='Economatos'
                                                        styles={{
                                                            container: style => ({
                                                                ...style,
                                                                width: '235px'
                                                            })
                                                        }}
                                                        className='z-40'
                                                        options={economatosOptions()}
                                                        onChange={e => {
                                                            setEconomatos(e.map(a => a.value));
                                                        }}
                                                        defaultValue={defaultValue?.commPlaces?.filter(e => e.type === 'company store')?.map(e => ({ value: e.id, label: e.name }))}
                                                    />
                                                )
                                            }
                                        />
                                    </FormControlBox>
                                </Col>
                            </Row>
                        </Container>
                    </TabPanel>
                </div>
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className={
                            `w-64 pt-2 pb-2 pl-3 pr-3 border rounded-lg text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200 ${Object.keys(errors).length ? ' bg-red-600 ' : 'bg-green-600 '}`
                        }
                    >
                        Enviar
                    </button>
                </div>
            </RoundedBox>
        </form>
    )
}
