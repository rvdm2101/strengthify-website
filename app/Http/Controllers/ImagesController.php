<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Models\Images;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Images/Index', [
            'images' => Images::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Images/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ImageRequest $request): RedirectResponse
    {
        $request->validated();
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $filePath = $file->store('images');

            $image = new Images();
            $image->filename = $filename;
            $image->path = $filePath;
            $image->alt = $request->input('alt', $filename);
            $image->save();
        }

        return redirect()->route('images.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!Images::where('id', $id)->exists()) {
        }

        $image = Images::find($id);
        Storage::delete($image->path);
        $image->delete();
        return redirect()->route('images.index');
    }
}
