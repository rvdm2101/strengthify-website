import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import FileInput from '@/Components/FileInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ImageForm, PageProps } from '@/types';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ImageForm>({
        image: undefined,
        alt: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('images.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Upload new image</h2>}
        >
            <Head title="Upload new image" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-6">
                            <form onSubmit={submit} className="mt-6 space-y-6" encType="application/json">
                                <div>
                                    <InputLabel htmlFor="image">
                                        Image
                                        <FileInput
                                            id="image"
                                            name="image"
                                            image={data?.image || undefined}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('image', e.target.files?.length ? e.target.files[0] : undefined)}
                                            required
                                        />
                                    </InputLabel>

                                    <InputError className="mt-2" message={errors.image} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="alt" value="Alt text" />

                                    <TextInput
                                        id="alt"
                                        name="alt"
                                        className="mt-1 block w-full"
                                        value={data.alt}
                                        onChange={(e) => setData('alt', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.alt} />
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
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
