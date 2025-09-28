<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    //
    protected $fillable=['name','category'];

  
   
    public function schedules(){
       return $this->belongsToMany(Schedule::class);    }
   }
