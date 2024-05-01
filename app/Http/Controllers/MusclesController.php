<?php

namespace App\Http\Controllers;

use App\Http\Requests\Muscles\MuscleCreateRequest;
use App\Models\Muscles;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MusclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Muscles/Index', [
            'muscles' => Muscles::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Muscles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MuscleCreateRequest $request)
    {
        $muscle = new Muscles();
        $muscle->fill($request->validated());

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $request->image->storeAs('images', $filename);
            $muscle->image = $filename;
        }

        $muscle->save();
        return redirect()->route('muscles.index');
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
