<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('path');
            $table->string('alt')->nullable();
            $table->timestamps();
        });

        Schema::table('muscles', function (Blueprint $table) {
            $table->dropColumn('image');
            $table->unsignedBigInteger('image_id')->nullable();

            $table->foreign('image_id')->references('id')->on('images')->cascadeOnDelete();
        });

        Schema::table('exercises', function (Blueprint $table) {
            $table->dropColumn('images');
        });

        Schema::create('exercise_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('exercise_id');
            $table->unsignedBiginteger('image_id');


            $table->foreign('exercise_id')->references('id')
                ->on('exercises')->onDelete('cascade');
            $table->foreign('image_id')->references('id')
                ->on('images')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
