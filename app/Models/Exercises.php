<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercises extends Model
{
    use HasFactory;
    protected $table = 'exercises';
    protected $fillable = [
        'name',
        'primary_muscle_id',
        'images'
    ];

    public function primaryMuscle()
    {
        return $this->belongsTo(Muscles::class,'primary_muscle_id');
    }

    public function secondaryMuscles()
    {
        return $this->belongsToMany(Muscles::class,'muscle_exercise');
    }
}
