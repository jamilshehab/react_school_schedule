<?php

use App\Http\Controllers\ScheduleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

 
Route::get('/', function () {
    return redirect('/schedule');
});

 Route::resource('schedule', ScheduleController::class)->except(['show']);
Route::get('/api/schedule',[ScheduleController::class,'displayInformation'])->name('schedule.display');
Route::get('/schedules/export', [ScheduleController::class, 'export'])->name('schedules.export');
