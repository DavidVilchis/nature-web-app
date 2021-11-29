<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\RedesConsultoras;

class RedesConsultorasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $redes_consultoras = DB::table('redes_consultoras')->get();
        return $redes_consultoras;
    }
    public function estado(Request $request){
        $redes_consultoras = DB::table('redes_consultoras')
        ->where('estado', $request->estado)
        ->get();
        return $redes_consultoras;
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
            'nombre_red'=> 'required|max:255',
            'estado'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $redes_consultoras = RedesConsultoras::create([
            'nombre_red'=>$request->nombre_red,
            'estado'=>$request->estado,
        ]);
        $redes_consultoras = DB::table('redes_consultoras')->get();
        return $redes_consultoras;
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
            'nombre_red'=> 'required|max:255',
            'estado'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        RedesConsultoras::where('id',$request->id)
        ->update(['nombre_red'=>$request->nombre_red,'estado'=>$request->estado]);
        $redes_consultoras = DB::table('redes_consultoras')->get();
        return $redes_consultoras;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        RedesConsultoras::where('id', $request->id)->delete();
        $redes_consultoras = DB::table('redes_consultoras')->get();
        return $redes_consultoras;
    }
}
