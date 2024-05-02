import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { MuscleForm, PageProps } from '@/types';
import UpdateMuscleForm from './Partials/UpdateMuscleForm';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<MuscleForm>({
        name: '',
        image: undefined,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log({data});
        // post(route('muscles.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create new muscle object</h2>}
        >
            <Head title="Create new Muscle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-6">
                            <UpdateMuscleForm
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
