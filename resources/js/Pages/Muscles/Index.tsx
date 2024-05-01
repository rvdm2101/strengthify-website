import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Muscle, PageProps } from '@/types';

export default function Index({ auth, muscles }: PageProps<{ muscles: Muscle[] }>) {
    console.log({ muscles });
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
                        <section className="p-6 flex">
                            {muscles.map(muscle => (
                                <div key={muscle.id}>
                                    <h3>{muscle.name}</h3>
                                    <img src={`/images/${muscle.image}`} />
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
