import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Muscle, PageProps } from '@/types';

export default function Index({ auth, muscles }: PageProps<{ muscles: Muscle[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Muscles overview</h2>}
        >
            <Head title="Muscles overview" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-6 flex">
                            <h2 className="text-lg font-medium text-gray-900">Muscles overview and stuff</h2>
                            <Link className="ml-auto" href={route('muscles.create')}>Create new Muscle</Link>
                        </section>
                        <section className="p-6 grid grid-cols-5 gap-4">
                            {muscles.map(muscle => (
                                <Link
                                    key={muscle.id}
                                    className="relative shadow-lg rounded-2xl border border-gray-500 overflow-hidden"
                                    href={route('muscles.edit', { id: muscle.id })}
                                >
                                    <img className="h-64 p-6 mx-auto" src={muscle.image?.path} />
                                    <div className="absolute w-full p-6 bottom-0">
                                        <h3>{muscle.name}</h3>
                                    </div>
                                    <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-gray-900 opacity-40" />
                                </Link>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
