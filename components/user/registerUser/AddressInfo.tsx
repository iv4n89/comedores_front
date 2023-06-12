import { AddressSelects } from '@/components/address/AddressSelects';
import { FormControlBox } from '@/components/boxes/FormControlBox';
import { Address } from '@/interfaces/user.interface';
import { InputLabel, Select, TextField } from '@mui/material';
import { Col } from '@nextui-org/react';
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';

interface Props {
    control: any;
    watch: any;
    setValue?: UseFormSetValue<FieldValues>;
    defaultValue?: Partial<Address>;
}

const options = ['calle','plaza','via','paseo'].map(e => ({
    value: e,
    label: e.charAt(0).toUpperCase() + e.substring(1),
}));

export const AddressInfo = ({ control, watch, setValue, defaultValue }: Props) => {

    return (
        <div className='w-full'>
            <div className="mb-3">
                <div className='flex gap-5 justify-evenly'>
                    <Col>
                        <AddressSelects control={control} watch={watch} setValue={setValue} defaultValue={defaultValue} />
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
                                                native
                                                fullWidth
                                                color='secondary'
                                                sx={{
                                                    width: '235px'
                                                }}
                                                defaultValue={defaultValue?.addrType}
                                            >
                                                {
                                                    options.map(e => (
                                                        <option value={e.value}> { e.label } </option>
                                                    ))
                                                }
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
                                                defaultValue={defaultValue?.streetName}
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
                                                defaultValue={defaultValue?.streetNumber}
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
                                                defaultValue={defaultValue?.floor}
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
                                                defaultValue={defaultValue?.door}
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
                                                defaultValue={defaultValue?.extraInfo}
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
