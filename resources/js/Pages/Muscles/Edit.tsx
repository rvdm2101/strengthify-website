import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Muscle, MuscleForm, PageProps } from '@/types';
import UpdateMuscleForm from './Partials/UpdateMuscleForm';

export default function Edit({ auth, muscle }: PageProps<{ muscle: Muscle }>) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<MuscleForm>({
        id: muscle.id,
        name: muscle.name,
        image: undefined,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log({data});
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
                            <UpdateMuscleForm
                                muscle={muscle}
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                recentlySuccessful={recentlySuccessful}
                                onSubmit={submit}
                            />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
