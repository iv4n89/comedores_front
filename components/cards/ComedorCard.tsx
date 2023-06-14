import commPlaceApi from '@/api/commPlace.api';
import { CommPlace, Entity } from '@/interfaces/entity.interface';
import { capitalizeWord } from '@/util/strUtils';
import { Typography, Chip } from '@mui/material';
import { Card, Grid, Modal, Text } from '@nextui-org/react';
import React, { useState } from 'react'
import { PlaceRegister } from '../comedor/PlaceRegister';
import { BsFillTrashFill } from 'react-icons/bs';
import { DeleteButton } from '../buttons/DeleteButton';
import { DeleteModal } from '../modals/DeleteModal';

interface Props {
    com: CommPlace;
    setComedores: any;
}

export const ComedorCard = ({ com, setComedores }: Props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [place, setPlace] = useState({} as CommPlace);

    return (
        <Grid xs={4} key={com.id}>
            <Card
                isHoverable
                isPressable
                css={{
                    width: '225px',
                    border: '1px solid rgba(100, 100, 100, 0.5)',
                    minHeight: '370px'
                }}
            >
                <Card.Header
                    style={{
                        backgroundColor: com.type === 'community kitchen' ? '#36C964' : '#8A13D1',
                        margin: 0,
                        color: com.type === 'community kitchen' ? 'black' : 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bolder',
                            width: '90%'
                        }}
                        onClick={e => {
                            setModalOpen(true);
                            setPlace(com);
                        }}
                    >
                        {com.name}
                    </Typography>
                    <DeleteButton
                        callBack={() => {
                            setPlace(com);
                            setDeleteModalOpen(true);
                        }}
                    />
                </Card.Header>
                <Card.Body
                    css={{
                        overflowX: 'hidden'
                    }}
                    onClick={e => {
                        setModalOpen(true);
                        setPlace(com);
                    }}
                >
                    <div>
                        <span>
                            Dirección:
                        </span>
                        <div className="rounded-md border border-green-400 p3 mt-2">
                            <label>
                                {capitalizeWord(com?.address?.addrType as string)} {com?.address?.streetName} Número {com?.address?.streetNumber}
                            </label>
                            <br />
                            <label>
                                {com?.address?.city?.name}{com?.address?.city && ', '} {com?.address?.city?.province?.name}
                            </label>
                            <br />
                            <label>
                                {com?.address?.postalCode}
                            </label>
                        </div>
                    </div>
                    {
                        com.entity?.length && (
                            <div className="pt-2">
                                <Typography>Entidades: </Typography>
                                <div className="p3 mt-2">
                                    {
                                        com.entity.map((e: Entity) => (
                                            <Chip
                                                key={e.id}
                                                label={e.name}
                                                sx={{
                                                    height: 'auto',
                                                    '& .MuiChip-label': {
                                                        display: 'block',
                                                        whiteSpace: 'normal',
                                                    },
                                                    marginBottom: '5px'
                                                }}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        ) || null
                    }
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
                        Editar {place.type === 'community kitchen' ? 'comedor' : 'economato'}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <PlaceRegister
                        type="update"
                        defaultValue={place}
                        callBack={() => {
                            setModalOpen(false);
                            commPlaceApi.getAllPlaces().then(setComedores);
                        }}
                    />
                </Modal.Body>
            </Modal>
            <DeleteModal
                text={`¿Desea eliminar el ${place.type === 'community kitchen' ? 'comedor' : 'economato'} ${place.name}?`}
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                object={place}
                callBack={async () => {
                    await commPlaceApi.deletePlace(place.id as number);
                    const placs = await commPlaceApi.getAllPlaces();
                    setComedores(placs);
                    setDeleteModalOpen(false)
                }}
            />
        </Grid>
    )
}
