import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Image, ExerciseForm, PageProps, Muscle } from '@/types';
import ExerciseInformationForm from './Partials/ExerciseInformationForm';

export default function Create({ auth, images, muscles }: PageProps<{ images: Image[], muscles: Muscle[] }>) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ExerciseForm>({
        name: '',
        primary_muscle_id: undefined,
        secondary_muscle_ids: [],
        image_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('exercises.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create new exercise object</h2>}
        >
            <Head title="Create new Exercise" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ExerciseInformationForm
                        submit={submit}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                        images={images}
                        muscles={muscles}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
