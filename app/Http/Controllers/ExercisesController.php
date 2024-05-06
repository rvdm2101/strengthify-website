<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExerciseFormRequest;
use App\Models\Exercises;
use App\Models\Images;
use App\Models\Muscles;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ExercisesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Exercises/Index', [
            'exercises' => Exercises::with(['primaryMuscle', 'secondaryMuscles', 'images'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Exercises/Create', [
            'images' => Images::all(),
            'muscles' => Muscles::with('image')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExerciseFormRequest $request)
    {
        $exercise = new Exercises();
        $exercise->fill($request->validated());
        $exercise->save();

        $exercise->secondaryMuscles()->attach($request->input('secondary_muscle_ids'));
        $exercise->images()->attach($request->input('image_ids'));

        return redirect()->route('exercises.index');
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
