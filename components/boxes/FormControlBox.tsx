import { FormControl, SxProps, Theme } from '@mui/material';
import { Row } from '@nextui-org/react';
import { CSSProperties } from 'react';


interface Props {
    children: React.ReactNode | React.ReactNode[];
    formControlClassName?: string;
    formControlSx?: SxProps<Theme>;
    rowClassName?: string;
    rowStyle?: CSSProperties;
    hidden?: boolean;
}

export const FormControlBox = ({ children, formControlClassName: className, formControlSx: sx, rowClassName, rowStyle, hidden }: Props) => {
    return (
        <Row
            style={{
                ...rowStyle
            }}
            className={rowClassName}
            hidden={hidden}
        >
            <FormControl
                className={'mb-3 ' + className}
                sx={{
                    ...sx
                }}
            >
                {children}
            </FormControl>
        </Row>
    )
}