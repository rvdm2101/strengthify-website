import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Image, PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, images }: PageProps<{ images: Image[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Uploaded images overview</h2>
                    <Link className="ml-auto" href={route('images.create')}>Upload new image</Link>
                </div>
            }
        >
            <Head title="Uploaded images overview" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="px-4 py-2 divide-y">
                            {images.length ? images.map(image => (
                                <div key={image.id} className="flex flex-row py-2">
                                    <div className="h-20 w-20 bg-center bg-no-repeat bg-contain" style={{ backgroundImage: `url(${image.path})` }} />
                                    <div className="pl-4 pt-2">
                                        <h3 className="text-lg font-semibold text-gray-800">{image.filename}</h3>
                                        {image.alt ? <span className="text-sm text-gray-600">{image.alt}</span> : null}
                                    </div>
                                    <div className="ml-auto">
                                        <PrimaryButton onClick={() => router.delete(route('images.destroy', { id: image.id }))}>Delete image</PrimaryButton>
                                    </div>
                                </div>
                            )) : (
                                <h3 className="p-6 text-md text-gray-800">No uploaded images found</h3>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
