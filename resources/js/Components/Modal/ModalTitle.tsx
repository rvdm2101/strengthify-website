import { Dialog } from '@headlessui/react';
import { ReactElement } from 'react';

interface ModalTitleProps {
    children: ReactElement;
}

const ModalTitle = ({ children }: ModalTitleProps) => {
    return (
        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            {children}
        </Dialog.Title>
    )
}