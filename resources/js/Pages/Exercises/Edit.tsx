import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Image, ExerciseForm, PageProps, Muscle, Exercise } from '@/types';
import ExerciseInformationForm from './Partials/ExerciseInformationForm';

export default function Edit({ auth, exercise, images, muscles }: PageProps<{ exercise: Exercise, images: Image[], muscles: Muscle[] }>) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ExerciseForm>({
        name: exercise.name,
        primary_muscle_id: exercise.primary_muscle.id,
        secondary_muscle_ids: exercise.secondary_muscles.map(muscle => muscle.id),
        image_ids: exercise.images.map(image => image.id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('exercises.update', { id: exercise.id }));
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
