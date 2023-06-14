import commPlaceApi from '@/api/commPlace.api';
import entityApi from '@/api/entity.api';
import { CommPlace, Entity } from '@/interfaces/entity.interface';
import { SelectChangeEvent, Box, Tabs, Tab, TextField, Typography, InputLabel } from '@mui/material';
import { Row, Col, Container, Radio } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FormControlBox } from '../boxes/FormControlBox';
import { TabPanel } from '../tabs/TabPanel';
import { AddressInfo } from '../user/registerUser/AddressInfo';
import Select from 'react-select';

interface Props {
    type?: 'create' | 'update';
    defaultValue?: CommPlace;
    callBack?: any;
}

export const PlaceRegister = ({ type = 'create', defaultValue, callBack }: Props) => {

    const { register, control, watch, formState: { errors, isValid }, handleSubmit, setValue, reset } = useForm();
    const [tab, setTab] = useState(0);
    const [addEntity, setAddEntity] = useState(false);
    const [entities, setEntities] = useState([] as Entity[]);
    const entitiesOptions = () => entities.map(e => ({ value: e.id, label: e.name }));
    const [entitiesAdd, setEntitiesAdd] = useState([] as number[]);
    const { push } = useRouter();

    const typeOptions = [
        { value: 'community kitchen', label: 'Comedor' },
        { value: 'company store', label: 'Economato' },
    ];

    useEffect(() => {
        if (type === 'update' || addEntity && !entities.length) {
            entityApi.getAllEntitys().then(setEntities);
        }
        if (defaultValue) {
            reset({
                name: defaultValue?.name,
                cif: defaultValue?.cif,
                type: defaultValue?.type,
                telephone: defaultValue?.telephone,
                address: {
                    state: defaultValue?.address?.state?.id,
                    province: defaultValue?.address?.province?.id,
                    city: defaultValue?.address?.city?.id,
                    ...defaultValue?.address,
                },
                entity: defaultValue?.entity?.map(e => e.id),
            });
            setEntitiesAdd(defaultValue?.entity?.map(e => e.id) ?? []);
        }
    }, [])

    let onsubmit = (dat: any) => console.log(dat);

    if (type === 'create') {

        onsubmit = (data: any) => {
            commPlaceApi.createPlace({
                ...data,
            })
                .then(() => push({ pathname: '/comedor/all' }))
        };
    } else if (type === 'update') {
        onsubmit = (data: any) => commPlaceApi.updatePlace(
            defaultValue?.id as number,
            {
                ...data,
            }
        ).then(() => callBack());
    }


    return (
        <form
            className="w-full pt-10"
            onSubmit={handleSubmit(onsubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
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
                            {
                                errors?.name && (
                                    <small className='text-red-500'>Requerido</small>
                                )
                            }
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
                            {
                                errors?.cif && (
                                    <small className='text-red-500'>Requerido</small>
                                )
                            }
                        </FormControlBox>
                        <FormControlBox>
                            <Controller
                                control={control}
                                name='type'
                                rules={{ required: false }}
                                render={
                                    ({ field }) => (
                                        <Select
                                            isDisabled={type === 'update'}
                                            {...field}
                                            styles={{
                                                container: (styles) => ({
                                                    ...styles,
                                                    width: '235px',
                                                })
                                            }}
                                            className='z-30'
                                            placeholder='Tipo de lugar'
                                            options={typeOptions}
                                            onChange={e => {
                                                setValue('type', e!.value);
                                            }}
                                            value={typeOptions.find(e => e.value === watch()?.type)}
                                        />
                                    )
                                }
                            />
                            {
                                errors?.type && (
                                    <small className='text-red-500'>Requerido</small>
                                )
                            }
                        </FormControlBox>
                        <FormControlBox>
                            <Controller
                                name='telephone'
                                control={control}
                                rules={{ required: true }}
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
                            {
                                errors?.telephone && (
                                    <small className='text-red-500'>Requerido</small>
                                )
                            }
                        </FormControlBox>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <AddressInfo control={control} watch={watch} setValue={setValue} defaultValue={defaultValue?.address} />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Container>
                            <Row>
                                <Col hidden={type === 'update'}>
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
                                    hidden={type === 'create' && addEntity === false}
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
                                                        isMulti
                                                        placeholder='Entidades'
                                                        styles={{
                                                            container: style => ({
                                                                ...style,
                                                                width: '235px',
                                                            }),
                                                        }}
                                                        className='z-40'
                                                        options={entitiesOptions()}
                                                        onChange={e => {
                                                            setEntitiesAdd(e.map(a => a.value));
                                                            setValue('entity', e.map(a => a.value));
                                                        }}
                                                        value={entitiesOptions().filter(e => entitiesAdd.includes(e.value))}
                                                    />
                                                )
                                            }
                                        />
                                    </FormControlBox>
                                </Col>
                            </Row>
                        </Container>
                    </TabPanel>
                </Box>
            </div>
            <div className="flex justify-center">
                <button
                    type='submit'
                    className={`w-64 cursor-pointer pt-2 pb-2 pl-3 pr-3 border rounded-lg text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200 ${Object.keys(errors).length ? ' bg-red-600 ' : 'bg-green-600 '}`}
                >
                    Enviar
                </button>
            </div>
        </form>
    )
}
