<?php

namespace Database\Seeders;

use App\Models\Time;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
 
   $times = [
    ['name' => 'First Period',  'hour' => '08:00 - 08:50'],
    ['name' => 'Second Period', 'hour' => '08:50 - 09:40'],
    ['name' => 'Third Period',  'hour' => '09:40 - 10:30'],
    ['name' => 'Fourth Period', 'hour' => '10:30 - 11:20'],
    ['name' => 'Fifth Period',  'hour' => '11:50 - 12:40'],
    ['name' => 'Sixth Period',  'hour' => '1:30 - 2:15'],
    ['name' => 'Seventh Period','hour' => '2:15 - 3:00'],
];

foreach ($times as $time) {
    Time::create($time);
}       
    }
}
