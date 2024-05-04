import { FormEventHandler, useState, useMemo } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ImageSelectModal from '@/Components/Modal/ImageSelectModal';
import { Transition } from '@headlessui/react';
import { Image, MuscleForm } from '@/types';

interface MuscleInformationFormProps {
    submit: FormEventHandler;
    data: MuscleForm;
    setData: <K extends keyof MuscleForm>(key: K, value: MuscleForm[K]) => void;
    errors: Partial<Record<keyof MuscleForm, string>>;
    processing: boolean;
    recentlySuccessful: boolean;
    images: Image[];
    onDelete?: () => void;
}

const MuscleInformationForm = ({ submit, data, setData, errors, processing, recentlySuccessful, images, onDelete }: MuscleInformationFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectImage = (newImageId: number) => {
        setData('image_id', newImageId);
        setIsModalOpen(false);
    }

    const selectedImage = useMemo<Image | undefined>(() => {
        if (!data.image_id || !images.length) {
            return undefined;
        }
        return images.find(image => image.id === data.image_id);
    }, [data]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6" encType="application/json">
            <ImageSelectModal show={isModalOpen} onClose={() => setIsModalOpen(false)} images={images} selectImage={(imageId) => selectImage(imageId)} />
            
            <div className="flex gap-4">
                <div className="basis-1/2">
                    <InputLabel htmlFor="name" value="Name" />
    
                    <TextInput
                        id="name"
                        name="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                    />
    
                    <InputError className="mt-2" message={errors.name} />
                </div>
    
                <div className="basis-1/2">
                    <InputLabel value="Image" />
    
                    {selectedImage ? (
                        <div className="mt-1">
                            <img className="h-64 p-2" src={selectedImage.path} />
                            <div className="p-2">
                                <h3>{selectedImage.filename}</h3>
                                {selectedImage.alt ? (<span className="text-gray-800 text-xs">Alt: {selectedImage.alt}</span>) : null}
                            </div>
                            <PrimaryButton type="button" onClick={() => setIsModalOpen(true)}>Change image</PrimaryButton>
                        </div>
                    ):(
                        <PrimaryButton className="mt-1" type="button" onClick={() => setIsModalOpen(true)}>Select image</PrimaryButton>
                    )}
                </div>
            </div>
    
            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
    
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>

                {onDelete ? (
                    <SecondaryButton disabled={processing} onClick={onDelete}>Delete</SecondaryButton>
                ) : null}
            </div>
        </form>
    );
}
export default MuscleInformationForm;
