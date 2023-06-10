import entityApi from "@/api/entity.api";
import { Layout } from "@/base/Layout";
import { FormControlBox } from "@/components/boxes/FormControlBox";
import { CustomCard } from "@/components/cards/CustomCard";
import { Entity } from "@/interfaces/entity.interface";
import { TextField, Typography } from "@mui/material";
import { Button, Grid, Modal, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";


export default function AllEntities() {

    const [entities, setEntities] = useState([] as Entity[]);
    const [modalOpen, setModalOpen] = useState(false);
    const { control, handleSubmit, watch } = useForm();
    const [editEntity, setEditEntity] = useState({} as Entity);

    useEffect(() => {
        entityApi.getAllEntitys()
            .then(setEntities);
    }, [])

    const onSubmit = (data: any) => {
        entityApi.updateEntity(editEntity.id!, data).then(res => {
            setEntities(elements => elements.map(e => e.id === editEntity.id ? res : e));
            setModalOpen(false);
        });
    }

    return (<Layout>
        <Grid.Container gap={3}>
            {
                entities.map(e => (
                    <React.Fragment key={e.id}>
                        <Grid xs={4}>
                            <CustomCard
                                handleClick={() => {
                                    setModalOpen(true)
                                    setEditEntity(e)
                                }}
                                header={(<Typography> {e.name} </Typography>)}
                                body={(<div>
                                    <div>
                                        <Typography>NIF: {e.nif}</Typography>
                                    </div>
                                    <div>
                                        <Typography> Responsable: </Typography>
                                        <div className="border border-green-500 rounded-lg p-2">
                                            <Typography>Nombre: {e.person?.name}</Typography>
                                            <Typography>Apellidos: { e.person?.surname } </Typography>
                                        </div>
                                    </div>
                                </div>)}
                            />
                            <Modal
                                closeButton
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                            >
                                <Modal.Header>
                                    <Text b size={10}>
                                        Editar entidad
                                    </Text>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControlBox>
                                            <Controller
                                                control={control}
                                                name='name'
                                                render={
                                                    ({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            color='secondary'
                                                            label='Nombre'
                                                            defaultValue={editEntity.name}
                                                        />
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                        <FormControlBox>
                                            <Controller
                                                control={control}
                                                name='nif'
                                                render={
                                                    ({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            color='secondary'
                                                            label='NIF'
                                                            defaultValue={editEntity.nif}
                                                        />
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                        <Text>
                                            Persona responsable
                                        </Text>
                                        <FormControlBox>
                                            <Controller
                                                control={control}
                                                name='person.name'
                                                render={
                                                    ({field}) => (
                                                        <TextField
                                                            {...field}
                                                            color='secondary'
                                                            label='Nombre responsable'
                                                            defaultValue={editEntity.person?.name}
                                                        />
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                        <FormControlBox>
                                            <Controller
                                                control={control}
                                                name='person.surname'
                                                render={
                                                    ({field}) => (
                                                        <TextField
                                                            {...field}
                                                            color='secondary'
                                                            label='Apellidos responsable'
                                                            defaultValue={editEntity.person?.surname}
                                                        />
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                        <FormControlBox>
                                            <Controller
                                                control={control}
                                                name='person.telephone'
                                                render={
                                                    ({field}) => (
                                                        <TextField
                                                            {...field}
                                                            color='secondary'
                                                            label='Teléfono responsable'
                                                            defaultValue={editEntity.person?.telephone}
                                                        />
                                                    )
                                                }
                                            />
                                        </FormControlBox>
                                        <FormControlBox>
                                            <Button
                                                type='submit'
                                            >
                                                Enviar
                                            </Button>
                                        </FormControlBox>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </Grid>
                    </React.Fragment>
                ))
            }
        </Grid.Container>
    </Layout>)
}