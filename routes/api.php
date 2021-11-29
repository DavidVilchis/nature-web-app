<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\CampañasController;
use App\Http\Controllers\RedesConsultorasController;
use App\Http\Controllers\NivelesConsultoraController;
use App\Http\Controllers\ConsultorasController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\PedidosController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);

Route::middleware('auth:api')->group(function (){
    Route::post('/pedidos_store', [PedidosController::class, 'store']);
    Route::post('/pedidos_update', [PedidosController::class, 'update']);
    Route::post('/pedidos_destroy', [PedidosController::class, 'destroy']);
    Route::get('/pedidos_index', [PedidosController::class, 'index']);

    Route::post('/pedidos_index_id', [PedidosController::class, 'index_id']);
    Route::post('/pedidos_store_id', [PedidosController::class, 'store_id']);
    Route::post('/pedidos_update_id', [PedidosController::class, 'update_id']);
    Route::post('/pedidos_destroy_id', [PedidosController::class, 'destroy_id']);

    Route::post('/campañas_store', [CampañasController::class, 'store']);
    Route::post('/campañas_update', [CampañasController::class, 'update']);
    Route::post('/campañas_destroy', [CampañasController::class, 'destroy']);
    Route::get('/campañas_index', [CampañasController::class, 'index']);
    
    Route::post('/redes_consultoras_store', [RedesConsultorasController::class, 'store']);
    Route::post('/redes_consultoras_update', [RedesConsultorasController::class, 'update']);
    Route::post('/redes_consultoras_destroy', [RedesConsultorasController::class, 'destroy']);
    Route::get('/redes_consultoras_index', [RedesConsultorasController::class, 'index']);
    Route::post('/redes_consultoras_estado', [RedesConsultorasController::class, 'estado']);

    Route::post('/niveles_consultora_store', [NivelesConsultoraController::class, 'store']);
    Route::post('/niveles_consultora_update', [NivelesConsultoraController::class, 'update']);
    Route::post('/niveles_consultora_destroy', [NivelesConsultoraController::class, 'destroy']);
    Route::get('/niveles_consultora_index', [NivelesConsultoraController::class, 'index']);

    Route::post('/consultoras_store', [ConsultorasController::class, 'store']);
    Route::post('/consultoras_update', [ConsultorasController::class, 'update']);
    Route::post('/consultoras_destroy', [ConsultorasController::class, 'destroy']);
    Route::post('/consultoras_information', [ConsultorasController::class, 'information']);
    Route::post('/consultoras_redes', [ConsultorasController::class, 'redes']);
    Route::get('/consultoras_index', [ConsultorasController::class, 'index']);
    Route::post('/consultoras_index_email', [ConsultorasController::class, 'index_email']);

    Route::post('/productos_store', [ProductosController::class, 'store']);
    Route::post('/productos_update', [ProductosController::class, 'update']);
    Route::post('/productos_update_movil', [ProductosController::class, 'update_movil']);
    Route::post('/productos_destroy', [ProductosController::class, 'destroy']);
    Route::get('/productos_index', [ProductosController::class, 'index']);
    Route::post('/productos_id', [ProductosController::class, 'index_id']);

    Route::post('/usuarios_email', [PassportAuthController::class, 'index']);
    Route::post('/user_update', [PassportAuthController::class, 'update']);
    Route::post('/user_delete', [PassportAuthController::class, 'destroy']);
});
