import { Head } from '@inertiajs/react';
import { index as GradeIndex } from '@/routes/grade'
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
    return (
        <>
            <Head title="Grade pages" />
            <div className="overflow-x-auto p-4">
                <h1>List Of Grade</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade) => {
                            return (
                                <tr className="hover:bg-base-300">
                                    <th>{grade.id}</th>
                                    <td>{grade.name}</td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>

        </>
    );
}
