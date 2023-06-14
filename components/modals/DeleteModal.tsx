import { CommPlace } from '@/interfaces/entity.interface';
import { Modal, Text } from '@nextui-org/react';
import React from 'react'

interface Props {
    open: boolean;
    setOpen: (x: boolean) => void;
    object: any;
    callBack: () => void;
    text: string;
}

export const DeleteModal = ({ open, setOpen, object: place, callBack, text }: Props) => {
    return (
        <Modal
            closeButton
            open={open}
            onClose={() => setOpen(false)}
            blur
            width='50vw'
        >
            <Modal.Header>
                <Text b size={20}>
                    { text }
                </Text>
            </Modal.Header>
            <Modal.Body>
                <div className="flex justify-around">
                    <button
                        type='button'
                        onClick={async () => await callBack()}
                        className='pt-1 pb-1 pl-2 pr-2 w-24 bg-green-500 rounded-lg shadow-lg hover:bg-green-400 transition-all ease-in-out duration-100'
                    >
                        Sí
                    </button>
                    <button
                        type='button'
                        onClick={() => setOpen(false)}
                        className='pt-1 pb-1 pl-2 pr-2 w-24 bg-red-500 rounded-lg shadow-lg hover:bg-red-400 transition-all ease-in-out duration-100'
                    >
                        No
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
