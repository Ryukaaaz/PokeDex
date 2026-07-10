import { Head, useForm } from '@inertiajs/react';
import { index as GradeIndex } from '@/routes/grade'
import { update as GradeUpdate } from '@/routes/grade';
import { create as GradeCreate } from '@/routes/grade';
import React, { useState } from 'react';
import { toast } from 'sonner';
import FormInput from '@/components/form/FormInput';

Index.layout = {
    breadcrumbs: [
        {
            title: 'Grade',
            href: GradeIndex(),
        },
    ],
};

type Grade = {
    id: number;
    name: string;
};

type Props = {
    grades: Grade[];
}

export default function Index({ grades }: Props) {
    const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const editForm = useForm({
        id: 0,
        name: '',
    })

    const createForm = useForm({
        name: '',
    })

    const handleEdit = (grade: Grade) => {
        setSelectedGrade(grade);

        editForm.setData({
            id: grade.id,
            name: grade.name,
        })
    }

    function submitEdit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editForm.processing) return;

        if (!selectedGrade) return;

        editForm.patch(GradeUpdate(selectedGrade.id).url, {
            onSuccess: () => {
                setSelectedGrade(null);
                editForm.reset();

                toast.success('Grade Updated Successfully !');
            }
        })
    }

    function submitCreate(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (createForm.processing) return;

        createForm.post(GradeCreate().url, {
            onSuccess: () => {
                setShowCreateForm(false);
                createForm.reset();

                toast.success('New Grade Created Successfully !');
            }
        })
    }

    return (
        <>
            <Head title="Grade pages" />
            <div className="overflow-x-auto p-4">
                <h1>List Of Grade</h1>
                <button className='btn btn-primary mt-4 mb-4' onClick={() => setShowCreateForm(true)}>
                    + Create New Grade
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade) => {
                            return (
                                <tr key={grade.id} className="hover:bg-base-300">
                                    <th>{grade.id}</th>
                                    <td>{grade.name}</td>
                                    <td>
                                        <button className='btn btn-primary' onClick={() => handleEdit(grade)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
                {/* edit modal */}
                {selectedGrade && (
                    <dialog className='modal modal-open'>
                        <div className='modal-box max-w-5xl p-0 overflow-hidden'>
                            <div className='p-8 flex flex-col'>
                                <div className='flex justify-between items-center'>
                                    <h1>
                                        Edit Grade
                                    </h1>
                                </div>
                                <form onSubmit={submitEdit} className='max-w-full space-y-4 p-4'>
                                    <FormInput
                                        label='Grade Name'
                                        type='text'
                                        value={editForm.data.name}
                                        onChange={(e) =>
                                            editForm.setData("name", e.target.value)
                                        }
                                        error={editForm.errors.name}
                                    />
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={editForm.processing}>
                                        {editForm.processing && (
                                            <span className='loading loading-spinner loading-sm'></span>
                                        )}
                                        {editForm.processing ? "Saving..." : "Update"}
                                    </button>


                                </form>
                            </div>
                        </div>

                        <form method='dialog' className='modal-backdrop'>
                            <button onClick={() => setSelectedGrade(null)}>
                                close
                            </button>
                        </form>
                    </dialog>
                )}

                {/* create modal */}
                {showCreateForm && (
                    <dialog className='modal modal-open'>
                        <div className='modal-box max-w-5xl p-0 overflow-hidden'>
                            <div className='p-8 flex flex-col'>
                                <div className='flex justify-between items-center'>
                                    <h1>
                                        Create Grade
                                    </h1>
                                </div>
                                <form onSubmit={submitCreate} className='max-w-full space-y-4 p-4'>
                                    <FormInput
                                        label='Grade Name'
                                        type='text'
                                        value={createForm.data.name}
                                        onChange={(e) =>
                                            createForm.setData("name", e.target.value)
                                        }
                                        error={createForm.errors.name}
                                    />
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={createForm.processing}>
                                        {createForm.processing && (
                                            <span className='loading loading-spinner loading-sm'></span>
                                        )}
                                        {createForm.processing ? "Saving..." : "Create"}
                                    </button>


                                </form>
                            </div>
                        </div>

                        <form method='dialog' className='modal-backdrop'>
                            <button onClick={() => setSelectedGrade(null)}>
                                close
                            </button>
                        </form>
                    </dialog>
                )}
            </div >

        </>
    );
}
