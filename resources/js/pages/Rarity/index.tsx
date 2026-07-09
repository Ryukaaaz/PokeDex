import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { index as RarityIndex } from '@/routes/rarity'
import { update as UpdateRarity } from '@/routes/rarity'
import FormInput from '@/components/form/FormInput';
Index.layout = {
    breadcrumbs: [
        {
            title: 'Rarity',
            href: RarityIndex(),
        },
    ],
};

type Rarity = {
    id: number;
    code: string;
    name: string;
};

type Props = {
    rarities: Rarity[];
}

type pageProps = {
    flash: {
        success?: string;
        error?: string;
    }
}

export default function Index({ rarities }: Props) {
    const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);
    const { flash } = usePage<pageProps>().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);

    useEffect(() => {
        if (!flash.success) return;

        setShowSuccess(true);

        const timer = setTimeout(() => {
            setShowSuccess(false);
        }, 3000)

        return () => clearTimeout(timer);
    }, [flash.success])

    const form = useForm({
        id: 0,
        code: '',
        name: '',
    })

    const handleEdit = (rarity: Rarity) => {
        setSelectedRarity(rarity);

        form.setData({
            id: rarity.id,
            code: rarity.code,
            name: rarity.name,
        })
    }

    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.processing) return;

        if (!selectedRarity) return;

        form.patch(UpdateRarity(selectedRarity.id).url, {
            onSuccess: () => {
                setSelectedRarity(null);
                form.reset();
            }
        });
    }

    return (
        <>
            <Head title="Rarity pages" />
            <div className="overflow-x-auto p-4">
                {/* ALERT */}
                {
                    showSuccess && (
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{flash.success}</span>
                        </div>
                    )
                }
                <h1>List Of Rarity</h1>
                <Link href='#' className='btn btn-primary mt-4 mb-4'>
                    + Create New Rarity
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rarities.map((rarity) => {
                            return (
                                <tr key={rarity.id} className="hover:bg-base-300">
                                    <th>{rarity.id}</th>
                                    <td>{rarity.code}</td>
                                    <td>{rarity.name}</td>
                                    <td>
                                        <button className='btn btn-primary' onClick={() => handleEdit(rarity)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>

                            );
                        })}

                    </tbody>
                </table>
                {/* Modal */}
                {selectedRarity && (

                    <dialog className='modal modal-open'>
                        <div className='modal-box max-w-5xl p-0 overflow-hidden'>
                            <div className='p-8 flex flex-col'>
                                <div className='flex justify-between items-center'>
                                    <h1>
                                        Edit Rarity
                                    </h1>
                                </div>
                                <form onSubmit={submit} className='max-w-full space-y-4 p-4'>
                                    <FormInput
                                        label='Rarity code'
                                        type='text'
                                        value={form.data.code}
                                        onChange={(e) =>
                                            form.setData("code", e.target.value)
                                        }
                                        error={form.errors.code}
                                    />
                                    <FormInput
                                        label='Rarity Name'
                                        type='text'
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData("name", e.target.value)
                                        }
                                        error={form.errors.name}
                                    />
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={form.processing}>
                                        {form.processing && (
                                            <span className='loading loading-spinner loading-sm'></span>
                                        )}
                                        {form.processing ? "Saving..." : "Update"}
                                    </button>


                                </form>
                            </div>
                        </div>

                        <form method='dialog' className='modal-backdrop'>
                            <button onClick={() => setSelectedRarity(null)}>
                                close
                            </button>
                        </form>
                    </dialog>
                )}
            </div>

        </>
    );
}
