import Modal from '@/Components/Modal';
import { Image } from "@/types";

interface ImageSelectModalProps {
    show: boolean;
    onClose: () => void;
    images: Image[];
    selectImage: (imageId: number) => void;
}

const ImageSelectModal = ({ show, onClose, images, selectImage }: ImageSelectModalProps) => (
    <Modal show={show} onClose={onClose} maxWidth="7xl">
        <section className="p-6 flex flex-row gap-4">
            {images.length ? images.map(image => (
                <button key={image.id} className="basis-1/6 bg-white shadow-lg hover:drop-shadow-md active:drop-shadow-lg rounded-2xl border border-gray-500 active:border-indigo-500 overflow-hidden" type="button" onClick={() => selectImage(image.id)}>
                    <img className="h-40 p-2 mx-auto" src={image.path} />
                    <div className="w-full p-2 bg-gray-100">
                        <h3>{image.filename}</h3>
                    </div>
                </button>
            )) : (
                <p className="p-6 text-md text-gray-800">No uploaded images found</p>
            )}
        </section>
    </Modal>
);
export default ImageSelectModal;