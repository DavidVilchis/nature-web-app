<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->foreignId('consultora_id')->references('id')->on('consultoras')->cascadeOnDelete();
            $table->foreignId('producto_id')->references('id')->on('productos')->cascadeOnDelete();
            $table->integer('cantidad');
            $table->double('total_consultora');
            $table->double('total_venta');
            $table->primary(['consultora_id', 'producto_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedidos');
    }
}
