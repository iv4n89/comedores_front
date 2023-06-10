import cityApi from '@/api/city.api';
import provinceApi from '@/api/province.api';
import stateApi from '@/api/state.api';
import { State, Province, City } from '@/interfaces/user.interface';
import { InputLabel, Select, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';
import { FormControlBox } from '../boxes/FormControlBox';

interface Props {
    control: any;
    watch: any;
    setValue?: UseFormSetValue<FieldValues>;
}

export const AddressSelects = ({ control, watch, setValue }: Props) => {

    const [states, setStates] = useState<State[]>([] as State[]);
    const [provinces, setProvinces] = useState<Province[]>([] as Province[]);
    const [cities, setCities] = useState<City[]>([] as City[]);

    useEffect(() => {
        stateApi.getAllStates().then(setStates);
    }, [])

    useEffect(() => {
        if (Number(watch()?.address?.state) && Number(watch()?.address?.state) > 0) {
            provinceApi.getProvincesByState(Number(watch()?.address?.state)).then(setProvinces);
        }
    }, [watch()?.address?.state])

    useEffect(() => {
        if (Number(watch()?.address?.province) && Number(watch()?.address?.province) > 0) {
            cityApi.getCitiesByProvince(Number(watch()?.address?.province)).then(setCities);
        }
    }, [watch()?.address?.province])

    useEffect(() => {
        const city = cities.find(c => c.id == watch()?.address?.city);
        const postalCode = city?.postalCode?.split(',')?.find(c => Number(c) > 10000);
        !!setValue && setValue('address.postalCode', postalCode);
    }, [watch()?.address?.city])

    useEffect(() => {
        if (Number(watch()?.address?.postalCode) > 10000) {
            const city: City | undefined = cities?.find(c => !!c.postalCode.length && c.postalCode.split(',').includes(watch()?.address?.postalCode));
            const province: Province | undefined = city?.province;
            const state: State | undefined = province?.state;
            !!state && provinceApi.getProvincesByState(state?.id).then(setProvinces);
            !!province && cityApi.getCitiesByProvince(province?.id).then(setCities);
            !!setValue && setValue('address.state', state?.id);
            !!setValue && setValue('address.province', province?.id);
            !!setValue && setValue('address.city', city?.id);
        }
    }, [watch()?.address?.postalCode])

    return (
        <>
            <FormControlBox>
                <InputLabel id='comun_id'>Comunidad Autónoma</InputLabel>
                <Controller
                    name='address.state'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <Select
                                {...field}
                                color='secondary'
                                fullWidth
                                label='Comunidad Autónoma'
                                labelId='comun_id'
                                displayEmpty
                                sx={{
                                    width: '235px'
                                }}
                            >
                                {
                                    states.map(st => (
                                        <MenuItem key={st.id} value={st.id}>{st.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        )
                    }
                />
            </FormControlBox>
            <FormControlBox>
                <InputLabel id='prov_id'>Provincia</InputLabel>
                <Controller
                    name='address.province'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <Select
                                {...field}
                                color='secondary'
                                fullWidth
                                label='Provincia'
                                labelId="prov_id"
                                displayEmpty
                                sx={{
                                    width: '235px'
                                }}
                            >
                                {
                                    provinces.map(prov => (
                                        <MenuItem key={prov.id} value={prov.id}>{prov.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        )
                    }
                />
            </FormControlBox>
            <FormControlBox>
                <InputLabel id='cit_id'>Ciudad</InputLabel>
                <Controller
                    name='address.city'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <Select
                                {...field}
                                color='secondary'
                                fullWidth
                                label='Ciudad'
                                labelId="cit_id"
                                displayEmpty
                                sx={{
                                    width: '235px'
                                }}
                            >
                                {
                                    cities.map(cit => (
                                        <MenuItem key={cit.id} value={cit.id}>{cit.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        )
                    }
                />
            </FormControlBox>
            <FormControlBox>
                <Controller
                    name='address.postalCode'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <TextField
                                {...field}
                                color='secondary'
                                label='Código postal'
                                focused
                            />
                        )
                    }
                />

            </FormControlBox>
        </>
    )
}
