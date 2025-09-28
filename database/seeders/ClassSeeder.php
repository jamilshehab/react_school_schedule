<?php

namespace Database\Seeders;

use App\Models\SchoolClass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $classes = [
    ['name' => 'Seventh Grade', 'category' => null],
    ['name' => 'Eighth Grade', 'category' => null],
    ['name' => 'Ninth Grade', 'category' => null],
    ['name' => 'Tenth Grade', 'category' => null],
    // Eleventh Grade with branches
    ['name' => 'Eleventh Grade', 'category' => 'Scientific'],
    ['name' => 'Eleventh Grade', 'category' => 'Literary'],
    // Twelfth Grade with branches
    ['name' => 'Twelfth Grade', 'category' => 'Life Sciences'],
    ['name' => 'Twelfth Grade', 'category' => 'Sociology/Economics'],
    ['name' => 'Twelfth Grade', 'category' => 'Literary'],
];

 foreach($classes as $class){
            SchoolClass::create($class);
        }
    }
}
