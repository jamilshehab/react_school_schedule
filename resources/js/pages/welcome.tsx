import { Link, router } from '@inertiajs/react';
import { FaFileExport, FaPlus } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function Welcome({ schedules = [] }: { schedules?: any[] }) {
    console.log('Schedules:', schedules); // <-- frontend log
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this schedule?')) {
            router.delete(`/schedule/${id}`, {
                onSuccess: () => toast.success('🗑️ Schedule deleted successfully!'),
                onError: () => toast.error('❌ Failed to delete schedule'),
            });
            window.location.href = '/schedule';
        }
    };
    const handleExport = () => {
        window.location.href = '/schedules/export'; // triggers the download
    };
    return (
        <div className="mx-auto max-w-7xl py-5">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/schedule/create"
                    className="flex items-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
                >
                    <FaPlus className="mr-3" /> Add Schedule
                </Link>
                <Link
                    href="#"
                    onClick={handleExport}
                    className="flex items-center rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-green-700"
                >
                    <FaFileExport className="mr-2" /> Export
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase">Teacher Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase">Time</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase">Classes</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase">Days</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase">Subjects</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {schedules.length > 0 ? (
                            schedules.map((schedule: any) => (
                                <tr key={schedule.id} className="transition duration-150 hover:bg-blue-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                                <span className="font-bold text-blue-600">
                                                    {schedule.teacher?.name
                                                        ?.split(' ')
                                                        .map((n: any) => n[0])
                                                        .join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{schedule.teachers || ''}</div>
                                                <div className="text-sm text-gray-500">{schedule.teacher?.name || ''}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{schedule.times?.map((t: any) => t.hour).join(', ') || ''}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {schedule.school_classes?.map((c: any) => (
                                            <span
                                                key={c.id}
                                                className="mr-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs leading-5 font-semibold text-green-800"
                                            >
                                                {c.name} {c.category ? `(${c.category})` : ''}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                        {schedule.days?.map((d: any) => d.name).join(', ') || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {schedule.subjects?.map((s: any) => (
                                            <div key={s.id}>
                                                <div className="text-sm font-medium text-gray-900">{s.name}</div>
                                                <div className="text-sm text-gray-500">{s.description || ''}</div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                        <td className="flex px-6 py-4">
                                            {/* Edit Button */}
                                            <Link href={`/schedule/${schedule.id}/edit`} className="mr-3 text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(schedule.id)}
                                                className="cursor-pointer text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-4 text-center text-gray-500">
                                    No schedules found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
