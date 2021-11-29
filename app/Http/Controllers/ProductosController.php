<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Productos;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $producto = DB::table('productos')->get();
        return $producto;
    }
    public function index_id(Request $request)
    {
        $pedido = DB::table('productos')->where('id', $request->id)->get();
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
            'nombre_producto'=> 'required|max:255',
            'precio_consultora'=> 'required',
            'precio_venta'=> 'required',
            'descripcion'=> 'required|max:255',
            'campaña_id'=> 'required',
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $producto = Productos::create([
            'nombre_producto'=>$request->nombre_producto,
            'precio_consultora'=>$request->precio_consultora,
            'precio_venta'=>$request->precio_venta,
            'descripcion'=>$request->descripcion,
            'campaña_id'=>$request->campaña_id
        ]);
        $producto = DB::table('productos')->get();
        return $producto;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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
            'nombre_producto'=> 'required|max:255',
            'precio_consultora'=> 'required',
            'precio_venta'=> 'required',
            'descripcion'=> 'required|max:255',
            'campaña_id'=> 'required',
        ]);
        if ($validator->fails()){
            return $validator->errors();
        }
        Productos::where('id',$request->id)
        ->update([
            'nombre_producto'=>$request->nombre_producto,
            'precio_consultora'=>$request->precio_consultora,
            'precio_venta'=>$request->precio_venta,
            'descripcion'=>$request->descripcion,
            'campaña_id'=>$request->campaña_id
        ]);
        $producto = DB::table('productos')->get();
        return $producto;
    }
    public function update_movil(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre_producto'=> 'required|max:255',
            'precio_consultora'=> 'required',
            'precio_venta'=> 'required',
            'descripcion'=> 'required|max:255',
        ]);
        if ($validator->fails()){
            return $validator->errors();
        }
        Productos::where('id',$request->id)
        ->update([
            'nombre_producto'=>$request->nombre_producto,
            'precio_consultora'=>$request->precio_consultora,
            'precio_venta'=>$request->precio_venta,
            'descripcion'=>$request->descripcion,
        ]);
        $producto = DB::table('productos')->get();
        return $producto;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Productos::where('id', $request->id)->delete();
        $producto = DB::table('productos')->get();
        return $producto;
    }
}
