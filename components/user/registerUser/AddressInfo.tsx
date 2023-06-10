import React, { use, useEffect, useState } from 'react'
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form'
import { InputLabel, MenuItem, Select, TextField, FormControl, SelectChangeEvent } from '@mui/material';
import { Col, Row } from '@nextui-org/react';
import { FormControlBox } from '@/components/boxes/FormControlBox';
import { City, Province, State } from '@/interfaces/user.interface';
import { ObjectUtil } from '@/util/objectUtils';
import stateApi from '@/api/state.api';
import provinceApi from '@/api/province.api';
import cityApi from '@/api/city.api';
import { AddressSelects } from '@/components/address/AddressSelects';

interface Props {
    control: any;
    watch: any;
    setValue?: UseFormSetValue<FieldValues>;
}

export const AddressInfo = ({ control, watch, setValue }: Props) => {

    return (
        <div className='w-full'>
            <div className="mb-3">
                <div className='flex gap-5 justify-evenly'>
                    <Col>
                        <AddressSelects control={control} watch={watch} setValue={setValue} />
                    </Col>
                    <Col>
                        <FormControlBox>
                            <InputLabel id='dir-type'> Tipo de vía </InputLabel>
                            <Controller
                                control={control}
                                name='address.addrType'
                                render={
                                    ({ field }) => {
                                        return (
                                            <Select
                                                label='Tipo de vía'
                                                labelId='dir-type'
                                                {...field}
                                                fullWidth
                                                color='secondary'
                                                sx={{
                                                    width: '235px'
                                                }}
                                            >
                                                <MenuItem value='calle'>Calle</MenuItem>
                                                <MenuItem value='plaza'>Plaza</MenuItem>
                                                <MenuItem value='via'>Vía</MenuItem>
                                                <MenuItem value='paseo'>Paseo</MenuItem>

                                            </Select>
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControlBox>
                        <FormControlBox>
                            <Controller
                                control={control}
                                name='address.streetName'
                                rules={{ required: true }}
                                render={
                                    ({ field }) => {
                                        return (
                                            <TextField
                                                label='Nombre de Calle'
                                                color='secondary'
                                                {...field}
                                            />
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControlBox>
                        <FormControlBox>
                            <Controller
                                control={control}
                                name='address.streetNumber'
                                rules={{ required: true }}
                                render={
                                    ({ field }) => {
                                        return (
                                            <TextField

                                                label='Número'
                                                color='secondary'
                                                {...field}
                                            />
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControlBox>
                    </Col>
                    <Col className='mt-2'>
                        <FormControlBox>
                            <Controller
                                control={control}
                                name='address.floor'
                                rules={{ required: false }}
                                render={
                                    ({ field }) => {
                                        return (
                                            <TextField
                                                label='Planta'
                                                color='secondary'
                                                {...field}
                                            />
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControlBox>
                        <FormControlBox>
                            <Controller
                                control={control}
                                name='address.door'
                                rules={{ required: false }}
                                render={
                                    ({ field }) => {
                                        return (
                                            <TextField

                                                label='Puerta'
                                                color='secondary'
                                                {...field}
                                            />
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControlBox>
                        <FormControlBox>
                            <Controller
                                control={control}
                                name='address.extraInfo'
                                rules={{ required: false }}
                                render={
                                    ({ field }) => {
                                        return (
                                            <TextField

                                                label='Información extra'
                                                color='secondary'
                                                multiline
                                                rows={4}
                                                {...field}
                                            />
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControlBox>
                    </Col>
                </div>
            </div>
        </div>
    )
}
