import commPlaceApi from '@/api/commPlace.api'
import userApi from '@/api/user.api'
import { FormControlBox } from '@/components/boxes/FormControlBox'
import { TabPanel } from '@/components/tabs/TabPanel'
import { CommPlace } from '@/interfaces/entity.interface'
import { Box, Tabs, Tab, InputLabel, Select, MenuItem } from '@mui/material'
import { watch } from 'fs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AddressInfo } from './AddressInfo'
import { PersonalInfo } from './PersonalInfo'

interface Props {
    type: 'create' | 'update';
    defaultValue?: any;
    callBack?: any;
}

export const UserForm = ({ type, defaultValue, callBack }: Props) => {

    const {
        control,
        reset,
        watch,
        formState:
        {
            errors,
            isSubmitSuccessful,
            isSubmitted,
            isSubmitting
        },
        handleSubmit,
        register,
        setValue
    } = useForm();
    const { push } = useRouter();
    let onSubmit = (data: any) => console.log(data);

    if (type === 'create') {
        onSubmit = (data: any) => userApi
            .createUser({
                ...data,
                places: [places.kitchen, places.store],
            })
            .then((res) => res!.status === 201 && push({ pathname: '/user/all' }));
    } else if (type === 'update') {
        onSubmit = (data: any) => userApi
            .updateUser(defaultValue.id, data)
            .then(() => callBack());
    }

    const [kitchens, setKitchens] = useState([] as CommPlace[]);
    const [stores, setStores] = useState([] as CommPlace[]);
    const [places, setPlaces] = useState({
        kitchen: 0,
        store: 0,
    });

    const [tab, setTab] = useState(0);

    useEffect(() => {
        commPlaceApi.getKitchens().then(setKitchens);
        commPlaceApi.getStores().then(setStores);

        if (type === 'update') {
            if (defaultValue && defaultValue?.address?.state) {

            }
        }
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                width: '100%',
                border: '1px solid rgba(138,19,209,0.3)',
                borderRadius: '25px',
                p: 3,
                height: '65vh',
                position: 'relative',
                paddingBottom: '60px',
                boxShadow: 1,
                backgroundColor: 'white',
            }}
            >
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                >
                    <Tabs
                        textColor='secondary'
                        indicatorColor='secondary'
                        value={tab}
                        onChange={(event, newValue) => setTab(newValue)}
                    >
                        <Tab label="Datos personales" />
                        <Tab label="Dirección" />
                        <Tab label="Comedor/Economato" />
                    </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                    <Box
                        sx={{
                            height: '400px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <PersonalInfo control={control} defaultValue={defaultValue} />
                    </Box>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <AddressInfo control={control} watch={watch} defaultValue={defaultValue?.address} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <FormControlBox>
                        <InputLabel id='come-id'>Comedor</InputLabel>
                        <Controller
                            name='kitchen'
                            control={control}
                            render={
                                ({ field }) => (
                                    <Select
                                        {...field}
                                        label='Comedores'
                                        labelId='com-id'
                                        displayEmpty
                                        color='secondary'
                                        fullWidth
                                        defaultValue={!!defaultValue && defaultValue?.commPlaces?.filter((p: CommPlace) => p.type === 'community kitchen').map((p: CommPlace) => p.id)}
                                        value={places.kitchen}
                                        onChange={e => setPlaces(p => ({ ...p, kitchen: Number(e.target.value) }))}
                                        sx={{
                                            width: '235px'
                                        }}
                                    >
                                        {
                                            kitchens.map(k => (
                                                <MenuItem key={k.id} value={k.id}>
                                                    {k.name}, {k.address?.streetName} {k.address?.streetNumber} <br /> {k.address?.city?.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        />
                    </FormControlBox>
                    <FormControlBox>
                        <InputLabel id='sto-id'>Economato</InputLabel>
                        <Controller
                            name='store'
                            control={control}
                            render={
                                ({ field }) => (
                                    <Select
                                        {...field}
                                        label='Economato'
                                        labelId='sto-id'
                                        displayEmpty
                                        color='secondary'
                                        fullWidth
                                        defaultValue={!!defaultValue && defaultValue?.commPlaces?.filter((p: CommPlace) => p.type === 'company store').map((p: CommPlace) => p.id)}
                                        value={places.store}
                                        sx={{
                                            width: '235px',
                                        }}
                                        onChange={e => setPlaces(p => ({ ...p, store: Number(e.target.value) }))}
                                    >
                                        {
                                            stores.map(s => (
                                                <MenuItem key={s.id} value={s.id}>
                                                    {s.name}, {s.address?.streetName} {s.address?.streetNumber} <br /> {s.address?.city?.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        />
                    </FormControlBox>
                </TabPanel>
                <div className="mb-3 pt-3 pl-28 absolute bottom-2">
                    <button
                        type='button'
                        onClick={e => setTab(tab => tab < 2 ? tab + 1 : tab)}
                        className='pt-2 pb-2 pl-3 pr-3 border rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200'
                        hidden={tab === 2}
                    >
                        Siguiente
                    </button>
                    <button
                        type='submit'
                        hidden={tab !== 2}
                        className='pt-2 pb-2 pl-3 pr-3 border rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200'
                    >
                        Enviar
                    </button>
                    <pre>
                        {JSON.stringify(watch(), null, 2)}
                    </pre>
                </div>
            </Box>
            <pre>
                {JSON.stringify(defaultValue, null, 2)}
            </pre>
        </form>
    )
}
