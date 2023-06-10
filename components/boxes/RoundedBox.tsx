import { Box, SxProps, Theme } from '@mui/material';
import { Row } from '@nextui-org/react';

interface Props {
    children: React.ReactNode | React.ReactNode[];
    sx?: SxProps<Theme>;
    row?: boolean;
}

export const RoundedBox = ({ children, sx, row = true }: Props) => {

    return (
        row && (
            <Box
                sx={{
                    width: '100%',
                    border: '1px solid rgba(138,19,209,0.3)',
                    borderRadius: '25px',
                    p: 3,
                    height: '65vh',
                    position: 'relative',
                    paddingBottom: '60px',
                    boxShadow: 1,
                    backgroundColor: 'white',
                    ...sx
                }}
            >
                <Row>
                    {children}
                </Row>
            </Box>
        ) ||
        <Box
            sx={{
                width: '100%',
                border: '1px solid rgba(138,19,209,0.3)',
                borderRadius: '25px',
                p: 3,
                height: '65vh',
                position: 'relative',
                paddingBottom: '60px',
                boxShadow: 1,
                ...sx
            }}
        >
            {children}
        </Box>
    )
}