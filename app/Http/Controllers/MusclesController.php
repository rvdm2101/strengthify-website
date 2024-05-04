<?php

namespace App\Http\Controllers;

use App\Http\Requests\MuscleRequest;
use App\Models\Images;
use App\Models\Muscles;
use Inertia\Inertia;
use Inertia\Response;

class MusclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Muscles/Index', [
            'muscles' => Muscles::with('image')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Muscles/Create', [
            'images' => Images::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MuscleRequest $request)
    {
        $muscle = new Muscles();
        $muscle->fill($request->validated());
        $muscle->save();

        return redirect()->route('muscles.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $muscle = Muscles::with('image')->find($id);
        return Inertia::render('Muscles/Edit', [
            'muscle' => $muscle,
            'images' => Images::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MuscleRequest $request, string $id)
    {
        $muscle = Muscles::find($id);
        $muscle->fill($request->validated());
        $muscle->save();

        return redirect()->route('muscles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!Muscles::where('id', $id)->exists()) {
            return redirect()->route('muscles.index');
        }

        $muscle = Muscles::find($id);
        $muscle->delete();
        return redirect()->route('muscles.index');
    }
}
