import React from 'react'
import { Controller } from 'react-hook-form';
import { InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material';

interface Props {
    control: any;
    defaultValue?: any;
}

export const PersonalInfo = ({ control, defaultValue }: Props) => {

    return (
        <div className='w-full'>
            <div className='flex gap-5 justify-evenly'>
                <div>
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
                <div>
                    <div className='mb-3'>
                        <label>Documento de identidad: </label>
                        <FormControl className="mb-2">
                            <InputLabel color='secondary' id='doc-type'>Tipo de documento</InputLabel>
                            <Controller
                                control={control}
                                name='identityDoc.docType'
                                render={
                                    ({ field }) => {
                                        return (
                                            <Select
                                                {...field}
                                                color='secondary'
                                                fullWidth
                                                label='Tipo de documento'
                                                labelId='doc-type'
                                                displayEmpty
                                                defaultValue={defaultValue?.identityDoc?.docType}
                                                sx={{
                                                    width: '235px'
                                                }}
                                            >
                                                <MenuItem value='DNI'> DNI </MenuItem>
                                                <MenuItem value='NIE'> NIE </MenuItem>
                                                <MenuItem value='Passport'> Pasaporte </MenuItem>
                                            </Select>
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
                                            <TextField label='Número de documento' color='secondary' {...field} defaultValue={defaultValue?.identiyDoc?.idNumber} />
                                        )
                                    }
                                }
                            ></Controller>
                        </FormControl>
                    </div>
                </div>
            </div>

        </div>
    )
}
