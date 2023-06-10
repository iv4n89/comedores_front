import { Container } from '@mui/material'
import { Dropdown, Navbar } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: Props) => {

    const { route } = useRouter();

    return (
        <div>
            <div
                style={{
                    backgroundImage: 'url(https://i.ibb.co/GC32brd/PICSE-transformed.png)',
                    backgroundPosition: 'bottom 0px right -20px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '25%',
                    backgroundAttachment: 'fixed',
                }}
            >
                <Navbar
                    style={{
                        marginBottom: '50px',
                        overflow: 'hidden'
                    }}
                    variant='floating'
                    disableShadow
                    disableBlur
                    containerCss={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        paddingBottom: '$10',
                        backdropFilter: 'blur(5px)',
                    }}
                    height={80}
                    maxWidth={'fluid'}
                >
                    <Navbar.Brand>
                        <Image
                            src="https://i.ibb.co/GC32brd/PICSE-transformed.png"
                            alt="PICSE-transformed"
                            width={90}
                            height={90}
                        />
                    </Navbar.Brand>
                    <Navbar.Content className='pt-3'>
                    <Dropdown isBordered>
                            <Navbar.Item>
                                <Dropdown.Button
                                    auto
                                    light
                                    css={{
                                        color: 'white',
                                    }}
                                >
                                    Beneficiarios
                                </Dropdown.Button>
                            </Navbar.Item>
                            <Dropdown.Menu
                                variant='solid'
                                color='secondary'
                                containerCss={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(5px)',
                                }}
                                css={{
                                    
                                }}
                            >
                                <Dropdown.Item
                                    key='beneficiarios.all'
                                >
                                    <Navbar.Link
                                        href='/user/all'
                                        activeColor='success'
                                        variant='highlight-solid'
                                        style={{
                                            color: 'white'
                                        }}
                                    > Todos los beneficiarios </Navbar.Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key='beneficiarios.register'
                                >
                                    <Navbar.Link
                                        href='/user/register'
                                        activeColor='success'
                                        variant='highlight-solid'
                                        style={{
                                            color: 'white'
                                        }}
                                    > Registrar benefiario </Navbar.Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown isBordered>
                            <Navbar.Item>
                                <Dropdown.Button
                                    auto
                                    light
                                    css={{
                                        color: 'white',
                                    }}
                                >
                                    Comedores
                                </Dropdown.Button>
                            </Navbar.Item>
                            <Dropdown.Menu
                                variant='solid'
                                color='secondary'
                                containerCss={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(5px)',
                                }}
                                css={{
                                    
                                }}
                            >
                                <Dropdown.Item
                                    key='comedores.all'
                                >
                                    <Navbar.Link
                                        href='/comedor/all'
                                        activeColor='success'
                                        variant='highlight-solid'
                                        style={{
                                            color: 'white'
                                        }}
                                    > Todos los comedores </Navbar.Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key='comedores.register'
                                >
                                    <Navbar.Link
                                        href='/comedor/register'
                                        activeColor='success'
                                        variant='highlight-solid'
                                        style={{
                                            color: 'white'
                                        }}
                                    > Registrar comedor </Navbar.Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown isBordered>
                            <Navbar.Item>
                                <Dropdown.Button
                                    auto
                                    light
                                    css={{
                                        color: 'white',
                                    }}
                                >
                                    Entidades
                                </Dropdown.Button>
                            </Navbar.Item>
                            <Dropdown.Menu
                                variant='solid'
                                color='secondary'
                                containerCss={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(5px)',
                                }}
                                css={{
                                    
                                }}
                            >
                                <Dropdown.Item
                                    key='entidades.all'
                                >
                                    <Navbar.Link
                                        href='/entidad/all'
                                        activeColor='success'
                                        variant='highlight-solid'
                                        style={{
                                            color: 'white'
                                        }}
                                    > Todas las entidades </Navbar.Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key='entidad.register'
                                >
                                    <Navbar.Link
                                        href='/entidad/register'
                                        activeColor='success'
                                        variant='highlight-solid'
                                        style={{
                                            color: 'white'
                                        }}
                                    > Registrar entidad </Navbar.Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Content>
                    <Navbar.Content className='pt-3'>
                        <Navbar.Link
                            href='#'
                            activeColor='success'
                            variant='highlight-solid'
                            style={{
                                color: 'white'
                            }}
                        > Inciar Sesión </Navbar.Link>
                    </Navbar.Content>
                </Navbar>
                <Container maxWidth='md' className='pt-5' style={{
                    minHeight: '100vh'
                }}>
                    {children}
                </Container>
            </div>
        </div>
    )
}
