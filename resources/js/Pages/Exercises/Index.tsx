import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Exercise, PageProps } from '@/types';

export default function Index({ auth, exercises }: PageProps<{ exercises: Exercise[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Exercises overview</h2>}
        >
            <Head title="Exercises overview" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-6 flex">
                            <h2 className="text-lg font-medium text-gray-900">Exercises overview and stuff</h2>
                            <Link className="ml-auto" href={route('exercises.create')}>Create new Exercise</Link>
                        </section>
                        <section className="p-6 grid grid-cols-5 gap-4">
                            {exercises.length ? exercises.map(exercise => (
                                <Link
                                    key={exercise.id}
                                    className="relative shadow-lg rounded-2xl border border-gray-500 overflow-hidden"
                                    href={route('exercises.edit', { id: exercise.id })}
                                >
                                    {exercise.images.length ? (
                                        <img className="h-64 p-6 mx-auto" src={exercise.images[0].path} />
                                    ) : null}
                                    <div className="absolute w-full p-6 bottom-0">
                                        <h3>{exercise.name}</h3>
                                    </div>
                                    <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-gray-900 opacity-40" />
                                </Link>
                            )) : (
                                <h3 className="p-6 text-md text-gray-800">No exercises found</h3>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
