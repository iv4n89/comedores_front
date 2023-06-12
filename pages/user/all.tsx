import userApi from "@/api/user.api";
import { Layout } from "@/base/Layout";
import { UserForm } from "@/components/user/registerUser/UserForm";
import { User } from "@/interfaces/user.interface";
import { Typography } from "@mui/material";
import { Card, Container, Grid, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function AllUsers() {

    const [users, setUsers] = useState([] as User[]);
    const [modalOpen, setModalOpen] = useState(false);
    const { control, watch, handleSubmit } = useForm();
    const [editUser, setEditUser] = useState({} as User);
    useEffect(() => {
        userApi.getAllUsers().then(setUsers);
    }, []);

    return (
        <Layout>
            <Container fluid>
                <Grid.Container gap={2} justify='space-around'>
                    {
                        users.map(user => (
                            <Grid xs={4} key={user.id}>
                                <Card
                                    isHoverable
                                    isPressable
                                    onClick={() => {
                                        setModalOpen(true);
                                        setEditUser(user);
                                    }}
                                >
                                    <Card.Header
                                        style={{
                                            backgroundColor: 'lightgreen',
                                            margin: 0
                                        }}
                                    >
                                        <Typography>
                                            {user.name} {user.surname}
                                        </Typography>
                                    </Card.Header>
                                    <Card.Body>
                                        <div>
                                            <Typography>
                                                {
                                                    user.identityDoc?.docType === 'DNI' && 'DNI: '
                                                    || user.identityDoc?.docType === 'NIE' && 'NIE: '
                                                    || user.identityDoc?.docType === 'Passport' && 'Pasaporte: '
                                                    || 'Otro: '
                                                }
                                                <span>{user.identityDoc?.idNumber}</span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <span>
                                                Dirección:
                                            </span>
                                            <div className="rounded-md border border-green-400 p-3 mt-2">
                                                <label>
                                                    {user.address?.addrType} {user.address?.streetName} Número {user.address?.streetNumber}
                                                </label>
                                                <br />
                                                <label>
                                                    {user.address?.city?.name}{user.address?.city && ', '} {user.address?.city?.province?.name}
                                                </label>
                                                <br />
                                                <label>
                                                    {user.address?.city?.postalCode.split(',')[0]}
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            user.commPlaces?.length && (
                                                <>
                                                    <div className="pt-2">
                                                        <Typography>Comedor: </Typography>
                                                        <Typography>
                                                            {user.commPlaces.find(cp => cp.type === 'community kitchen')?.name ?? ''}
                                                        </Typography>
                                                    </div>
                                                    <div className="pt-2">
                                                        <Typography>Economato: </Typography>
                                                        <Typography>
                                                            {user.commPlaces.find(cp => cp.type === 'company store')?.name ?? ''}
                                                        </Typography>
                                                    </div>
                                                </>
                                            ) || null
                                        }
                                    </Card.Body>
                                </Card>
                                <Modal
                                    closeButton
                                    open={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    blur
                                    width="75vw"
                                >
                                    <Modal.Header>
                                        <Text b size={10}>
                                            Editar beneficiario
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <UserForm
                                            type='update'
                                            defaultValue={editUser}
                                            callBack={() => {
                                                setModalOpen(false);
                                                userApi.getAllUsers().then(setUsers);
                                            }}
                                        />
                                    </Modal.Body>
                                </Modal>
                            </Grid>
                        ))
                    }
                </Grid.Container>
            </Container>
        </Layout>
    )

}