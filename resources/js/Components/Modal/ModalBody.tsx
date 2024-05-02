import { ReactElement } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalBodyProps {
    title: ReactElement;
    content: ReactElement;
    dismissAction?: () => void;
}

const ModalBody = ({ title, content, dismissAction }: ModalBodyProps) => {
    return (
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    {title || null}
                    {content || null}
                </div>
                {dismissAction ? (
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                        <XMarkIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                    </div>
                ) : null}
            </div>
        </div>
    )
}