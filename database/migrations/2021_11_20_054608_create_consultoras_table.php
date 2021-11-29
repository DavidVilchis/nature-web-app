<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultorasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultoras', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_consultora');
            $table->string('apellido_paterno_consultora');
            $table->string('apellido_materno_consultora');
            $table->string('email')->unique();
            $table->string('estado');
            $table->char('telefono',10);
            $table->string('domicilio');
            $table->timestamps();

            $table->foreignId('redes_consultora_id')->references('id')->on('redes_consultoras')->cascadeOnDelete();
            $table->foreignId('consultora_red')->nullable($value=true)->constrained('consultoras')->cascadeOnDelete();
            $table->foreignId('nivel_consultora_id')->references('id')->on('niveles_consultora')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consultoras');
    }
}
