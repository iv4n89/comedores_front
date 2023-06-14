import commPlaceApi from '@/api/commPlace.api'
import userApi from '@/api/user.api'
import { FormControlBox } from '@/components/boxes/FormControlBox'
import { TabPanel } from '@/components/tabs/TabPanel'
import { CommPlace } from '@/interfaces/entity.interface'
import { Box, InputLabel, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AddressInfo } from './AddressInfo'
import { PersonalInfo } from './PersonalInfo';
import Select from 'react-select';

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
            .updateUser(defaultValue.id, {
                ...data,
                ...(places && { places: [places?.kitchen, places?.store] })
            })
            .then(() => callBack());
    }

    const [kitchens, setKitchens] = useState([] as CommPlace[]);
    const kitchenOptions = () => kitchens.map(e => ({ value: e.id, label: e.name }));
    const [stores, setStores] = useState([] as CommPlace[]);
    const storeOptions = () => stores.map(e => ({ value: e.id, label: e.name }));
    const [places, setPlaces] = useState({
        kitchen: 0,
        store: 0,
    });

    const [tab, setTab] = useState(0);

    useEffect(() => {
        commPlaceApi.getKitchens().then(setKitchens);
        commPlaceApi.getStores().then(setStores);
        if (defaultValue) {
            if (defaultValue?.commPlaces) {
                setPlaces({
                    kitchen: defaultValue?.commPlaces?.find((e: CommPlace) => e.type === 'community kitchen')?.id ?? 0,
                    store: defaultValue?.commPlaces?.find((e: CommPlace) => e.type === 'company store')?.id ?? 0,
                })
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            >
                <div>
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
                            <PersonalInfo watch={watch} control={control} defaultValue={defaultValue} setValue={setValue} />
                        </Box>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <AddressInfo control={control} watch={watch} defaultValue={defaultValue?.address} setValue={setValue} />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <FormControlBox rowStyle={{
                            marginBottom: '10px'
                        }}>
                            <Controller
                                name='kitchen'
                                control={control}
                                render={
                                    ({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder='Comedor'
                                            options={kitchenOptions()}
                                            styles={{
                                                container: style => ({
                                                    ...style,
                                                    width: '100%'
                                                })
                                            }}
                                            onChange={e => {
                                                setPlaces(a => ({
                                                    ...a,
                                                    kitchen: e!.value as number,
                                                }))
                                            }}
                                            value={kitchenOptions().find(e => e.value === places.kitchen)}
                                            className='z-40'
                                        />
                                    )
                                }
                            />
                        </FormControlBox>
                        <FormControlBox rowStyle={{
                            marginBottom: '10px'
                        }}>
                            <InputLabel id='sto-id'>Economato</InputLabel>
                            <Controller
                                name='store'
                                control={control}
                                render={
                                    ({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder='Economato'
                                            options={storeOptions()}
                                            styles={{
                                                container: style => ({
                                                    ...style,
                                                    width: '100%'
                                                })
                                            }}
                                            value={storeOptions().find(e => e.value === places.store)}
                                            className='z-30'
                                            onChange={e => {
                                                setPlaces(a => ({
                                                    ...a,
                                                    store: e!.value as number,
                                                }))
                                            }}
                                        />
                                    )
                                }
                            />
                        </FormControlBox>
                    </TabPanel>
                </div>
                <div className="flex justify-center">
                    <button
                        type='submit'
                        className='w-64 pt-2 pb-2 pl-3 pr-3 border rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200'
                    >
                        Enviar
                    </button>
                </div>
            </Box>
        </form>
    )
}
