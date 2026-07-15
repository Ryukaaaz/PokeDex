import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { index as adminIndex } from '@/routes/admin_expansion'
import { update as UpdateAdminIndex } from '@/routes/admin_expansion'
import { create as CreateAdminIndex } from '@/routes/admin_expansion';
import { deleteMethod as DeleteAdminIndex } from '@/routes/admin_expansion';
import type { Expansion } from '@/types/admin_expansion';
import EditModal from './components/admin-editModal';

Index.layout = {
    breadcrumbs: [
        {
            title: 'Admin Expansion Page',
            href: adminIndex(),
        },
    ],
};

type Props = {
    expansionSets: Expansion[];
    allExpansionSets: Expansion[];
    filters: {
        series: string;
        name: string;
    }
}

export default function Index({
    expansionSets,
    allExpansionSets,
    filters: InitialFilters,
}: Props) {
    const filters = useForm({
        series: InitialFilters.series ?? '',
        name: InitialFilters.name ?? '',
    })
    const [selectedExpansion, setSelectedExpansion] = useState<Expansion | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState<Expansion | null>(null);

    const editForm = useForm({
        id: 0,
        code: '',
        series: '',
        name: '',
        release_date: '',
    })

    const createForm = useForm({
        code: '',
        series: '',
        name: '',
        release_date: '',
        printed_total: 0,
        total: 0,
        language: '',
    })

    //set the edit form data values
    const handleEdit = (expansion: Expansion) => {
        setSelectedExpansion(expansion);
        editForm.setData({
            id: expansion.id,
            code: expansion.code,
            series: expansion.series,
            name: expansion.name,
            release_date: expansion.release_date,
        })
    }

    //handle delete button
    const handleDelete = () => {
        if (!showDeleteModal) {
return;
}

        router.delete(DeleteAdminIndex(showDeleteModal.id).url, {
            onSuccess: () => {
                setShowDeleteModal(null);
                toast.success('Selected Expansion Deleted Successfully !');
            }
        })
    }

    //submit edit
    function submitEdit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (editForm.processing) {
return;
}

        if (!selectedExpansion) {
return;
}

        editForm.patch(UpdateAdminIndex(selectedExpansion.id).url, {
            onSuccess: () => {
                setSelectedExpansion(null);
                editForm.reset();

                toast.success('Expansion Updated Successfully !');
            }
        })
    }

    //submit create
    function submitCreate(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (createForm.processing) {
return;
}

        createForm.post(CreateAdminIndex().url, {
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();

                toast.success('New Expansion Set Created Successfully !');
            }
        })
    }

    //filtered the series options
    const seriesOptions = [
        ...new Set(allExpansionSets.map((expansion) => expansion.series)),
    ].map((series) => ({
        value: series,
        label: series
    }))

    //filtered name options upon series change
    const filteredNameOPtions = allExpansionSets.filter((expansion) => {
        if (!filters.data.series) {
return true;
}

        return expansion.series === filters.data.series;
    }).map((expansion) => ({
        value: expansion.name,
        label: expansion.name,
    }));
    //search
    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        router.get('/admin-expansion', {
            series: filters.data.series ?? '',
            name: filters.data.name ?? '',
        });
    }

    return (
        <>
            <Head title="Admin Expansion" />

            <h2 className="text-2xl font-bold p-4">{expansionSets.length} expansion sets found.</h2>

            {/* Search bar */}
            <div className='p-4'>
                <form onSubmit={submit}
                    className='flex gap-4 items-end'>
                    <FormSelect
                        label='series'
                        value={filters.data.series}
                        onChange={(e) => {
                            filters.setData('series', e.target.value);
                            filters.setData('name', '');
                        }}
                        options={seriesOptions}
                        error={filters.errors.series}
                    />
                    <FormSelect
                        label='name'
                        value={filters.data.name}
                        onChange={(e) =>
                            filters.setData('name', e.target.value)
                        }
                        options={filteredNameOPtions}
                        error={filters.errors.name}
                    />
                    <button className="btn btn-primary">
                        Search
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto p-4">
                <button className='btn btn-primary mt-4 mb-4' onClick={() => setShowCreateModal(true)}>
                    + Create New Expansion Pack
                </button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Language</th>
                            <th>Code</th>
                            <th>Series</th>
                            <th>Name</th>
                            <th>Release Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expansionSets.map((expansion) => {
                            return (
                                <tr key={expansion.id} className='hover:bg-base-300'>
                                    <th>{expansion.id}</th>
                                    <th>{expansion.language}</th>
                                    <th>{expansion.code}</th>
                                    <th>{expansion.series}</th>
                                    <th>{expansion.name}</th>
                                    <th>{expansion.release_date}</th>
                                    <th>
                                        <div className='flex gap-4'>
                                            <button className='btn btn-primary' onClick={() => handleEdit(expansion)}>
                                                Edit
                                            </button>
                                            <button className='btn btn-warning' onClick={() => setShowDeleteModal(expansion)}>
                                                Delete
                                            </button>

                                        </div>
                                    </th>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div >
            {/* Edit Modal */}
            <EditModal
                selectedExpansion={selectedExpansion}
                editForm={editForm}
                submitEdit={submitEdit}
                onClose={()=>setSelectedExpansion(null)}
            />
            {/* Create Modal */}
            {showCreateModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-5xl p-0 overflow-y-auto">
                        <div className="grid md:grid-cols-2">

                            {/* Left Side */}
                            <div className="bg-base-200 flex items-center justify-center p-8">

                                <figure className="w-full h-72 rounded-2xl bg-base-200 flex items-center justify-center overflow-hidden">
                                    <img
                                        src='https://img.daisyui.com/images/stock/card-1.webp?x'
                                        alt='name'
                                        className='w-full h-full object-contain'
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://img.daisyui.com/images/stock/card-1.webp?x";
                                        }}
                                    />
                                </figure>

                            </div>

                            {/* Right Side */}
                            <div className="p-8 flex flex-col">
                                <div className='flex justify-between items-center'>
                                    <h1>
                                        Create New Expansion Pack
                                    </h1>
                                </div>
                                <div className="divider"></div>
                                {/* Information */}
                                <form onSubmit={submitCreate} className='max-w-full space-y-4 p-4'>

                                    <FormInput
                                        label='Expansion Code'
                                        type='text'
                                        value={createForm.data.code}
                                        onChange={(e) =>
                                            createForm.setData("code", e.target.value)
                                        }
                                        error={createForm.errors.code}
                                    />
                                    <FormInput
                                        label='Expansion Series'
                                        type='text'
                                        value={createForm.data.series}
                                        onChange={(e) =>
                                            createForm.setData("series", e.target.value)
                                        }
                                        error={createForm.errors.series}
                                    />
                                    <FormInput
                                        label='Expansion name'
                                        type='text'
                                        value={createForm.data.name}
                                        onChange={(e) =>
                                            createForm.setData("name", e.target.value)
                                        }
                                        error={createForm.errors.name}
                                    />
                                    <FormInput
                                        label='Release Date'
                                        type='date'
                                        value={createForm.data.release_date}
                                        onChange={(e) =>
                                            createForm.setData("release_date", e.target.value)
                                        }
                                        error={createForm.errors.release_date}
                                    />

                                    <FormInput
                                        label='Total Card (without Secret)'
                                        type='number'
                                        value={createForm.data.printed_total}
                                        onChange={(e) =>
                                            createForm.setData("printed_total", Number(e.target.value))
                                        }
                                        error={createForm.errors.printed_total}
                                    />
                                    <FormInput
                                        label='Total Card (With Secret)'
                                        type='number'
                                        value={createForm.data.total}
                                        onChange={(e) =>
                                            createForm.setData("total", Number(e.target.value))
                                        }
                                        error={createForm.errors.total}
                                    />
                                    <FormInput
                                        label='Language'
                                        type='text'
                                        value={createForm.data.language}
                                        onChange={(e) =>
                                            createForm.setData("language", e.target.value)
                                        }
                                        error={createForm.errors.language}
                                    />

                                    <div className="divider"></div>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={editForm.processing}>
                                        {editForm.processing && (
                                            <span className='loading loading-spinner loading-sm'></span>
                                        )}
                                        {editForm.processing ? "Saving... " : "Create"}

                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setShowCreateModal(false)}>
                            close
                        </button>
                    </form>
                </dialog >
            )
            }

            {/* Delete Modal */}
            {showDeleteModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">
                            Delete Expansion Set
                        </h3>

                        <p className="py-4">
                            Are you sure you want to delete this expansion set?
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                className="btn"
                                onClick={() => setShowDeleteModal(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-error"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setSelectedExpansion(null)}>
                            close
                        </button>
                    </form>
                </dialog>
            )}

        </>
    );
}
