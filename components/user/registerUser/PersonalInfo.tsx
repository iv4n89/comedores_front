import React from 'react'
import { Controller } from 'react-hook-form';
import { InputLabel, TextField, FormControl } from '@mui/material';
import Select from 'react-select';

interface Props {
    control: any;
    defaultValue?: any;
    setValue?: any;
    watch?: any;
}

export const PersonalInfo = ({ control, defaultValue, setValue, watch }: Props) => {

    const docTypeOptions = [
        { value: 'DNI', label: 'DNI' },
        { value: 'NIE', label: 'NIE' },
        { value: 'Passport', label: 'Pasaporte' }
    ];

    return (
        <div className='w-full'>
            <div className='flex gap-5 justify-evenly'>
                <div className='flex flex-col'>
                    <FormControl className='mb-3 mt-2'>
                        <Controller
                            control={control}
                            name='name'
                            rules={{ required: true }}
                            render={
                                ({ field }) => {
                                    return (
                                        <TextField label='Nombre' color='secondary' {...field} defaultValue={defaultValue?.name} />
                                    );
                                }
                            }
                        ></Controller>
                    </FormControl>
                    <FormControl className="mb-3">
                        <Controller
                            control={control}
                            name='surname'
                            rules={{ required: false }}
                            render={
                                ({ field }) => {
                                    return (
                                        <TextField
                                            label='Apellidos'
                                            color='secondary'
                                            {...field}
                                            defaultValue={defaultValue?.surname}
                                        />
                                    )
                                }
                            }
                        ></Controller>
                    </FormControl>
                    <FormControl className="mb-3">
                        <Controller
                            control={control}
                            name='telNumber'
                            rules={{ required: true }}
                            render={
                                ({ field }) => {
                                    return <TextField label='Teléfono' color='secondary' {...field} defaultValue={defaultValue?.telNumber} />
                                }
                            }
                        ></Controller>
                    </FormControl>
                </div>
                <div className='flex flex-col'>
                    <FormControl className="mb-2">
                        <div>
                            <label>Documento de identidad: </label>
                        </div>
                        <Controller
                            control={control}
                            name='identityDoc.docType'
                            render={
                                ({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            options={docTypeOptions}
                                            className='z-50'
                                            value={docTypeOptions.find(d => d?.value === watch()?.identityDoc?.docType)}
                                            onChange={e => {
                                                setValue('identityDoc.docType', e?.value)
                                            }}
                                            styles={{
                                                container: style => ({
                                                    ...style,
                                                    width: '235px'
                                                })
                                            }}
                                            defaultValue={docTypeOptions.find(e => e.value === defaultValue?.identityDoc?.docType)}
                                        />
                                    )
                                }
                            }
                        ></Controller>
                    </FormControl>
                    <FormControl className='mb-2'>
                        <Controller
                            control={control}
                            name='identityDoc.idNumber'
                            rules={{ required: true }}
                            render={
                                ({ field }) => {
                                    return (
                                        <TextField label='Número de documento' color='secondary' {...field} defaultValue={defaultValue?.identityDoc?.idNumber} />
                                    )
                                }
                            }
                        ></Controller>
                    </FormControl>
                </div>
            </div>

        </div>
    )
}
