import { Card } from '@nextui-org/react';

interface Props {
    header: any;
    body: any;
    handleClick?: any;
}

export const CustomCard = ({ header, body, handleClick }: Props) => {
    return (
        <Card
            isHoverable
            isPressable
            onClick={ !!handleClick && handleClick }
        >
            <Card.Header
                style={{
                    backgroundColor: 'lightgreen',
                    margin: 0
                }}
            >
                { header }
            </Card.Header>
            <Card.Body>
                { body }
            </Card.Body>
        </Card>
    )
}
