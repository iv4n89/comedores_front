import React from 'react'

interface Props {
    text?: string;
    type?: 'submit' | 'button';
    onClick?: (e: any) => any;
}

export const NextButton = ({ text = 'Siguiente', type = 'submit', onClick }: Props) => {
    return (
        <button
            type={ type }
            onClick={ onClick }
            className='pt-2 pb-2 pl-3 pr-3 border rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-purple-500 active:bg-purple-400 active:translate-y-2 transition-all ease-in-out duration-200'
        >{ text }</button>
    )
}
