import { ReactElement } from 'react';

interface ModalContentProps {
    children: ReactElement;
}

const ModalContent = ({ children }: ModalContentProps) => {
    return (
        <div className="mt-2">
            <p className="text-sm text-gray-500">
                {children}
            </p>
        </div>
    )
}