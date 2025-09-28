<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    //
    protected $fillable=['start_time','end_time'];

    public function schedules(){
        return $this->belongsToMany(Schedule::class);
    }
    
    
}
