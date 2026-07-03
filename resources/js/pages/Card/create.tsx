import { useForm, Head } from '@inertiajs/react';
import { create as CardCreate } from '@/routes/cards';
import FormInput from '@/components/form/FormInput';
Index.layout = {
    breadcrumbs: [
        {
            title: 'Crete New Card',
            href: CardCreate,
        },
    ],
};


export default function Index() {

    const form = useForm({
        name: '',
        rarity: '',
    })

    function submit(e: React.FormEvent){
        e.preventDefault();
        form.post('/cards/store')
    }

    return (
        <>
            <Head title="Create New Card" />
            <form onSubmit={submit} className='max-w-xl auto space-y-4 p-4'>
                <FormInput 
                    label='Card Name'
                    type="text"
                    value={form.data.name}
                    onChange={(e)=>
                        form.setData("name",e.target.value)
                    }
                    error={form.errors.name}
                />
                <FormInput 
                    label='Card Rarity'
                    type="number"
                    value={form.data.rarity}
                    onChange={(e)=>
                        form.setData("rarity",e.target.value)
                    }
                    error={form.errors.rarity}
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}
