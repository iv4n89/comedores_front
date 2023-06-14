import entityApi from "@/api/entity.api";
import { Layout } from "@/base/Layout";
import { FormControlBox } from "@/components/boxes/FormControlBox";
import { DeleteButton } from "@/components/buttons/DeleteButton";
import { CustomCard } from "@/components/cards/CustomCard";
import { EntityForm } from "@/components/entidad/EntityForm";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { Entity } from "@/interfaces/entity.interface";
import { TextField, Typography } from "@mui/material";
import { Button, Card, Grid, Modal, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";


export default function AllEntities() {

    const [entities, setEntities] = useState([] as Entity[]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { control, handleSubmit, watch } = useForm();
    const [editEntity, setEditEntity] = useState({} as Entity);

    useEffect(() => {
        entityApi.getAllEntitys()
            .then(setEntities);
    }, [])

    return (<Layout>
        <Grid.Container gap={3}>
            {
                entities.map(e => (
                    <React.Fragment key={e.id}>
                        <Grid xs={4}>
                            <Card
                                isHoverable
                                isPressable
                            >
                                <Card.Header
                                    css={{
                                        backgroundColor: '#36C964',
                                        margin: 0,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: '90%',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={() => {
                                            setModalOpen(true)
                                            setEditEntity(e)
                                        }}
                                    >
                                        {e.name}
                                    </Typography>
                                    <DeleteButton
                                        callBack={async () => {
                                            setDeleteModalOpen(true);
                                            setEditEntity(e);
                                        }}
                                    />
                                </Card.Header>
                                <Card.Body
                                    onClick={() => {
                                        setModalOpen(true)
                                        setEditEntity(e)
                                    }}
                                >
                                    <div>
                                        <div>
                                            <Typography>NIF: {e.nif}</Typography>
                                        </div>
                                        <div>
                                            <Typography> Responsable: </Typography>
                                            <div className="border border-green-500 rounded-lg p-2">
                                                <Typography>Nombre: {e.person?.name}</Typography>
                                                <Typography>Apellidos: {e.person?.surname} </Typography>
                                                <Typography>Teléfono: {e.person?.telephone}</Typography>
                                            </div>
                                        </div>
                                        {
                                            e.commPlaces && e.commPlaces.length && (
                                                <div>
                                                    <div>
                                                        <Typography>Comedores: {e.commPlaces.filter(cp => cp.type === 'community kitchen').length}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography>Economatos: {e.commPlaces.filter(cp => cp.type === 'company store').length}</Typography>
                                                    </div>
                                                </div>
                                            ) || null
                                        }
                                    </div>
                                </Card.Body>
                            </Card>
                            <Modal
                                closeButton
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                                blur
                                width='75vw'
                            >
                                <Modal.Header>
                                    <Text b size={10}>
                                        Editar entidad
                                    </Text>
                                </Modal.Header>
                                <Modal.Body>
                                    <EntityForm defaultValue={editEntity} type='update' callBack={() => {
                                        setModalOpen(false)
                                        entityApi.getAllEntitys().then(setEntities);
                                    }} />
                                </Modal.Body>
                            </Modal>
                            <DeleteModal
                                open={deleteModalOpen}
                                setOpen={setDeleteModalOpen}
                                object={editEntity}
                                callBack={async () => {
                                    await entityApi.deleteEntity(editEntity.id);
                                    const ent = await entityApi.getAllEntitys();
                                    setEntities(ent);
                                    setDeleteModalOpen(false);
                                }}
                                text={
                                    `¿Desea eliminar la entidad ${editEntity.name}?`
                                }
                            />
                        </Grid>
                    </React.Fragment>
                ))
            }
        </Grid.Container>
    </Layout>)
}