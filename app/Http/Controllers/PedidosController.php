<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Pedidos;

class PedidosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pedido = DB::table('pedidos')->get();
        return $pedido;
    }
    public function index_id(Request $request)
    {
        $pedido = DB::table('pedidos')->where('consultora_id',$request->consultora_id)->get();
        return $pedido;
    }
 
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'consultora_id'=> 'required',
            'producto_id'=> 'required',
            'cantidad'=> 'required',
            'total_consultora'=> 'required',
            'total_venta'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $pedido = Pedidos::create([
            'consultora_id'=>$request->consultora_id,
            'producto_id'=>$request->producto_id,
            'cantidad'=>$request->cantidad,
            'total_consultora'=>$request->total_consultora,
            'total_venta'=>$request->total_venta
        ]);
        $pedido = DB::table('pedidos')->get();
        return $pedido;
    }
    public function store_id(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'consultora_id'=> 'required',
            'producto_id'=> 'required',
            'cantidad'=> 'required',
            'total_consultora'=> 'required',
            'total_venta'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $pedido = Pedidos::create([
            'consultora_id'=>$request->consultora_id,
            'producto_id'=>$request->producto_id,
            'cantidad'=>$request->cantidad,
            'total_consultora'=>$request->total_consultora,
            'total_venta'=>$request->total_venta
        ]);
        $pedido = DB::table('pedidos')->where('consultora_id',$request->consultora_id)->get();
        return $pedido;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'consultora_id'=> 'required',
            'producto_id'=> 'required',
            'cantidad'=> 'required',
            'total_consultora'=> 'required',
            'total_venta'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        Pedidos::where('consultora_id',$request->consultora_id)->where('producto_id',$request->producto_id )
        ->update([
            'cantidad'=>$request->cantidad,
            'total_consultora'=>$request->total_consultora,
            'total_venta'=>$request->total_venta
        ]);
        $pedido = DB::table('pedidos')->get();
        return $pedido;
    }
    public function update_id(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'consultora_id'=> 'required',
            'producto_id'=> 'required',
            'cantidad'=> 'required',
            'total_consultora'=> 'required',
            'total_venta'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        Pedidos::where('consultora_id',$request->consultora_id)->where('producto_id',$request->producto_id )
        ->update([
            'cantidad'=>$request->cantidad,
            'total_consultora'=>$request->total_consultora,
            'total_venta'=>$request->total_venta
        ]);
        $pedido = DB::table('pedidos')->where('consultora_id',$request->consultora_id)->get();
        return $pedido;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Pedidos::where('consultora_id',$request->consultora_id)->where('producto_id',$request->producto_id )->delete();
        $pedido = DB::table('pedidos')->get();
        return $pedido;
    }
    public function destroy_id(Request $request)
    {
        Pedidos::where('consultora_id',$request->consultora_id)->where('producto_id',$request->producto_id )->delete();
        $pedido = DB::table('pedidos')->where('consultora_id',$request->consultora_id)->get();
        return $pedido;
    }
}
