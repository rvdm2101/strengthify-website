<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Muscles extends Model
{
    use HasFactory;
    protected $table = 'muscles';
    protected $fillable = [
        'name',
        'image_id'
    ];

    public function primaryInExercises()
    {
        return $this->hasMany(Exercises::class, 'primary_muscle_id');
    }

    public function secondaryInExercises()
    {
        return $this->belongsToMany(Exercises::class, 'muscle_exercise');
    }

    public function image()
    {
        return $this->belongsTo(Images::class, 'image_id');
    }
}
