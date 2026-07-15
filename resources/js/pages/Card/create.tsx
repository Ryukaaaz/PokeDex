import { useForm, Head } from '@inertiajs/react';
import { useState } from 'react';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { create as CardCreate } from '@/routes/cards';
import { store as CardStore } from '@/routes/cards';
Index.layout = {
    breadcrumbs: [
        {
            title: 'Crete New Card',
            href: CardCreate,
        },
    ],
};

type Rarity = {
    id: number,
    code: string,
    name: string,
}

type Props = {
    rarities: Rarity[];
    expansion_set_id: number;
    expansion_set_name: string;
}


export default function Index({
    rarities,
    expansion_set_id,
    expansion_set_name,

}: Props) {

    const form = useForm({
        expansion_set_id: expansion_set_id,
        name: '',
        card_number: '',
        rarity: '',
        image: null as File | null,
    })

    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if(form.processing) {
return;
}

        form.post(CardStore().url);
    }

    function handleImageChange (e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];

        if(!file){
return;
}

        if(file.size> 2* 1024*1024){
            alert("Image must be smaller than 2 MB.");

            return;
        }

        form.setData("image",file);

        setPreview(URL.createObjectURL(file));

    }

    const rarity_options = rarities.map((rarity)=>({
        value: rarity.id,
        label: rarity.name,
    }))

    const [preview, setPreview] = useState<string | null> (null);

    return (
        <>
            <Head title="Create New Card" />
            <h2 className="text-2xl font-bold p-4">Create New Card In {expansion_set_name} Expansion Pack</h2>
            <form onSubmit={submit} className='max-w-full space-y-4 p-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1 border'>
                        <input type="file" accept='.jpg,.jpeg,.png' onChange={handleImageChange}/>

                        {form.errors.image&&(
                            <p className='text-error'>{form.errors.image}</p>
                        )}

                        {preview ? (
                            <img src={preview} alt="Preview" className='w-full h-80 object-contain' />
                        ): (
                            <p>No Image Selected</p>
                        )}

                    </div>
                    <div className='flex-1 border'>

                        <FormInput
                            label='Expansion Id'
                            type="number"
                            value={expansion_set_id}
                            onChange={(e) =>
                                form.setData("expansion_set_id", Number(e.target.value))
                            }
                            error={form.errors.expansion_set_id}
                            readOnly
                        />
                        <FormInput
                            label='Card Name'
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            error={form.errors.name}
                        />
                        <FormInput
                            label='Card Number'
                            type="number"
                            value={form.data.card_number}
                            onChange={(e) =>
                                form.setData("card_number", e.target.value)
                            }
                            error={form.errors.card_number}
                        />
                        <FormSelect
                            label='Rarity'
                            value={form.data.rarity}
                            onChange={(e)=>
                                form.setData('rarity', e.target.value)
                            }
                            options={rarity_options}
                            error={form.errors.rarity}
                        />

                    </div>
                </div>

                <button 
                type='submit'
                className='btn btn-primary'
                disabled={form.processing}>
                    {form.processing && (
                        <span className='loading loading-spinner loading-sm'></span>
                    )}
                    {form.processing ? "Saving..." : "Create"}
                </button>
            </form>
        </>
    );
}
