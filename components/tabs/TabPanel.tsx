import { Box } from '@mui/material';

interface Props {
    children?: React.ReactNode | React.ReactNode[];
    index: number;
    value: number;
    name?: string;
}

export const TabPanel = ({ children, index, value, name = 'simple', ...other }: Props) => {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`tabpanel-${ name }-${index}`}
            aria-labelledby={ `tab-${ name }-${ index }` }
            { ...other }
        >
            {
                value === index && (
                    <Box sx={{ p: 3 }}>
                        { children }
                    </Box>
                )
            }
        </div>
    )
}

export const a11yProps = (index: number, name = 'simple') => ({
    id: `tab-${ name }-${ index }`,
    'aria-controls': `tabpanel-${ name }-${ index }`
});