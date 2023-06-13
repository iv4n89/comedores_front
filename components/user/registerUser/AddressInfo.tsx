import { AddressSelects } from '@/components/address/AddressSelects';
import { FormControlBox } from '@/components/boxes/FormControlBox';
import { Address } from '@/interfaces/user.interface';
import { InputLabel, TextField } from '@mui/material';
import { Col } from '@nextui-org/react';
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';

interface Props {
    control: any;
    watch: any;
    setValue?: UseFormSetValue<FieldValues>;
    defaultValue?: Partial<Address>;
}

const options = ['calle', 'plaza', 'via', 'paseo', 'avenida'].map(e => ({
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
                        <div className="flex flex-col">
                            <FormControlBox rowStyle={{
                                marginBottom: '10px'
                            }}>
                                <Controller
                                    control={control}
                                    name='address.addrType'
                                    render={
                                        ({ field }) => {
                                            return (
                                                <Select
                                                    {...field}
                                                    options={options}
                                                    className='z-50'
                                                    onChange={e => {
                                                        setValue?.('address.addrType', e?.value)
                                                    }}
                                                    placeholder='Tipo de vía'
                                                    styles={{
                                                        container: style => ({
                                                            ...style,
                                                            width: '235px'
                                                        })
                                                    }}
                                                    value={options.find(o => o === watch()?.address?.addrType)}
                                                    defaultValue={options.find(o => o.value === defaultValue?.addrType)}
                                                />
                                            )
                                        }
                                    }
                                ></Controller>
                            </FormControlBox>
                            <FormControlBox rowStyle={{
                                marginBottom: '10px'
                            }}>
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
                            <FormControlBox rowStyle={{
                                marginBottom: '10px'
                            }}>
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
                        </div>
                    </Col>
                    <Col className='mt-2'>
                        <div className="flex flex-col">
                            <FormControlBox rowStyle={{
                                marginBottom: '10px'
                            }}>
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
                            <FormControlBox rowStyle={{
                                marginBottom: '10px'
                            }}>
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
                            <FormControlBox rowStyle={{
                                marginBottom: '10px'
                            }}>
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
                        </div>
                    </Col>
                </div>
            </div>
        </div>
    )
}
