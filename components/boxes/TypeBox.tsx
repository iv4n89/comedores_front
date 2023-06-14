import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
    children: JSX.Element | JSX.Element[];
    backgroundColor: string;
    label: string;
}

export const TypeBox = ({ children, backgroundColor, label }: Props) => {
    return (
        <Box
            sx={{
                width: '120%',
                position: 'relative',
                left: '-80px',
            }}
        >
            <div
                style={{
                    backgroundColor,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    backdropFilter: 'blur(5px)'
                }}
            >
                <Typography
                    sx={{
                        transform: 'rotate(270deg)',
                        height: '10px',
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }}
                >
                    { label }
                </Typography>
                <div
                    style={{
                        flex: 1,
                        margin: '10px',
                        borderRadius: '15px',
                        boxShadow: 'inset 0 0 10px',
                        backgroundColor: 'rgba(240, 240, 240, 0.5)',
                        maxHeight: '450px',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    }}
                >
                    {
                        children
                    }
                </div>
            </div>
        </Box>
    )
}
