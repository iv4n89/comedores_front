import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

interface Props {
    callBack: (x?: any) => void;
}

export const DeleteButton = ({ callBack }: Props) => {
    return (
        <BsFillTrashFill
            size={25}
            color='red'
            className='p-0.5 bg-slate-200 rounded-md hover:bg-slate-300 hover:translate-y-1 shadow-lg hover:shadow-sm transition-all ease-in-out duration-100'
            onClick={() => callBack()}
        />
    )
}
