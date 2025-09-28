<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    //
    protected $fillable=['teacher_id'];

    public function schoolClasses(){
        return $this->belongsToMany(SchoolClass::class);
    }
    public function subjects(){
        return $this->belongsToMany(Subject::class);
    }
    public function teacher(){
        return $this->belongsTo(Teacher::class);

    }
    public function days(){
        return $this->belongsToMany(Day::class);
    }
    public function times(){
        return $this->belongsToMany(Time::class);
    }
}
