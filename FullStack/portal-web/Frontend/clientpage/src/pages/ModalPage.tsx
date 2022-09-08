import React from 'react'
import { Modal } from '../components/Modal';
import { useModal } from '../components/Modal/useModal';

export const ModalPage = () => {
    const { isShown, toggle } = useModal();

    return (
        <>
            {/* <button onClick={toggle}>Open modal</button>
            <Modal isShown={isShown} hide={toggle} headerText={'Cliente'} /> */}
        </>
    )
}
