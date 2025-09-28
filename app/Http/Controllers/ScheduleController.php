<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Schedule;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\Time;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Rap2hpoutre\FastExcel\FastExcel;
class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
$schedules = Schedule::with(['teacher', 'schoolClasses', 'subjects', 'times', 'days'])->get();

          if ($schedules->isEmpty()) {
        return response()->json([
            'message' => 'No schedules found',
            'data' => []
        ], 404); // 404 or 200 depending on your API design
    }

     
        return inertia('welcome', [
        'schedules' => $schedules
    ]);
    
    
}
    public function displayInformation(){
    $teachers = Teacher::all();
    $classes  = SchoolClass::all(); // if you called your model ClassModel
    $subjects = Subject::all();
    $times    = Time::all();
    $days     = Day::all();

    return response()->json([
        'message'=>'Displayed Successfully',
        'teachers'  => $teachers,
        'school_classes'=> $classes,
        'subjects'  => $subjects,
        'times'     => $times,
        'days'      => $days,
    ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
 
    return Inertia::render('create');
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
$validated = $request->validate([
    'teacher_id' => 'required|exists:teachers,id',
    'subjects'   => 'required|array',
    'subjects.*' => 'exists:subjects,id',
    'school_classes'    => 'required|array',
    'school_classes.*'  => 'exists:school_classes,id',
    'times'      => 'required|array',
    'times.*'    => 'exists:times,id',
    'days'       => 'required|array',
    'days.*'     => 'exists:days,id',
]);
   

    // 1. Create the schedule
    $schedule = Schedule::create([
        'teacher_id' => $validated['teacher_id'],
    ]);

    // 2. Attach many-to-many relations
    $schedule->subjects()->sync($validated['subjects']);
    $schedule->schoolClasses()->sync($validated['school_classes']);
    $schedule->times()->sync($validated['times']);
    $schedule->days()->sync($validated['days']);

    return response()->json(['message' => 'Schedule created successfully']);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
  public function edit(string $id)
{
    $schedule = Schedule::with(['teacher', 'schoolClasses', 'subjects', 'times', 'days'])
        ->findOrFail($id);

    return Inertia::render('edit', [
        'schedule' => $schedule,
    ]);
}


    /**
     * Update the specified resource in storage.
     */ public function update(Request $request, string $id)
{
     $schedule = Schedule::with(['teacher', 'schoolClasses', 'subjects', 'times', 'days'])
        ->findOrFail($id);


    $validated = $request->validate([
        'teacher_id' => 'required|exists:teachers,id',
        'subjects' => 'required|array',
        'subjects.*' => 'exists:subjects,id',
        'school_classes' => 'required|array',
        'school_classes.*' => 'exists:school_classes,id',
        'times' => 'required|array',
        'times.*' => 'exists:times,id',
        'days' => 'required|array',
        'days.*' => 'exists:days,id',
    ]);

    // Update teacher_id
    $schedule->teacher_id = $validated['teacher_id'];
    $schedule->save();

    // Sync many-to-many relations
    $schedule->subjects()->sync($validated['subjects']);
    $schedule->schoolClasses()->sync($validated['school_classes']);
    $schedule->times()->sync($validated['times']);
    $schedule->days()->sync($validated['days']);

    return response()->json(['message' => 'Schedule updated successfully']);
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
          $schedule = Schedule::with(['teacher', 'schoolClasses', 'subjects', 'times', 'days'])
        ->findOrFail($id);

        $schedule->delete();
        return Inertia::render('welcome');
    }
    public function export()
{
    $schedules = Schedule::with(['teacher', 'subjects', 'schoolClasses', 'days', 'times'])->get();

    $exportData = $schedules->map(function ($schedule) {
        return [
            'Teacher' => $schedule->teacher->name ?? '',
            'Subject' => $schedule->subjects->pluck('name')->join(', '),
            'Class' => $schedule->schoolClasses->pluck('name')->join(', '),
            'Class Category' => $schedule->schoolClasses->pluck('category')->join(', '),
            'Session' => $schedule->times->pluck('name')->join(', '),
            'Time' => $schedule->times->pluck('hour')->join(', '),
            'Day' => $schedule->days->pluck('name')->join(', '),
        ];
    });

    return (new FastExcel($exportData))->download('schedules.xlsx');
}
}
