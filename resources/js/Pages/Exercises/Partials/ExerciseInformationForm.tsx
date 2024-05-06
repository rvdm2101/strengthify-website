import { FormEventHandler, useCallback, useMemo, useState } from "react";
import InputLabel from '@/Components/Input/InputLabel';
import TextInput from '@/Components/Input/TextInput';
import InputError from '@/Components/Input/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ImageSelectModal from '@/Components/Modal/ImageSelectModal';
import { Transition } from '@headlessui/react';
import { ExerciseForm, Image, Muscle, UseFormSetData } from "@/types";
import SelectInput from "@/Components/Input/SelectInput";
import SelectableTag from "@/Components/SelectableTag";
import { TrashIcon } from "@heroicons/react/24/solid";

interface ExerciseInformationFormProps {
    submit: FormEventHandler;
    data: ExerciseForm;
    setData: UseFormSetData<ExerciseForm>;
    errors: Partial<Record<keyof ExerciseForm, string>>;
    processing: boolean;
    recentlySuccessful: boolean;
    images: Image[];
    muscles: Muscle[];
    onDelete?: () => void;
}

const ExerciseInformationForm = ({ submit, data, setData, errors, processing, recentlySuccessful, images, muscles, onDelete }: ExerciseInformationFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectImage = useCallback((newImageId: number) => {
        setData(previousData => ({
            ...previousData,
            image_ids: previousData.image_ids.includes(newImageId) ? previousData.image_ids : [...previousData.image_ids, newImageId]
        }));
        // setIsModalOpen(false);
    }, [setData]);

    const removeImage = useCallback((imageId: number) => {
        setData(previousData => ({
            ...previousData,
            image_ids: previousData.image_ids.filter(id => id !== imageId)
        }));
    }, [setData]);

    const selectedImages = useMemo<Image[]>(() => {
        if (!data.image_ids || !images.length) {
            return [];
        }
        return images.filter(image => data.image_ids.includes(image.id));
    }, [data]);


    const primaryMuscleClick = useCallback((value: string) => {
        const intValue = parseInt(value);
        setData((previousData) => ({
            ...previousData,
            primary_muscle_id: intValue,
            secondary_muscle_ids: previousData.secondary_muscle_ids.filter(id => id !== intValue)
        }));
    }, [setData]);

    const secondaryMusclesOnClick = (value: number) => {
        setData(
            'secondary_muscle_ids',
            data.secondary_muscle_ids.includes(value)
                ? data.secondary_muscle_ids.filter(id => id !== value)
                : [...data.secondary_muscle_ids, value]
        );
    };

    return (
        <form onSubmit={submit} encType="application/json">
            <ImageSelectModal show={isModalOpen} onClose={() => setIsModalOpen(false)} images={images} selectedImageIds={data.image_ids} selectImage={selectImage} />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <section className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Basic information</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
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
            
                        <div>
                            <InputLabel value="Images" />

                            <div className="mt-1 grid grid-cols-3 gap-4">
                                {selectedImages.map((selectedImage, index) => (
                                    <div key={index} className="relative bg-white p-2 border group">
                                        <img className="h-36 mx-auto" src={selectedImage.path} />
                                        <button className="absolute top-2 right-2 invisible group-hover:visible" onClick={() => removeImage(selectedImage.id)}>
                                            <TrashIcon className="w-6 h-6 text-red-600 hover:text-red-700" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <PrimaryButton className="mt-4" type="button" onClick={() => setIsModalOpen(true)}>Change image</PrimaryButton>
                            <InputError className="mt-2" message={errors.image_ids} />
                        </div>
                    </div>
                </section>
            </div>


            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8">
                <section className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Targeted muscles</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="primary_muscle_id" value="Primary muscle" />

                            <SelectInput
                                id="primary_muscle_id"
                                value={data.primary_muscle_id?.toString()}
                                options={muscles.map(muscle => ({ value: muscle.id.toString(), label: muscle.name }))}
                                placeholder="Select primary muscle"
                                onChange={primaryMuscleClick}
                            />
            
                            <InputError className="mt-2" message={errors.primary_muscle_id} />
                        </div>


                        <div className="col-span-2">
                            <InputLabel htmlFor="secondary_muscle_ids" value="Secondary muscles" />
                            <div className="flex gap-2">
                                {muscles.filter((muscle) => muscle.id !== data?.primary_muscle_id).map((muscle, index) => (
                                    <SelectableTag<number>
                                        key={index}
                                        value={muscle.id}
                                        label={muscle.name}
                                        isSelected={data.secondary_muscle_ids.includes(muscle.id)}
                                        onClick={secondaryMusclesOnClick}
                                    />
                                ))}
                            </div>
                            <InputError className="mt-2" message={errors.secondary_muscle_ids} />
                        </div>
                    </div>
                </section>
            </div>
    
            <div className="mt-6 flex items-center gap-4">
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

export default ExerciseInformationForm;