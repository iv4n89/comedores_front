import cityApi from '@/api/city.api';
import provinceApi from '@/api/province.api';
import stateApi from '@/api/state.api';
import { State, Province, City } from '@/interfaces/user.interface';
import { InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';
import { FormControlBox } from '../boxes/FormControlBox';
import Select from 'react-select';

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
    const [address, setAddress] = useState({
        state: 0,
        province: 0,
        city: 0,
    });

    const statesOptions = () => states?.map(e => ({ value: e.id, label: e.name }));
    const provincesOptions = () => provinces?.map(e => ({ value: e.id, label: e.name }));
    const citiesOptions = () => cities?.map(e => ({ value: e.id, label: e.name }));

    useEffect(() => {
        const func = async () => {
            const _states = await stateApi.getAllStates();
            setStates(_states);
            if (defaultValue) {
                if (defaultValue?.state) {
                    const _provinces = await provinceApi.getProvincesByState(defaultValue?.state?.id);
                    setProvinces(_provinces);
                    setAddress(e => ({
                        ...e,
                        state: defaultValue?.state?.id,
                    }))
                }
                if (defaultValue?.province) {
                    const _cities = await cityApi.getCitiesByProvince(defaultValue?.province?.id);
                    setCities(_cities);
                    setAddress(e => ({
                        ...e,
                        province: defaultValue?.province?.id,
                    }))
                }
                if (defaultValue?.city) {
                    setAddress(e => ({
                        ...e,
                        city: defaultValue?.city?.id,
                    }))
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
            <FormControlBox rowStyle={{
                marginBottom: '10px'
            }}>
                <Controller
                    name='address.state'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <Select
                                {...field}
                                options={statesOptions()}
                                onChange={e => {
                                    setValue?.('address.state', e?.value);
                                    setAddress(a => ({
                                        ...a,
                                        state: e!.value,
                                    }))
                                }}
                                value={statesOptions().find(e => e.value === watch()?.address?.state)}
                                placeholder='Comunidad autónoma'
                                className='z-50'
                                styles={{
                                    container: style => ({
                                        ...style,
                                        width: '235px'
                                    })
                                }}
                                defaultValue={statesOptions().find(e => e.value === defaultValue?.state?.id)}
                            />
                        )
                    }
                />
            </FormControlBox>
            <FormControlBox rowStyle={{
                marginBottom: '10px'
            }}>
                <Controller
                    name='address.province'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <Select
                                {...field}
                                options={provincesOptions()}
                                onChange={e => {
                                    setValue?.('address.province', e?.value);
                                    setAddress(a => ({
                                        ...a,
                                        province: e!.value,
                                    }))
                                }}
                                value={provincesOptions().find(e => e.value === watch()?.address?.province)}
                                className='z-40'
                                placeholder='Provincia'
                                styles={{
                                    container: style => ({
                                        ...style,
                                        width: '235px'
                                    })
                                }}
                                defaultValue={provincesOptions().find(e => e.value === defaultValue?.province?.id)}
                            />
                        )
                    }
                />
            </FormControlBox>
            <FormControlBox rowStyle={{
                marginBottom: '10px'
            }}>
                <Controller
                    name='address.city'
                    control={control}
                    rules={{ required: false }}
                    render={
                        ({ field }) => (
                            <Select
                                {...field}
                                options={citiesOptions()}
                                onChange={e => {
                                    setValue?.('address.city', e?.value);
                                    setAddress(a => ({
                                        ...a,
                                        city: e!.value,
                                    }))
                                }}
                                value={citiesOptions().find(e => e.value === watch()?.address?.city)}
                                className='z-30'
                                placeholder='Ciudad'
                                styles={{
                                    container: style => ({
                                        ...style,
                                        width: '235px'
                                    })
                                }}
                                defaultValue={citiesOptions().find(e => e.value === defaultValue?.city?.id)}
                            />
                        )
                    }
                />
            </FormControlBox>
            <FormControlBox rowStyle={{
                marginBottom: '10px'
            }}>
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
                                defaultValue={defaultValue?.postalCode}
                            />
                        )
                    }
                />

            </FormControlBox>
        </>
    ) || <></>
}
