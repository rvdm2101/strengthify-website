import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Image, Muscle, MuscleForm, PageProps } from '@/types';
import MuscleInformationForm from './Partials/MuscleInformationForm';

export default function Edit({ auth, muscle, images }: PageProps<{ muscle: Muscle, images: Image[] }>) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<MuscleForm>({
        name: muscle.name,
        image_id: muscle.image?.id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('muscles.update', { id: muscle.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit muscle {muscle.name}</h2>}
        >
            <Head title={`Edit muscle ${muscle.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-6">
                            <MuscleInformationForm
                                submit={submit}
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                recentlySuccessful={recentlySuccessful}
                                images={images}
                            />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
