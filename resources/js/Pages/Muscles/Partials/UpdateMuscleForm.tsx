import InputLabel from '@/Components/InputLabel';
import FileInput from '@/Components/FileInput';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { Muscle, MuscleForm } from '@/types';

interface UpdateMuscleFormProps {
    muscle?: Muscle;
    data: MuscleForm;
    setData: <K extends keyof MuscleForm>(key: K, value: MuscleForm[K]) => void;
    errors: Partial<Record<keyof MuscleForm, string>>;
    processing: boolean;
    recentlySuccessful: boolean;
    onSubmit: FormEventHandler;
}

export default function UpdateMuscleForm({ muscle, data, setData, errors, processing, recentlySuccessful, onSubmit }: UpdateMuscleFormProps) {
    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-6" encType="application/json">
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
                <InputLabel htmlFor="image">
                    Image
                    <FileInput
                        id="image"
                        name="image"
                        image={data?.image || muscle?.image || undefined}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('image', e.target.files?.length ? e.target.files[0] : undefined)}
                    />
                </InputLabel>

                <InputError className="mt-2" message={errors.image} />
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
            </div>
        </form>
    );
}
