import Modal from '@/Components/Modal';
import { Image } from "@/types";
import { CheckIcon } from '@heroicons/react/24/solid';

interface ImageSelectModalProps {
    show: boolean;
    onClose: () => void;
    images: Image[];
    selectedImageIds?: number[];
    selectImage: (imageId: number) => void;
}

const ImageSelectModal = ({ show, onClose, images, selectImage, selectedImageIds }: ImageSelectModalProps) => (
    <Modal show={show} onClose={onClose} maxWidth="7xl">
        <section className="p-6 grid grid-cols-6 gap-4">
            {images.length ? images.map(image => {
                const isActive = selectedImageIds && selectedImageIds.includes(image.id);
                return (
                    <button
                        key={image.id}
                        type="button"
                        className={`relative bg-white shadow-lg rounded-2xl border border-gray-500 overflow-hidden ${!isActive ? 'hover:drop-shadow-md active:drop-shadow-lg active:border-indigo-500' : ''}`}
                        onClick={() => selectImage(image.id)}
                        disabled={isActive}
                    >
                        <img className="h-40 p-2 mx-auto" src={image.path} />
                        <div className="w-full p-2 bg-gray-100">
                            <h3>{image.filename}</h3>
                        </div>
                        {isActive ? (
                            <>
                                <div className='absolute inset-x-0 inset-y-0 bg-gray-500 opacity-30' />
                                <div className='absolute inset-x-0 inset-y-0 w-10 h-10 m-auto flex justify-center items-center bg-indigo-500 rounded-full'>
                                    <CheckIcon className='h-6 w-6 text-white' />
                                </div>
                            </>
                        ) : null}
                    </button>
                );
            }) : (
                <p className="p-6 text-md text-gray-800">No uploaded images found</p>
            )}
        </section>
    </Modal>
);
export default ImageSelectModal;