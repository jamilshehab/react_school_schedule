<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    //
 protected $fillable=['name'];



 public function schedules(){
  $this->belongsToMany(Schedule::class);
 }
 
}
