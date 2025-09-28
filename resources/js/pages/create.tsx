import { FormData, Option, OptionsData } from '@/types';
import axios from 'axios';
import { useState } from 'react';
import { fetchOptions } from '../api/fetchOptions'; // your API utility

import { toast } from 'react-toastify';
import SelectFields from '../components/SelectFields';
function ScheduleForm() {
    const [formData, setFormData] = useState<FormData>({
        teacher: null,
        school_classes: [],
        subjects: [],
        times: [],
        days: [],
    });

    const [options, setOptions] = useState<OptionsData>({
        teachers: [],
        school_classes: [],
        subjects: [],
        times: [],
        days: [],
    });

    const loadOptions = async () => {
        try {
            const data = await fetchOptions('/api/schedule');

            setOptions({
                teachers: data.teachers.map((t: any) => ({ value: t.id, label: t.name })),
                school_classes: data.school_classes.map((c: any) => ({ value: c.id, label: `${c.name} ${c.category === null ? '' : c.category}` })),
                subjects: data.subjects.map((s: any) => ({ value: s.id, label: s.name })),
                times: data.times.map((t: any) => ({ value: t.id, label: `${t.name} (${t.hour})` })), // adjust to your API field
                days: data.days.map((d: any) => ({ value: d.id, label: d.name })),
            });
        } catch (error) {
            console.error('Error loading options:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                teacher_id: formData.teacher?.value, // single ID
                school_classes: formData.school_classes.map((c) => c.value), // array of IDs
                subjects: formData.subjects.map((s) => s.value), // array of IDs
                times: formData.times.map((t) => t.value), // array of IDs
                days: formData.days.map((d) => d.value), // array of IDs
            };

            console.log('Submit payload:', payload); // optional: check the IDs before sending

            const response = await axios.post('/schedule', payload);

            console.log('Success:', response.data);
            toast.success('✅ Schedule created successfully!');
            window.location.href = '/schedule';
        } catch (error: any) {
            console.error('Error submitting form:', error.response?.data || error.message);
            toast.error('❌ Failed to create schedule!');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-full max-w-3xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Create Class Schedule</h1>
                    <p className="text-gray-600">Fill in the details below to create a new class schedule</p>
                </div>
                <form onSubmit={handleSubmit} method="POST" className="space-y-8 rounded-2xl bg-white p-12 shadow-lg">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <SelectFields
                                label="Teacher"
                                value={formData.teacher}
                                onChange={(val) => setFormData({ ...formData, teacher: val as Option })}
                                options={options.teachers}
                                onMenuOpen={loadOptions} // same function
                            />
                        </div>
                        <div>
                            <SelectFields
                                label="Subjects"
                                value={formData.subjects}
                                onChange={(val) => setFormData({ ...formData, subjects: val as Option[] })}
                                options={options.subjects}
                                isMulti
                                onMenuOpen={loadOptions}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <SelectFields
                                label="Classes"
                                value={formData.school_classes}
                                onChange={(val) => setFormData({ ...formData, school_classes: val as Option[] })}
                                options={options.school_classes}
                                isMulti
                                onMenuOpen={loadOptions}
                            />
                        </div>
                        <div>
                            <SelectFields
                                label="Times"
                                value={formData.times}
                                onChange={(val) => setFormData({ ...formData, times: val as Option[] })}
                                options={options.times}
                                isMulti
                                onMenuOpen={loadOptions}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <SelectFields
                                label="Days"
                                value={formData.days}
                                onChange={(val) => setFormData({ ...formData, days: val as Option[] })}
                                options={options.days}
                                isMulti
                                onMenuOpen={loadOptions}
                            />
                        </div>
                    </div>
                    <button type="submit" className="cursor-pointer rounded-full border border-green-500 px-6 py-2 text-green-600 hover:bg-green-50">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
export default ScheduleForm;
