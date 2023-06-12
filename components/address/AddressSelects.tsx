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
    defaultValue?: any;
}

export const AddressSelects = ({ control, watch, setValue, defaultValue }: Props) => {

    const [states, setStates] = useState<State[]>([] as State[]);
    const [provinces, setProvinces] = useState<Province[]>([] as Province[]);
    const [cities, setCities] = useState<City[]>([] as City[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const func = async () => {
            const _states = await stateApi.getAllStates();
            setStates(_states);
            if (defaultValue) {
                if (defaultValue?.state) {
                    const _provinces = await provinceApi.getProvincesByState(defaultValue?.state?.id);
                    setProvinces(_provinces);
                }
                if (defaultValue?.province) {
                    const _cities = await cityApi.getCitiesByProvince(defaultValue?.province?.id);
                    setCities(_cities);
                }
                setLoaded(true);
            } else {
                setLoaded(true);
            }
        }
        func();
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

    return loaded && (
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
                                native
                                label='Comunidad Autónoma'
                                labelId='comun_id'
                                displayEmpty
                                defaultValue={defaultValue?.address?.state?.id}
                                sx={{
                                    width: '235px'
                                }}
                            >
                                {
                                    states.map(st => (
                                        <option key={st.id} value={st.id}>{st.name}</option>
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
                                native
                                label='Provincia'
                                labelId="prov_id"
                                displayEmpty
                                defaultValue={defaultValue?.address?.province?.id}
                                sx={{
                                    width: '235px'
                                }}
                            >
                                {
                                    provinces.map(prov => (
                                        <option key={prov.id} value={prov.id}>{prov.name}</option>
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
                                native
                                label='Ciudad'
                                labelId="cit_id"
                                displayEmpty
                                defaultValue={defaultValue?.address?.city?.id}
                                sx={{
                                    width: '235px'
                                }}
                            >
                                {
                                    cities.map(cit => (
                                        <option key={cit.id} value={cit.id}>{cit.name}</option>
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
                                defaultValue={defaultValue?.address?.postalCode}
                            />
                        )
                    }
                />

            </FormControlBox>
        </>
    ) || <></>
}
