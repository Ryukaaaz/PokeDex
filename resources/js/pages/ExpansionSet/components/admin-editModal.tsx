import { InertiaFormProps, useForm } from "@inertiajs/react";
import FormInput from '@/components/form/FormInput';
import { Expansion } from "@/types/admin_expansion";

type ExpansionForm = {
    id: number;
    code: string;
    series: string;
    name: string;
    release_date: string;
}

type Props = {
    selectedExpansion: Expansion | null;
    editForm: InertiaFormProps<ExpansionForm>;
    submitEdit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

export default function EditModal({
    selectedExpansion,
    editForm,
    submitEdit,
    onClose,
}: Props) {
    if (!selectedExpansion) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-5xl p-0 overflow-y-auto">
                <div className="grid md:grid-cols-2">

                    {/* Left Side */}
                    <div className="bg-base-200 flex items-center justify-center p-8">

                        <figure className="w-full h-72 rounded-2xl bg-base-200 flex items-center justify-center overflow-hidden">
                            <img
                                src={`/storage/${selectedExpansion.name}`}
                                alt={selectedExpansion.name}
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
                                Edit Expansion
                            </h1>
                        </div>
                        <div className="divider"></div>
                        {/* Information */}
                        <form onSubmit={submitEdit} className='max-w-full space-y-4 p-4'>
                            <FormInput
                                label='Expansion Code'
                                type='text'
                                value={editForm.data.code}
                                onChange={(e) =>
                                    editForm.setData("code", e.target.value)
                                }
                                error={editForm.errors.code}
                            />
                            <FormInput
                                label='Expansion Series'
                                type='text'
                                value={editForm.data.series}
                                onChange={(e) =>
                                    editForm.setData("series", e.target.value)
                                }
                                error={editForm.errors.series}
                            />
                            <FormInput
                                label='Expansion name'
                                type='text'
                                value={editForm.data.name}
                                onChange={(e) =>
                                    editForm.setData("name", e.target.value)
                                }
                                error={editForm.errors.name}
                            />
                            <FormInput
                                label='Release Date'
                                type='date'
                                value={editForm.data.release_date}
                                onChange={(e) =>
                                    editForm.setData("release_date", e.target.value)
                                }
                                error={editForm.errors.release_date}
                            />

                            <div className="divider"></div>
                            <button
                                type='submit'
                                className='btn btn-primary'
                                disabled={editForm.processing}>
                                {editForm.processing && (
                                    <span className='loading loading-spinner loading-sm'></span>
                                )}
                                {editForm.processing ? "Saving... " : "Update"}

                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>
                    close
                </button>
            </form>
        </dialog>
    )
}